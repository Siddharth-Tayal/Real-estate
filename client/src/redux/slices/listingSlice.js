import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentListing: [],
    error: null,
    loading: false,
}
const listingSlice = createSlice({
    name: "listing",
    initialState,
    reducers: {
        myListingRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        myListingSuccess: (state, action) => {
            state.currentListing = action.payload;
            state.loading = false;
            state.error = null;
        },
        myListingFail: (state, action) => {
            state.currentListing = [];
            state.loading = false;
            state.error = action.payload;
        },
        createListingRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        createListingSuccess: (state, action) => {
            state.currentListing.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        createListingFalse: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        EditListingRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        EditListingSuccess: (state, action) => {
            state.currentListing = state.currentListing.filter(item => item._id !== action.payload._id);
            state.currentListing = [...state.currentListing, action.payload];
            state.loading = false;
            state.error = null;
        },
        EditListingFalse: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteListingRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteListingSuccess: (state, action) => {
            state.currentListing = state.currentListing.filter(item => item._id !== action.payload._id);
            state.loading = false;
            state.error = null;
        },
        deleteListingFalse: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const { createListingRequest, createListingSuccess, createListingFalse, EditListingRequest, EditListingSuccess, EditListingFalse, myListingFail, myListingSuccess, myListingRequest, deleteListingRequest, deleteListingFalse, deleteListingSuccess } = listingSlice.actions;
export default listingSlice.reducer;