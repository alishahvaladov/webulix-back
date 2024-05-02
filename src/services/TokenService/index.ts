import BadRequestError from "../../error/BadRequestError";
import TokenModel, { TokenDoc } from "../../model/TokenModel";

export default class TokenService {
  async findOrCreateTokenService({ user_id, token }: TokenDoc) {
    const existingToken = await TokenModel.findOne({ user_id });

    if (existingToken) {
      existingToken.token = token;
      existingToken.save();
      return;
    }

    const createdToken = await TokenModel.create({
      user_id,
      token
    });

    createdToken.save();
    return;
  };

  async findTokenByUserID(user_id: string) {
    const existingToken = await TokenModel.findOne({ user_id });

    if (!existingToken) {
      return false;
    }

    return existingToken.token;
  }
}

export const { findOrCreateTokenService, findTokenByUserID } = new TokenService();