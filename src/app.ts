import express, { type Application, type Request, type Response } from "express"
import { authRoute } from "./modules/auth/auth.route"
import CookieParser from  "cookie-parser"

const app:Application=express()

app.use(CookieParser())
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))


app.get('/', (req:Request, res:Response) => {
  
  res.status(200).json({
    "message":"Assign-2 Server",
    "author":"Fatemaaaaa"
  })
})

app.use('/api/auth',authRoute)

export default app
