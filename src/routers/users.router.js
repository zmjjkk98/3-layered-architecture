import { Router } from "express";
import { UsersController } from "../controller/users.controller.js";
import { auth } from "../middleware/need-signin.middleware.js";

const userRouter = Router();

const userscontroller = new UsersController();

//인증 미들웨어 추가하기

userRouter.post("/signup", userscontroller.signUp);
userRouter.post("/signin", userscontroller.signIn);
userRouter.get("/me", auth, userscontroller.getMyInfo);

export default userRouter;
