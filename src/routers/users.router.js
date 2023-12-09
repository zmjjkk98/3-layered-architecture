import { Router } from "express";
import { UsersController } from "../controller/users.controller.js";

const userRouter = Router();

const userscontroller = new UsersController();

//인증 미들웨어 추가하기

userRouter.post("/signup", userscontroller.signUp);
userRouter.post("/signin", userscontroller.signIn);
userRouter.get("/me", userscontroller.getMyInfo);

export default userRouter;
