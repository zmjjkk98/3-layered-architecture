import { UsersRepository } from '../repository/users.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UsersService {
  usersRepository = new UsersRepository();

  signUp = async (email, password, passwordConfirm, name) => {
    try {
      if (!email) {
        return res.status(400).json({ message: '이메일 입력이 필요합니다.' });
      }

      if (!password) {
        return res.status(400).json({ message: '비밀번호 입력이 필요합니다.' });
      }

      if (password !== passwordConfirm) {
        return res.status(400).json({
          message: '비밀번호 확인 입력이 필요합니다.',
        });
      }

      if (!name) {
        return res.status(400).json({ message: '이름 입력이 필요합니다.' });
      }

      if (password !== passwordConfirm) {
        return res
          .status(400)
          .json({ message: '입력 한 비밀번호가 서로 일치하지 않습니다.' });
      }

      if (password.length < 6) {
        return res.status(400).json({
          message: '비밀번호는 최소 6자리 이상입니다.',
        });
      }

      let emailValidationRegex = new RegExp('[a-z0-9._]+@[a-z]+.[a-z]{2,3}');
      const isValidEmail = emailValidationRegex.test(email);
      if (!isValidEmail) {
        return res.status(400).json({
          message: '올바른 이메일 형식이 아닙니다.',
        });
      }

      const existedUser = await this.usersRepository.findUserByEmail(email);
      if (existedUser) {
        return res.status(400).json({
          message: '이미 가입 된 이메일입니다.',
        });
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
      next(error);
    }
  };

  signIn = async (email, password) => {
    try {
      if (!email) {
        return res.status(400).json({ message: '이메일 입력이 필요합니다.' });
      }

      if (!password) {
        return res.status(400).json({ message: '비밀번호 입력이 필요합니다.' });
      }

      const user = await this.usersRepository.findUserByEmail(email);

      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      const accessToken = jwt.sign(
        { userId: user.userId },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {
          expiresIn: '10h',
        },
      );

      return { accessToken };
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
