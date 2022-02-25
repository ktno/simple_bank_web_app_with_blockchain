import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  useProfile,
  useAppDispatch,
  useIsLoggedIn,
  useBank,
} from '../../state/hooks'
import { useWeb3React } from '@web3-react/core'
import useAuth from '../../hooks/useAuth'
import { ConnectorNames } from '../../types/ConnectorNames'
import MiddleEllipsis from 'react-middle-ellipsis'
import {
  depositThunk,
  getBalanceThunk,
  getTotalThunk,
  withdrawThunk,
  transferThunk,
  approveThunk,
} from '../../state/bank'
import { getAllowanceThunk } from '../../state/profile'
import BigNumber from 'bignumber.js'
import { useContract, useTokenContract } from '../../hooks/useContract'
import bankConfig from '../../config/constants/simpleBank'
import { ethers } from 'ethers'

const InputGroup = ({
  title,
  inputLabel,
  buttonText,
  loading,
  isLoggedIn,
  needsApproval,
  readOnly,
  defaultValue,
  value,
  setValue,
  MultipleInputs,
  onClick,
}: {
  title: string
  inputLabel?: string
  buttonText?: string
  loading?: boolean
  isLoggedIn?: boolean
  needsApproval?: boolean
  readOnly?: boolean
  defaultValue?: string
  value?: string
  setValue?: any
  onClick?: any
  MultipleInputs?: any
}) => {
  return (
    <Grid container item xs={2} direction="column" gap={4} alignItems="center">
      <Typography>{title}</Typography>
      {MultipleInputs ? (
        <MultipleInputs />
      ) : (
        <TextField
          id={`text_field_${title}`}
          type="number"
          variant="outlined"
          label={inputLabel}
          value={value ? value : defaultValue}
          disabled={readOnly || !isLoggedIn || loading || needsApproval}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
      <Button
        variant="contained"
        onClick={onClick}
        disabled={!isLoggedIn || loading || needsApproval}
      >
        {buttonText ? buttonText : title}
      </Button>
    </Grid>
  )
}

const Main = ({
  isLoggedIn,
  needsApproval,
  transferToRef,
  transferAmountRef,
}: {
  isLoggedIn: boolean
  needsApproval: boolean
  transferToRef: React.MutableRefObject<HTMLInputElement | undefined>
  transferAmountRef: React.MutableRefObject<HTMLInputElement | undefined>
}) => {
  const {
    loading,
    data: { balance, total },
  } = useBank()
  const balanceValue = useMemo(
    () => new BigNumber(balance || 0).toFixed(),
    [balance]
  )
  const totalValue = useMemo(() => new BigNumber(total || 0).toFixed(), [total])
  const [depositAmount, setDepositAmount] = useState()
  const [withdrawAmount, setWithdrawAmount] = useState()

  const contract = useContract('simpleBank')
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  return (
    <>
      <InputGroup
        title="Deposit"
        inputLabel="amount"
        loading={loading}
        isLoggedIn={isLoggedIn}
        needsApproval={needsApproval}
        setValue={setDepositAmount}
        onClick={() =>
          dispatch(
            depositThunk({
              contract,
              account: account!,
              amount: depositAmount!,
            })
          )
        }
      />
      <InputGroup
        title="Withdraw"
        inputLabel="amount"
        loading={loading}
        isLoggedIn={isLoggedIn}
        needsApproval={needsApproval}
        setValue={setWithdrawAmount}
        onClick={() =>
          dispatch(
            withdrawThunk({
              contract,
              account: account!,
              amount: withdrawAmount!,
            })
          )
        }
      />
      <InputGroup
        title="Transfer"
        loading={loading}
        isLoggedIn={isLoggedIn}
        needsApproval={needsApproval}
        MultipleInputs={() => (
          <>
            <TextField
              inputRef={transferToRef}
              id="text_field_Transfer_to"
              type="text"
              variant="outlined"
              label="to"
              disabled={!isLoggedIn || loading || needsApproval}
            />
            <TextField
              inputRef={transferAmountRef}
              id="text_field_Transfer_amount"
              type="number"
              variant="outlined"
              label="amount"
              disabled={!isLoggedIn || loading || needsApproval}
            />
          </>
        )}
        onClick={() =>
          dispatch(
            transferThunk({
              contract,
              account: account!,
              to: transferToRef.current!.value,
              amount: transferAmountRef.current!.value,
            })
          )
        }
      />
      <InputGroup
        title="My Balance"
        buttonText="Check My Balance"
        defaultValue="0"
        value={balanceValue}
        loading={loading}
        isLoggedIn={isLoggedIn}
        needsApproval={needsApproval}
        readOnly
        onClick={() =>
          dispatch(getBalanceThunk({ contract, account: account! }))
        }
      />
      <InputGroup
        title="Total Balance"
        buttonText="Check Total Balance"
        defaultValue="0"
        value={totalValue}
        loading={loading}
        isLoggedIn={isLoggedIn}
        needsApproval={needsApproval}
        readOnly
        // @ts-ignore
        onClick={() => dispatch(getTotalThunk(contract))}
      />
    </>
  )
}

const Home = () => {
  const loggedIn = useIsLoggedIn()
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const isLoggedIn = useMemo(
    () => loggedIn !== null && account !== null && account !== undefined,
    [account, loggedIn]
  )
  const dispatch = useAppDispatch()
  const contract = useTokenContract('simpleToken')
  const chainId = process.env.REACT_APP_CHAIN_ID!

  const { allowance } = useProfile()
  const { loading } = useBank()
  const allowanceValue = useMemo(
    () => new BigNumber(allowance || 0).toNumber(),
    [allowance]
  )
  const needsApproval = !allowanceValue
  useEffect(() => {
    if (!isLoggedIn) return
    ;(async () => {
      dispatch(
        getAllowanceThunk({
          contract,
          account: account!,
          spender: bankConfig.contractAddress[chainId]!,
        })
      )
    })()
  }, [account, chainId, contract, dispatch, isLoggedIn, loading])

  const transferToRef = useRef<HTMLInputElement>()
  const transferAmountRef = useRef<HTMLInputElement>()

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{ height: '50vh', mt: '25vh' }}
    >
      <Typography variant="h3" textAlign="center">
        Simple Bank Web App with Blockchain
      </Typography>
      <Grid container alignItems="flex-start" justifyContent="center">
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          py={8}
          gap={2}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() =>
              isLoggedIn ? logout() : login(ConnectorNames.Injected)
            }
            sx={{
              maxWidth: '200px',
            }}
          >
            {isLoggedIn ? (
              <MiddleEllipsis>
                <span>{account}</span>
              </MiddleEllipsis>
            ) : (
              'Connect Wallet'
            )}
          </Button>
          {isLoggedIn && needsApproval && (
            <Button
              variant="contained"
              color="warning"
              onClick={() =>
                dispatch(
                  approveThunk({
                    contract,
                    account: account!,
                    spender: bankConfig.contractAddress[chainId]!,
                    allowance: ethers.constants.MaxUint256.toString(),
                  })
                )
              }
              disabled={loading}
            >
              Approve
            </Button>
          )}
        </Grid>
        <Main
          isLoggedIn={isLoggedIn}
          needsApproval={needsApproval}
          transferToRef={transferToRef}
          transferAmountRef={transferAmountRef}
        />
      </Grid>
    </Grid>
  )
}

export default Home
