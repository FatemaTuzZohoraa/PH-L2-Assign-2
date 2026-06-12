import type { Request, Response } from "express";

import sendResponse from "../../utility/sendResponse";
import { authService } from "./auth.service";

const registerUser=async(req:Request,res:Response)=>{

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

const loginUser=async(req:Request,res:Response)=>{
try {
   
    const result= await authService.loginUserIntoDB(req.body);

    const {refreshToken}=result;

    res.cookie("refreshToken",refreshToken,{
      secure:false, 
      httpOnly:true,
      sameSite:'lax'
    })

    res.status(201).json({
      success:true,
      message:"login successfully",
      data:result
    })

  } catch (error:any) {
    res.status(500).json({
        success:false,
        message:error.message,
        error:error,
      })
  }
}

const refreshToken= async(req:Request,res:Response)=>{
  try {
    
    const result= await authService.generateRefreshToken(req.cookies.refreshToken);

    res.status(201).json({
      success:true,
      message:"Access token generated successfully",
      data:result
    })

  } catch (error:any) {
    res.status(500).json({
        success:false,
        message:error.message,
        error:error,
      })
  }
}


export const authController={
  registerUser,
  loginUser,
  refreshToken,
}