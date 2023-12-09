import { prisma } from "../utils/prisma/index.js";

export class ProductsRepository {
  createProduct = async (productId, title, description, status) => {
    try {
      const createProduct = await prisma.products.create({
        data: {
          productId,
          title,
          description,
          status,
        },
      });
    } catch (error) {
      console.log(error);
    }
    return createProduct;
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
      return productId;
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (productId, password, title, description, status) => {
    try {
      const updatedProduct = await prisma.products.update({
        where: {
          productId: +productId,
          password: password,
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

  deleteProduct = async (productId, password) => {
    try {
      const deletedProduct = await prisma.products.update({
        where: {
          productId: +productId,
          password,
        },
      });
      return deletedProduct;
    } catch (error) {
      console.log(error);
    }
  };
}
