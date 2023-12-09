import { Router } from "express";
import { ProductsController } from "../controller/products.controller.js";
import { auth } from "../middleware/need-signin.middleware.js";

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.post("/", auth, productsController.createProduct);
productsRouter.get("/", auth, productsController.getProduct);
productsRouter.get("/:productId", auth, productsController.getProductById);
productsRouter.put("/:productId", auth, productsController.putProduct);
productsRouter.delete("/:productId", auth, productsController.deleteProduct);

export default productsRouter;
