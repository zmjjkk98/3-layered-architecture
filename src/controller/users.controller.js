import { UsersService } from "../service/users.service.js";

export class UsersController {
  usersService = new UsersService();
  signUp = async (req, res, next) => {
    try {
      const { email, password, passwordConfirm, name } = req.body;

      const user = await this.usersService.signUp(
        email,
        password,
        passwordConfirm,
        name
      );

      return res.status(201).json({
        data: {
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error) {}
  };
  signIn = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await this.usersService.signIn(email, password);

    return res.status(201).json({
      user,
    });
  };

  getMyInfo = async (req, res, next) => {
    const user = req.user;

    return res.status(200).json({ user });
  };
}
