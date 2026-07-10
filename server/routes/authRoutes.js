import express from "express";
import { signin, signup } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signin", signin);
authRouter.post("/signup", signup);

export default authRouter;
