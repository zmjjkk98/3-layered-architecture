import { ProductsRepository } from "../repository/products.repositroy.js";

export class ProductsService {
  productsRepository = new ProductsRepository();

  createProduct = async (title, description, userId) => {
    const createdPost = await this.productsRepository.createProduct(
      title,
      description,
      userId
    );

    return {
      productId: createdPost.productId,
      title: createdPost.title,
      description: createdPost.description,
      status: createdPost.status,
      UserId: createdPost.UserId,
      createdAt: createdPost.createdAt,
      updatedAt: createdPost.updatedAt,
    };
  };

  getAllProduct = async () => {
    const products = await this.productsRepository.getAllProduct();

    products.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return products.map((product) => {
      return {
        productId: product.productId,
        title: product.title,
        description: product.description,
        status: product.status,
        UserId: product.UserId,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    });
  };

  getProductById = async (productId) => {
    const product = await this.productsRepository.getProductById(productId);

    return {
      productId: product.productId,
      title: product.title,
      description: product.description,
      status: product.status,
      UserId: product.UserId,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  };

  updateProduct = async (productId, title, description, status) => {
    //유효성 검증용
    const product = await this.productsRepository.getProductById(productId);

    if (!product) {
      throw new Error("원하시는 상품이 존재하지 않습니다.");
    }

    const updatedProduct = await this.productsRepository.updateProduct(
      productId,
      title,
      description,
      status
    );

    return {
      productId: updatedProduct.productId,
      title: updatedProduct.title,
      description: updatedProduct.description,
      status: updatedProduct.status,
      UserId: updatedProduct.UserId,
      createdAt: updatedProduct.createdAt,
      updatedAt: updatedProduct.updatedAt,
    };
  };

  deleteProduct = async (productId) => {
    const product = await this.productsRepository.getProductById(productId);
    if (!product) {
      throw new Error("원하시는 상품이 존재하지 않습니다.");
    }
    await this.productsRepository.deleteProduct(productId);

    return {
      productId: product.productId,
      title: product.title,
      description: product.description,
      status: product.status,
      UserId: product.UserId,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  };
}
