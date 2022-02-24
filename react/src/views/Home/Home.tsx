import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useAccount, useAppDispatch, useIsLoggedIn } from '../../state/hooks'
import { useWeb3React } from '@web3-react/core'
import useAuth from '../../hooks/useAuth'
import { ConnectorNames } from '../../types/ConnectorNames'
import MiddleEllipsis from 'react-middle-ellipsis'

const InputGroup = ({
  title,
  inputLabel,
  buttonText,
  onClick,
}: {
  title: string
  inputLabel?: string
  buttonText?: string
  onClick: () => void
}) => (
  <Grid container item xs={2} direction="column" gap={4} alignItems="center">
    <Typography>{title}</Typography>
    <TextField
      id={`text_field_${title}`}
      variant="outlined"
      label={inputLabel}
    />
    <Button variant="contained" onClick={onClick}>
      {buttonText ? buttonText : title}
    </Button>
  </Grid>
)

const Main = () => {
  return (
    <>
      <InputGroup title="Deposit" onClick={() => {}} />
      <InputGroup title="Withdraw" onClick={() => {}} />
      <InputGroup
        title="Transfer"
        inputLabel="0x123...456"
        onClick={() => {}}
      />
      <InputGroup
        title="My Balance"
        buttonText="Check My Balance"
        onClick={() => {}}
      />
      <InputGroup
        title="Total Balance"
        buttonText="Check Total Balance"
        onClick={() => {}}
      />
    </>
  )
}

const Home = () => {
  const loggedIn = useIsLoggedIn()
  const { account } = useWeb3React()
  const { login, logout } = useAuth()

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
      <Grid container alignItems="center" justifyContent="center">
        <Grid container alignItems="center" justifyContent="center" py={8}>
          <Button
            variant="contained"
            color="success"
            onClick={() =>
              loggedIn && account ? logout() : login(ConnectorNames.Injected)
            }
            sx={{
              maxWidth: '200px',
            }}
          >
            {loggedIn && account ? (
              <MiddleEllipsis>
                <span>{account}</span>
              </MiddleEllipsis>
            ) : (
              'Connect Wallet'
            )}
          </Button>
        </Grid>
        <Main />
      </Grid>
    </Grid>
  )
}

export default Home
