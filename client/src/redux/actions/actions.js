import {
    deleteFail, deleteRequest, deleteSuccess, signInFail, signInStart, signInSuccess, signOutFail, signOutRequest, singOutSuccess,
} from "../slices/userSlice";
import { myListingFail, myListingRequest, myListingSuccess, } from "../slices/listingSlice";
export const loadUser = () => async (dispatch) => {
    try {
        dispatch(signInStart());
        const user = await fetch("/api/user/profile/me");
        const result = await user.json();
        if (result.success === false) {
            dispatch(signInFail(result.message));
            return;
        }
        dispatch(signInSuccess(result.user));
        dispatch(fetchListings(result.user));
    } catch (error) {
        dispatch(signInFail(error));
    }
};
export const signIn = (formData) => async (dispatch) => {
    dispatch(signInStart());
    try {
        const result = await fetch("/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await result.json();
        if (data.success === false) {
            dispatch(signInFail(data.message));
            return;
        }
        dispatch(signInSuccess(data.user));
        dispatch(fetchListings(data.user));
    } catch (error) {
        dispatch(signInFail(error));
    }
};
export const deleteAccount = (id) => async (dispatch) => {
    dispatch(deleteRequest());
    try {
        const result = await fetch(`/api/user/delete/${id}`, {
            method: "DELETE",
        });
        const data = await result.json();
        if (data.success === false) {
            dispatch(deleteFail());
            return;
        }
        dispatch(deleteSuccess(data.user));
        dispatch(myListingFail("Deleting Account"));
    } catch (erro) {
        dispatch(deleteFail(erro));
    }
}
export const logOut = () => async (dispatch) => {
    try {
        dispatch(signOutRequest());
        const result = await fetch(`/api/auth/signout`);
        const data = await result.json();
        if (data.success === false) {
            dispatch(signOutFail());
            return;
        }
        dispatch(singOutSuccess(data.user));
        dispatch(myListingFail("Logging Out"));
    } catch (erro) {
        dispatch(signOutFail());
    }
}
export const fetchListings = (currentUser) => async (dispatch) => {
    if (currentUser && currentUser.role === "admin") {
        try {
            dispatch(myListingRequest());
            const res = await fetch(`/api/user/listings/${currentUser._id}`);
            const data = await res.json();
            if (data.success === false) {
                dispatch(myListingFail(data.message));
                return;
            }
            dispatch(myListingSuccess(data.listings));
        } catch (error) {
            dispatch(myListingFail(error));
        }
    }
};