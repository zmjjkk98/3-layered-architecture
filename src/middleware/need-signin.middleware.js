import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma/index.js';

export const auth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const [authType, accessToken] = authorization.split(' ');

    const decodePayload = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET,
    );
    const { userId } = decodePayload;
    const user = await prisma.users.findUnique({
      where: { userId: +userId },
    });

    if (!user) {
      throw new Error('존재하지 않는 사용자');
    }

    delete user.password;
    req.users = user;

    next();
  } catch (error) {
    console.log(error);
  }
};
