import { ProductsRepository } from "../repository/products.repositroy.js";

export class ProductsService {
  productsRepository = new ProductsRepository();

  createProduct = async (productId, title, description, status) => {
    const createdPost = await this.productsRepository.createProduct(
      productId,
      title,
      description,
      status
    );

    return {
      postId: createdPost.postId,
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

  updateProduct = async (productId, password, title, description, status) => {
    //유효성 검증용
    const product = await this.productsRepository.getProductById(productId);

    await this.productsRepository.updateProduct(
      productId,
      password,
      title,
      description,
      status
    );

    const updatedProduct = await this.productsRepository.getProductById(
      productId
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

  deleteProduct = async (productId, password) => {
    const product = await this.productsRepository.getProductById(productId);
    await this.productsRepository.deleteProduct(productId, password);

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
