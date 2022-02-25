import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import profileReducer from './profile'
import bankReducer from './bank'

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    bank: bankReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
