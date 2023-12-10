import { prisma } from '../utils/prisma/index.js';

export class ProductsRepository {
  createProduct = async (title, description, userId) => {
    try {
      const createdProduct = await prisma.products.create({
        data: {
          title,
          description,
          UserId: +userId,
        },
      });

      return createdProduct;
    } catch (error) {
      console.log(error);
    }
  };

  getAllProduct = async () => {
    try {
      const products = await prisma.products.findMany();
      return products;
    } catch (error) {
      console.log(error);
    }
  };

  getProductById = async (productId) => {
    try {
      const product = await prisma.products.findUnique({
        where: {
          productId: +productId,
        },
      });
      return product;
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (productId, title, description, status) => {
    try {
      const updatedProduct = await prisma.products.update({
        where: {
          productId: +productId,
        },
        data: {
          title,
          description,
          status,
        },
      });

      return updatedProduct;
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (productId) => {
    try {
      const deletedProduct = await prisma.products.delete({
        where: {
          productId: +productId,
        },
      });

      return deletedProduct;
    } catch (error) {
      console.log(error);
    }
  };
}
