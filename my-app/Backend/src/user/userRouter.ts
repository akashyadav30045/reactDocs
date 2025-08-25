import express  from 'express';

import { loginValidation, signupValidation } from '../middlewares/authValidation';
import { login, signup } from './userController';



const userRouter = express.Router();

// routes


userRouter.post("/register",signupValidation,signup);

userRouter.post("/login",loginValidation,login);

export default userRouter;