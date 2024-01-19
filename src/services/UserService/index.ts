import UserModel from "../../model/UserModel";
import { UserType } from "../../validations/user-dto";
import isEmail from "../../utils/isEmail";

class UserService {
  async registerUserService(body: UserType) {
    const user = new UserModel(body);
    return await user.save();
  }

  async getUserService(id: string | any) {
    return await UserModel.findById(id);
  }

  async getUserByEmailOrUsername(userInput: string) {
    const isInputEmail = isEmail(userInput);
    if (isInputEmail) {
      return await UserModel.findOne({ email: userInput });
    } else {
      return await UserModel.findOne({ username: userInput });
    }
  }
}

export const { registerUserService, getUserService, getUserByEmailOrUsername } = new UserService();