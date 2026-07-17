import express from 'express';
import auth from '../middleware/auth.js';
import { getUserData } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get("/data", auth, getUserData);

export default userRouter;