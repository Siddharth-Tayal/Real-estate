import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentUser: null,
    isAuthenticated: false,
    error: null,
    loading: false,
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        signInFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },

        updateRequest: (state) => {
            state.loading = true;
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.isAuthenticated = true;
            state.error = null;
        },
        updateFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        deleteRequest: (state) => {
            state.loading = true;
        },
        deleteSuccess: (state, action) => {
            state.currentUser = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },
        deleteFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOutRequest: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        singOutSuccess: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
            state.isAuthenticated = false;
        },
        signOutFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const { signInStart, signInSuccess, signInFail, updateSuccess, updateRequest, updateFail, deleteRequest, deleteSuccess, deleteFail, singOutSuccess, signOutRequest, signOutFail } = userSlice.actions;
export default userSlice.reducer;