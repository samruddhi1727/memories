import express from "express";
import { signin, signup, logout } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signin", signin);
authRouter.post("/signup", signup);
authRouter.post('/logout', logout);

export default authRouter;
