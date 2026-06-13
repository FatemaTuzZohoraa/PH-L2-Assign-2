import { type NextFunction, type Request, type Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../config";
import { pool } from "../db";
import type { ROLES } from "../types";

const auth=(...roles:ROLES[])=>{
  return async (req:Request,res:Response,next:NextFunction)=>{
    // console.log(roles);
  try {
    // console.log("this is protected route");
  // console.log(req.headers.authorization);

  //checking if token exists
 const token = req.headers.authorization?.split(" ")[1];

  //token na thakle 
  if(!token){
    return res.status(401).json({
        success:false,
        message:"Unauthorized access!!!",       
      })
  }
//token ache but can be fake so verification

  const decoded=jwt.verify(token as string,config.secret as string) as JwtPayload
  // console.log(decoded);
  //database e check korchi email ta ache ki nai
  const userData=await pool.query(`
      SELECT * FROM users WHERE email=$1`,[decoded.email])
      const user=userData.rows[0]
      console.log(user);
//na thakle
      if(userData.rows.length===0){
        return res.status(404).json({
        success:false,
        message:"User not found.",       
      })
      }

      // console.log("auth role:",user.role);
      if(roles.length && !roles.includes(user.role)){
        return res.status(403).json({
        success:false,
        message:"Forbidden!! This role has no access",       
      })
      }
      
      req.user = decoded
      next(); 

  } catch (error) {
    next(error);
  }
}

}
export default auth