import { pool } from "../../db"
import type { IIssue } from "./issues.interface";

const createIssueIntoDB=async(payload:IIssue)=>{const {title,description,type}=payload;


const result=await pool.query(`
  INSERT INTO Issues(title,description,type) VALUES($1,$2,$3)
  RETURNING *
  `,[title,description,type])

  return result;
}

const getAllIssuesFromDB=async()=>{
const result=await pool.query(`
      SELECT * FROM Issues
      `)

      return result;
}
const getSingleIssueFromDB=async(id:string)=>{
  const result = await pool.query(`
    SELECT * FROM Issues WHERE id=$1
    `,[id])
  return result
}

const updateIssueFromDB=async(payload:IIssue,id:string)=>{
  const {title,description,type}=payload
  const result = await pool.query(`UPDATE Issues 
    SET 
    title=COALESCE($1,title),
    description=COALESCE($2,description),
    type=COALESCE($3,type)
    WHERE id=$4 
    RETURNING *
    `,[title,description,type,id])
    
    return result;

}
const deleteIssueFromDB=async(id:string)=>{
   const result = await pool.query(`
    DELETE FROM Issues WHERE id=$1 
     RETURNING *  
    `,[id])
    return result
}

export const IssueService={
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
  updateIssueFromDB,
  deleteIssueFromDB
}