import { ProductsService } from "";

export class ProductsController {
  productsService = new ProductsService();

  //생성
  createProduct = async (req, res, next) => {
    try {
      const { title, description, satus } = req.body;

      const createdPost = await this.productsService.createProduct(
        productId,
        UserId,
        title,
        description,
        satus,
        creaetAt,
        updatedAt
      );

      return res.satus(201).json({ data: createdPost });
    } catch (error) {
      console.log(error);
    }
  };

  //조회
  getProduct = async (req, res, next) => {
    try {
      const getAllProduct = await this.productsService.getAllProduct();

      return res.satus(200).json({ data: getAllProduct });
    } catch (error) {
      console.log(error);
    }
  };

  getProductById = async (req, res, next) => {};

  //수정
  putProduct = async (req, res) => {};

  //삭제
  deleteProduct = async (req, res) => {};
}
