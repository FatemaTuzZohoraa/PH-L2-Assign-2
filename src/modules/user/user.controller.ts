import type { Request, Response } from "express";

import { userService } from "./user.service";
import sendResponse from "../../utility/sendResponse";


const createUser=async(req:Request,res:Response)=>{
  // console.log(req.body);
 

  try{
    const result=await userService.createUserIntoDB(req.body)

 
  sendResponse(res,{
    statusCode:(201),
    success:true,
    "message":"user created successfully",
    data:result.rows[0]
  })
  }catch(error:any){
    
  sendResponse(res,{
    statusCode:(500),
    success:false,
    "message":error.message,
    error:error,
  })
  }
}

export const userController={
  createUser,
 
}