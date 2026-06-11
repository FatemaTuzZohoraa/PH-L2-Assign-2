import type { Request, Response } from "express";

import sendResponse from "../../utility/sendResponse";
import { authService } from "./auth.service";



const registerUser=async(req:Request,res:Response)=>{
  // console.log(req.body);
 

  try{
    const result=await authService.registerUserIntoDB(req.body)

 
  sendResponse(res,{
    statusCode:(201),
    success:true,
    "message":"user registered successfully",
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

export const authController={
  registerUser,
 
}