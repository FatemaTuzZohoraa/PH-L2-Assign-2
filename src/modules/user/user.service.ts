import { pool } from "../../db";

import type { IUser } from "./user.interface";


const createUserIntoDB=async(payload:IUser)=>{
  const {name,email,password,role}=payload;

  
  const result=await pool.query(`
    INSERT INTO users(name,email,password,role)
    VALUES($1,$2,$3,COALESCE($4,'user'))
    RETURNING *
    `,[name,email,password,role])
    // console.log(result);

   delete result.rows[0].password;

    return result;
}

export const userService={
  createUserIntoDB,
 
}