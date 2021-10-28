import  jwt  from "jsonwebtoken";
import {TOKEN} from './constants'

export const generateToken = (id, email, room, city) => {
  return jwt.sign({id, email, room,city}, TOKEN.SECRET, {
    expiresIn: "864000000",
  });
};


export const decriptToken = (id)=>{
 return jwt.decode({id}) 
}
