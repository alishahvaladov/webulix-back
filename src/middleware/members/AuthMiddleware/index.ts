import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { UserType } from "../../../validations/user-dto";
import PasswordHash from "../../../utils/PasswordHash";
import { getUserByEmailOrUsername } from "../../../services/UserService";

class AuthMiddleware {
  async login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    const user = await getUserByEmailOrUsername(username);
    if (!user) {
      
    }
  }
}

export const { login } = new AuthMiddleware();