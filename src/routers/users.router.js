import { Router } from "express";
import { UserController } from "../controller/user.controller";

const userRouter = Router();

const usercontroller = new UserController();

//인증 미들웨어 추가하기

userRouter.post("/signup", usercontroller.signUp);
userRouter.post("/signin", usercontroller.signIn);
userRouter.get("/me", usercontroller.getMyInfo);

export default { userRouter };
