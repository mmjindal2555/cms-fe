import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { AlertColor } from '@mui/material';
import { User } from '../components/Body/Body';

interface AppState {
    snackbar: SnackbarState,
    user: User,
    error: string,
    refreshVendors: boolean,
    refreshContracts: boolean
}

interface SnackbarState {
    message: string,
    severity: AlertColor,
    duration: number,
    visible: boolean
}


const initialState: AppState = {
    user: {
        id: 0,
        name: "",
        role: "",
        scopes: []
    },
    error: "",
    snackbar: {
        severity: "success" as AlertColor,
        duration: 0,
        visible: false,
        message: ""
    },
    refreshContracts: false,
    refreshVendors: false
}

const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        hideSnackbar: (state) => {
            state.snackbar.visible = false;
        },
        showError: (state, action: PayloadAction<string>) => {
            state.snackbar = {
                visible: true,
                message: action.payload || "",
                duration: 4000,
                severity: "error"
            };
        },
        showSuccess: (state, action: PayloadAction<string>) => {
            state.snackbar = {
                visible: true,
                message: action.payload || "",
                duration: 4000,
                severity: "success"
            };
        },
        performRefreshVendors: (state, action: PayloadAction<boolean>) => {
            state.refreshVendors = action.payload
        },
        performRefreshContracts: (state, action: PayloadAction<boolean>) => {
            state.refreshContracts = action.payload
        }

    },
    extraReducers: (builder) => {
    }
})

export const { hideSnackbar, showError, showSuccess, performRefreshVendors, performRefreshContracts } = appStateSlice.actions
export default appStateSlice.reducer

