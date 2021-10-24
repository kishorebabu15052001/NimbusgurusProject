require("dotenv").config();
const express=require("express");
const app=express();

const userRouter=require("./api/user_registration/register.router");

app.use(express.json());
app.use("/api/user",userRouter);

app.listen(process.env.APP_PORT,()=>{
    console.log("Server is running in port number",process.env.APP_PORT);
});