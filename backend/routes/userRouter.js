import express from 'express';
import * as user from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post('/users/register', user.createUserController);
userRouter.post('/users/login', user.loginUserController);
userRouter.get('/users/me/:id', user.getUserController);

export default userRouter;
