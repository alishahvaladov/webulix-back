import { Request, Response, NextFunction } from "express";
// import * as jwt from "jsonwebtoken";
// import { UserType } from "../../../validations/user-dto";
import PasswordHash from "../../../utils/PasswordHash";
import { getUserByEmailOrUsername } from "../../../services/UserService";
import NotFoundError from "../../../error/NotFoundError";
import "express-async-errors";

class AuthMiddleware {
  async login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    const user = await getUserByEmailOrUsername(username);
    if (!user) {
      throw new NotFoundError([{
        message: "Username or password incorrect!",
        field: ["User"],
        errorCode: "NET-ERROR-USER-1001"
      }]);
    }
    const passwordMatch = await PasswordHash.compare(user.password, password);

    if (!passwordMatch) {
      throw new NotFoundError([{
        message: "Username or password incorrect!",
        errorCode: "NET-ERROR-USER-1001"
      }]);
    }

    return res.status(200).send({
      message: "Login successful",
    });
  }
}

export const { login } = new AuthMiddleware();