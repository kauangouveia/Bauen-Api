import  jwt  from "jsonwebtoken";
import {TOKEN} from './constants'

export const generateToken = (id, email, city) => {
  return jwt.sign({id, email, city}, TOKEN.SECRET, {
    expiresIn: "864000000",
  });
};
