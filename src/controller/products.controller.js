import { ProductsService } from '../service/products.service.js';

export class ProductsController {
  productsService = new ProductsService();

  //생성
  createProduct = async (req, res, next) => {
    try {
      const { title, description } = req.body;
      const { userId } = req.users;

      const createdPost = await this.productsService.createProduct(
        title,
        description,
        userId,
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
      const { title, description, status } = req.body;
      const { userId } = req.users;
      const updatedProduct = await this.productsService.updateProduct(
        productId,
        title,
        description,
        status,
        userId,
      );

      return res.status(200).json({ data: updatedProduct });
    } catch (error) {
      console.log(error);
    }
  };

  //삭제
  deleteProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      const { userId } = req.users;

      const deletedProduct = await this.productsService.deleteProduct(
        productId,
        userId,
      );

      return res.status(200).json({ data: deletedProduct });
    } catch (error) {}
  };
}
