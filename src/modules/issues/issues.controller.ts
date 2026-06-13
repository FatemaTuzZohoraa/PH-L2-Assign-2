import type { Request, Response } from "express";
import { pool } from "../../db";
import { IssueService } from "./issues.service";
import sendResponse from "../../utility/sendResponse";


const createIssue=async(req:Request,res:Response)=>{
  

  try{
    const payload = {
  ...req.body,
  reporter_id: (req as any).user.id,
};

const result = await IssueService.createIssueIntoDB(payload);

 
  sendResponse(res,{
    statusCode:(201),
    success:true,
    "message":"Issue created successfully",
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

const getAllIssue=async(req:Request,res:Response)=>{
  
  try {
      const result=await IssueService.getAllIssuesFromDB()

      res.status(200).json({
        success:true,
        message:"Issues retrived successfully",
        data:result.rows,
      })
  } catch (error:any) {
    res.status(500).json({
        success:false,
        message:error.message,
        error:error,
      })
  }
}
const getSingleIssue=async(req:Request,res:Response)=>{
  const {id}=req.params;
 try {
    const result=await IssueService.getSingleIssueFromDB(id as string);

    if(result.rows.length===0){
      res.status(404).json({
        success:false,
        message:"Issue not found",
        data:{}
      })
    }
    
    res.status(200).json({
        success:true,
        message:"Issue retrived successfully",
        data:result.rows[0],
      })
  
 } catch (error:any) {
  res.status(500).json({
        success:false,
        message:error.message,
        error:error,
      })
 }
}
const updateIssue=async(req:Request,res:Response)=>{
  const {id}=req.params;
  

  try {
    const issue = await IssueService.getSingleIssueFromDB(id as string);

if (issue.rows.length === 0) {
  return res.status(404).json({
    success: false,
    message: "Issue not found",
    data: {}
  });
}

const currentIssue = issue.rows[0];
const user = (req as any).user;

const canUpdate =
  user.role === "maintainer" ||
  (
    user.role === "contributor" &&
    currentIssue.reporter_id === user.id &&
    currentIssue.status === "open"
  );

if (!canUpdate) {
  return res.status(403).json({
    success: false,
    message: "Forbidden"
  });
}
    
    const result=await IssueService.updateIssueFromDB(req.body,id as string)

   

    res.status(200).json({
        success:true,
        message:"Issue UPDATED successfully",
        data:result.rows[0],
      })

  } catch (error:any) {
    res.status(500).json({
        success:false,
        message:error.message,
        error:error,
      })
  }
  
}
const deleteIssue=async(req:Request,res:Response)=>{
  const {id}=req.params;
 
  try {
   const result=IssueService.deleteIssueFromDB(id as string)
    
    if((await result).rows.length===0){
      res.status(404).json({
        success:false,
        message:"Issue not found",
        data:{}
      })
    }

    res.status(200).json({
        success:true,
        message:"Issue DELETED successfully",
        data:{},
      })

  } catch (error:any) {
    res.status(500).json({
        success:false,
        message:error.message,
        error:error,
      })
  }
  
}

export const IssueController={
  createIssue,
  getAllIssue,
  getSingleIssue,
  updateIssue,
  deleteIssue
}