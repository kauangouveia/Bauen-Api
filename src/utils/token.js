import  jwt  from "jsonwebtoken";
import {TOKEN} from './constants'

export const generateToken = (params) => {
  return jwt.sign({params}, TOKEN.SECRET, {
    expiresIn: "864000000",
  });
};
