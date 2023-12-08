import { Router } from "express";
import productsRouter from "./products.router";
import usersRouter from "./users.router";

const apiRouter = Router();

apiRouter.use("/products", productsRouter);
apiRouter.use("/users", usersRouter);

export { apiRouter };
