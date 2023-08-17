import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import dotenv from 'dotenv';
dotenv.config();

const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);

const secret = process.env.JWT_SECRET;

export const createToken = async (payload, option = null) => {
  const token = await sign(payload, secret, option);
  return token;
};

export const validateToken = async (token) => {
  const verifiedToken = await verify(token, secret);
  return verifiedToken;
};

