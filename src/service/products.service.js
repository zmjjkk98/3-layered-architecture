import { ProductsRepository } from '../repository/products.repositroy.js';

export class ProductsService {
  productsRepository = new ProductsRepository();

  createProduct = async (title, description, userId) => {
    if (!title) {
      return res.status(400).json({
        message: '제목 입력이 필요합니다.',
      });
    }

    if (!description) {
      return res.status(400).json({
        message: '설명 입력이 필요합니다.',
      });
    }

    const createdPost = await this.productsRepository.createProduct(
      title,
      description,
      userId,
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

    if (!product) {
      return res.status(404).json({
        message: '찾으시는 상품이 존재하지 않습니다.',
      });
    }

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

  updateProduct = async (productId, title, description, status, userId) => {
    try {
      const product = await this.productsRepository.getProductById(productId);

      if (!product) {
        return res.status(404).json({
          message: '수정하려는 상품이 존재하지 않습니다.',
        });
      }

      if (!title && !description && !status) {
        return res.status(400).json({
          message: '수정 정보는 최소 한 가지 이상이어야 합니다.',
        });
      }

      const isValidStatus = status
        ? status === 'FOR_SALE' || status === 'SOLD_OUT'
        : true;

      if (!isValidStatus) {
        return res.status(400).json({
          message: '지원하지 않는 상태입니다. (status: FOR_SALE | SOLD_OUT)',
        });
      }

      const isProductOwner = product.UserId === +userId;

      if (!isProductOwner) {
        throw new Error('수정 권한이 없습니다.');
      }

      const updatedProduct = await this.productsRepository.updateProduct(
        productId,
        title,
        description,
        status,
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
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (productId, userId) => {
    try {
      const product = await this.productsRepository.getProductById(productId);

      if (!product) {
        return res.status(404).json({
          message: '삭제하시려는 상품이 존재하지 않습니다.',
        });
      }

      const isProductOwner = product.UserId === +userId;

      if (!isProductOwner) {
        throw new Error('삭제 권한이 없습니다.');
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
    } catch (error) {
      console.log(error);
    }
  };
}
