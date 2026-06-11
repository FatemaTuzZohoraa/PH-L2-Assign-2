import express, { type Application, type Request, type Response } from "express"
import { authRouter } from "./modules/auth/auth.route"

const app:Application=express()

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))


app.get('/', (req:Request, res:Response) => {
  
  res.status(200).json({
    "message":"Assign-2 Server",
    "author":"Fatemaaaaa"
  })
})

app.use('/api/auth',authRouter)

export default app
