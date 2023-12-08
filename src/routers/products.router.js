import { Router } from "express";
import { ProductsController } from "../controller/products.controller";

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.post("/", productsController.createProduct);
productsRouter.get("/", productsController.getProduct);
productsRouter.get("/:productId", productsController);
productsRouter.put("/:productId", productsController.putProduct);
productsRouter.delete("/:productId", productsController.deleteProduct);

export default { productsRouter };
