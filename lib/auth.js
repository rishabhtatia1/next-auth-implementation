import { compare, hash } from "bcryptjs";

export const hashPassword = async (password) => {
  const hashedPasswrod = await hash(password, 12);
  return hashedPasswrod;
};

export const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};
