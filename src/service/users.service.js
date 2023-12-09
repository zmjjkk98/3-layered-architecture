import { UsersRepository } from "";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UsersService {
  usersRepository = new UsersRepository();

  signUp = async (email, password, passwordConfirm, name) => {
    try {
      if (password !== passwordConfirm) {
        throw new Error("");
      }

      const saltround = 10;

      const bcryptPassword = bcrypt.hashSync(password, saltround);

      const user = await this.usersRepository.signUp(
        email,
        bcryptPassword,
        name
      );

      return {
        userId: user.userId,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {}
  };

  signIn = async (email, password) => {
    const user = await this.usersRepository.findUserByEmail(email);

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    const accessToken = jwt.sign({ userId: user.userId }, "secret", {
      expiresIn: "10h",
    });

    return {
      accessToken,
    };
  };
}
