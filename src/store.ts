import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import { compose } from 'redux'
import appState from './reducers/appState'


const composedEnhancer = compose(applyMiddleware(thunkMiddleware))


export const store = configureStore({
  reducer: appState,
  enhancers: [composedEnhancer]
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
