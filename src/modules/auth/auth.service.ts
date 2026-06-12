import { pool } from "../../db";
import type { IUser } from "./auth.interface";
import bcrypt from "bcryptjs"
import config from "../../config"

import jwt, { type JwtPayload } from "jsonwebtoken"


const registerUserIntoDB=async(payload:IUser)=>{
  const {name,email,password,role}=payload;

  const hashPassword=await bcrypt.hash(password,10)

  
  const result=await pool.query(`
    INSERT INTO users(name,email,password,role)
    VALUES($1,$2,$3,COALESCE($4,'contributor'))
    RETURNING *
    `,[name,email,hashPassword,role])
    // console.log(result);

   delete result.rows[0].password;

    return result;
}

const loginUserIntoDB=async(payload:{
  email:string,
  password:string
})=>{
const {email,password}=payload


const userData= await pool.query(`
    SELECT * FROM users WHERE email=$1
  `,[email])

 
  if(userData.rows.length===0){
    throw new Error("User not found")
  }

  const user=userData.rows[0]
  
  const matchPassword=await bcrypt.compare(password,user.password)
// console.log(matchPassword);
  if(!matchPassword){
      throw new Error("invalid pass")
  }
//token generate
const jwtpayload={
  id:user.id,
  name:user.name,
  role:user.role,
  
  email:user.email,
}

const accessToken=jwt.sign(jwtpayload,config.secret as string,{
  expiresIn:'1d'
})
const refreshToken=jwt.sign(jwtpayload,config.refresh_secret as string,{
  expiresIn:'10d'
})

return {accessToken,refreshToken};
}

const generateRefreshToken=async(token:string)=>{
  
 
  if(!token){
    throw new Error("Unauthorized")
  }


  const decoded=jwt.verify(token as string,config.refresh_secret as string) as JwtPayload
  
  const userData=await pool.query(`
      SELECT * FROM users WHERE email=$1`,[decoded.email])
      const user=userData.rows[0]
      console.log(user);

      if(userData.rows.length===0){
         throw new Error("User not found!")
      }

      const jwtpayload={
  id:user.id,
  name:user.name,
  role:user.role,
  email:user.email,
}

const accessToken=jwt.sign(jwtpayload,config.secret as string,{
  expiresIn:"10d",
})
return {accessToken}
}

export const authService={
  registerUserIntoDB,
  loginUserIntoDB,
  generateRefreshToken,
 
}