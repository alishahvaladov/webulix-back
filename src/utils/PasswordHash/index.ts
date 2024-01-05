import { hashSync, compareSync }from "bcryptjs";

export default class PasswordHash {
  static async toHash(password: string) {
    return hashSync(password, 10);
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    return compareSync(suppliedPassword, storedPassword);
  }
}