import { NextFunction, Request, Response } from "express";
import { registerUserService, getUserService } from "../../../services/UserService";
import { UserType } from "../../../validations/user-dto";

class UserController {
  async registerUserController(req: Request, res: Response) {
    try {
      const body = req.body as UserType;
      const createdUser = await registerUserService(body);
      return res.status(200).send({
        success: true,
        message: "User created",
        user: createdUser
      });
    } catch (err) {
      console.log(err);
      return res.status(500);
    }
  }
  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.query;
      const user = await getUserService(id);

      return res.status(200).send({
        success: true,
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(400);
    }
  }
}

export const { registerUserController, getUserById } = new UserController();