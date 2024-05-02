import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
// import { UserType } from "../../../validations/user-dto";
import PasswordHash from "../../utils/PasswordHash";
import { IToken } from "../../Interfaces/IToken";
import { getUserByEmailOrUsername } from "../../services/UserService";
import NotFoundError from "../../error/NotFoundError";
import "express-async-errors";
import { env } from "process";
import GenerateToken from "../../utils/GenerateToken";
import { findOrCreateTokenService, findTokenByUserID } from "../../services/TokenService";
import { TokenDoc } from "../../model/TokenModel";
import { ObjectId } from "mongoose";

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
    };

    const primaryJWT = jwt.sign({ id: user._id, username: user.username }, env.JWT_SECRET as string, { expiresIn: "15m" });
    const refreshJWT = jwt.sign({ id: user._id, username: user.username }, env.JWT_REFRESH as string, { expiresIn: "24h" });

    findOrCreateTokenService({ user_id: user._id, token: primaryJWT } as TokenDoc);

    res.cookie("refresh_token", refreshJWT);

    return res.status(200).send({
      message: "Login successful",
      accessToken: primaryJWT
    });
  }

  async refreshPrimaryToken(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refresh_token as string;
      const authToken = req.header("Authorization")?.split("Bearer ")[1];
      
      if (!refreshToken) {
        return res.status(400).send({
          success: false,
          message: "Please login again!"
        });
      }
      
      const refreshDecoded = jwt.verify(refreshToken, env.JWT_REFRESH as string) as IToken;
      console.log(refreshDecoded);
      const user = await getUserByEmailOrUsername(refreshDecoded.username);
      const existingToken = await findTokenByUserID(refreshDecoded.id);

      if (!existingToken) {
        console.log("Token not exist");
        return res.status(400).send({
          success: false,
          message: "Please login again."
        });
      }

      if (!user) {
        console.log("User not exist");
        return res.status(400).send({
          success: false,
          message: "Please login again."
        });
      }

      if (existingToken !== authToken) {
        console.log("Existing token and authtoken not equal");
        return res.status(400).send({
          success: false,
          message: "Please login again"
        });
      }
      
      const userObj = {
        username: refreshDecoded.username,
        id: refreshDecoded.id
      };
      
      const primaryToken = GenerateToken.generatePrimary(userObj);

      findOrCreateTokenService({ user_id: user._id, token: primaryToken } as TokenDoc);

      return res.status(200).send({
        success: true,
        accessToken: primaryToken
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(400).send({
          success: false,
          message: "Something went wrong! Please login again."
        });
      }
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "An internal server error occurred"
      });
    }
  }

  checkAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const authToken = req.header("Authorization")?.split("Bearer ")[1] as string;

      const primaryDecoded = jwt.verify(authToken, env.JWT_SECRET as string) as IToken;
      console.log(primaryDecoded);
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(400).send({
          success: false,
          message: error.message
        });
      }
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Something went wrong!"
      })
    }
  }
}

export const { login, checkAuth, refreshPrimaryToken } = new AuthMiddleware();