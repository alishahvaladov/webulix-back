export const UserRoleEnum = ["employee", "employer", "admin"];

export type AlphabeticString = string & { __alphabeticStringBrand: never };

function isAlphabeticString(input: string): input is AlphabeticString {
  return /^[a-zA-Z_-]+$/.test(input);
}
export type ERROR_CODES = {
  error_name: AlphabeticString,
  message: string,
  code: string,
};

export const privileges = {
  put: "put",
  patch: "patch",
  post: "post",
  update: "update",
  delete: "delete"
}