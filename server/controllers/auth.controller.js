import User from "../models/userModel.js"
import { errorHandler } from "../utils/error.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const signUp = async (req, res, next) => {
    try {
        const data = req.body;
        const hashPassword = bcrypt.hashSync(req.body.password, 10);
        const user = await User.create({
            name: data.name,
            email: data.email,
            password: hashPassword
        });
        res.status(201).json({
            success: true,
            message: "Registered Successfully",
            user: user
        })
    } catch (error) {
        next(error)
    }
};
export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validEmail = await User.findOne({ email });
        if (!validEmail) return next(errorHandler(400, "Wrong Credentials"));
        const hashPassword = bcrypt.compareSync(password, validEmail.password);
        if (!hashPassword) return next(errorHandler(400, "Wrong Credentials"));
        const token = jwt.sign({ id: validEmail._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validEmail._doc
        res.cookie('access_token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
        }).status(200).json({
            user: rest,
        })

    } catch (error) {
        next(error)
    }
};

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = user._doc
            res.cookie('access_token', token, {
                httpOnly: true,
                expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
            }).status(200).json({
                ...rest,
            })
        }
        else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashPassword = bcrypt.hashSync(generatedPassword, 10);
            const newUser = await User.create({
                name: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                avatar: req.body.photo,
                password: hashPassword
            });
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = newUser._doc
            res.cookie('access_token', token, {
                httpOnly: true,
                expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
            }).status(200).json({
                ...rest,
            })
        }
    } catch (error) {
        next(error)
    }
};
export const signout = async (req, res, next) => {
    try {
        res.status(200).clearCookie("access_token").json({
            message: "Logged Out"
        })

    } catch (error) {
        next(error);
    }
}