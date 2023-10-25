import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import AuthRouter from "./routes/auth.routes.js"
import UserRouter from "./routes/user.routes.js"
import ListingRouter from "./routes/listing.routes.js"
import cookieParser from "cookie-parser";
import path from "path"

dotenv.config();
const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to Atlas Database")
}).catch(error => {
    console.log(`Error : ${error}`)
})

const _dirname = path.resolve();



// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use("/api/auth", AuthRouter)
app.use("/api/user/", UserRouter)
app.use("/api/listing/", ListingRouter)

app.use(express.static(path.join(_dirname, '/client/dist')))
app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, 'client', 'dist', 'index.html'));
})

app.listen(PORT, () => {
    console.log(`Server is running at PORT : ${PORT}`)
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})