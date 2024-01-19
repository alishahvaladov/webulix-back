export const UserRoleEnum = ["employee", "employer", "admin"];

type AlphabeticString = string & { __alphabeticStringBrand: never };

function isAlphabeticString(input: string): input is AlphabeticString {
  return /^[a-zA-Z]+$/.test(input);
}
export type ERROR_CODES = {
  error_name: AlphabeticString,
  message: string,
  code: number,
};