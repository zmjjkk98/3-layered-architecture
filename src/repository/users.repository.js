import { prisma } from "../utils/prisma/index.js";

export class UsersRepository {
  signUp = async (email, bcryptPassword, name) => {
    try {
      const user = await prisma.users.create({
        email,
        password: bcryptPassword,
        name,
      });

      return user;
    } catch (error) {
      console.log(error);
    }
  };

  findUserByEmail = async (email) => {
    try {
      const user = await prisma.users.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  };
}
