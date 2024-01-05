import { z } from "zod";

const emailSchema = z.string().email();

const isEmail = (userInput: string) => {
  try {
    emailSchema.parse(userInput);
    return true;
  } catch(err) {
    return false;
  }
}

export default isEmail;