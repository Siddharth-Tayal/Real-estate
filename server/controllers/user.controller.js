import User from "../models/userModel.js"
import Listing from "../models/listingModel.js"
import bcrypt from "bcrypt"
import { errorHandler } from "../utils/error.js"
export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "Unauthenticated"));
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, { new: true })
        const { password: pass, ...rest } = updatedUser._doc
        res.status(200).json({
            user: rest,
        })

    } catch (error) {
        next(error);
    }
}
export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "Unauthenticated"));
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        } await User.findByIdAndDelete(req.params.id)
        res.status(200).clearCookie("access_token").json({
            message: "User Delete Successfully!!!"
        })

    } catch (error) {
        next(error);
    }
}
export const getUserListing = async (req, res, next) => {

    if (req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({ userRef: req.params.id });
            return res.status(200).json({
                listings: listings
            })
        } catch (error) {
            next(error);
        }
    } else {
        return next(new errorHandler(401, "Unauthorized"))
    }
}
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user)
            return next(new errorHandler(404, "User not found"));

        const { password: pass, ...rest } = user._doc;
        return res.status(200).json({
            rest
        })
    } catch (error) {
        next(error);
    }
}
export const getMyProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const { password: pass, ...rest } = user._doc
        return res.status(200).json({
            user: rest
        })
    } catch (error) {
        next(error);
    }
}