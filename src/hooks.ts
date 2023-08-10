import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState, store } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
