import { UsersRepository } from '../repository/users.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UsersService {
  usersRepository = new UsersRepository();

  signUp = async (email, password, passwordConfirm, name) => {
    try {
      if (password !== passwordConfirm) {
        throw new Error('');
      }

      const saltround = process.env.PASSWORD_HASH_SALT_ROUNDS;

      const bcryptPassword = bcrypt.hashSync(password, +saltround);

      const user = await this.usersRepository.signUp(
        email,
        bcryptPassword,
        name,
      );

      return {
        userId: user.userId,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      console.log(error);
    }
  };

  signIn = async (email, password) => {
    const user = await this.usersRepository.findUserByEmail(email);

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    const accessToken = jwt.sign(
      { userId: user.userId },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: '10h',
      },
    );

    return {
      accessToken,
    };
  };
}
