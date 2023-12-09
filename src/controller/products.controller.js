import { ProductsService } from "../service/products.service";

export class ProductsController {
  productsService = new ProductsService();

  //생성
  createProduct = async (req, res, next) => {
    try {
      const { title, description, status } = req.body;

      const createdPost = await this.productsService.createProduct(
        productId,
        title,
        description,
        status
      );

      return res.status(201).json({ data: createdPost });
    } catch (error) {
      console.log(error);
    }
  };

  //조회
  getProduct = async (req, res, next) => {
    try {
      const getAllProduct = await this.productsService.getAllProduct();

      return res.status(200).json({ data: getAllProduct });
    } catch (error) {
      console.log(error);
    }
  };

  getProductById = async (req, res, next) => {
    try {
      const { productId } = req.params;

      const product = await this.productsService.getProductById(productId);

      return res.status(200).json({
        data: {
          productId: productId,
          title: product.title,
          description: product.description,
          status: product.status,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
          UserId: product.UserId,
        },
      });
    } catch (error) {}
  };

  //수정
  putProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      const { password, title, description, status } = req.body;
      const updatedProduct = await this.productsService.updateProduct(
        productId,
        password,
        title,
        description,
        status
      );

      return res.status(200).json({ data: updatedProduct });
    } catch (error) {}
  };

  //삭제
  deleteProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      const { password } = req.body;

      const deletedProduct = await this.productsService.deleteProduct(
        productId,
        password
      );

      return res.status(200).json({ data: deletedProduct });
    } catch (error) {}
  };
}
