import jwt from "jsonwebtoken";
import { IToken } from "../../Interfaces/IToken";

class GenerateToken {
  public generatePrimary(object: IToken) {
    const primaryJWT = jwt.sign(object, process.env.JWT_SECRET as string, { expiresIn: "1m" });
    return primaryJWT;
  }

  generateRefresh(object: IToken) {
    const refreshJWT = jwt.sign(object, process.env.JWT_REFRESH as string);
    return refreshJWT;
  }
}

export default new GenerateToken();