import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma/index.js';

export const auth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(400).json({
        message: '인증 정보가 없습니다.',
      });
    }

    const [authType, accessToken] = authorization.split(' ');

    if (authType !== 'Bearer') {
      return res.status(400).json({
        message: '지원하지 않는 인증 방식입니다.',
      });
    }

    if (!accessToken) {
      return res.status(400).json({
        message: 'AccessToken이 없습니다.',
      });
    }

    const decodePayload = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET,
    );
    const { userId } = decodePayload;
    const user = await prisma.users.findUnique({
      where: { userId: +userId },
    });

    if (!user) {
      return res.status(400).json({
        message: '존재하지 않는 사용자입니다.',
      });
    }

    delete user.password;
    req.users = user;

    next();
  } catch (error) {
    console.log(error);

    switch (error.message) {
      case 'jwt expired':
        statusCode = 401;
        errorMessage = '인증 정보 유효기간이 지났습니다.';
        break;
      case 'invalid signature':
        statusCode = 401;
        errorMessage = '유효하지 않는 인증 정보입니다.';
        break;
      default:
        statusCode = 500;
        errorMessage =
          '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.';
        break;
    }
  }
};
