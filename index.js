import express from "express"
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import mongoose from "mongoose";
import UsersRouter from "./Routers/UsersRouter.js";
import LinksRouter from "./Routers/LinksRouter.js";
import connectDb from "./connectDb.js";
import links from "./Models/links.js";

dotenv.config();
connectDb();
const app=express();
app.use(cors());
app.use(bodyParser.json());
app.get('/',(req,res)=>{res.send("helghjlo")});
app.get('/:id',async(req,res)=>{
    const id=req.params.id;
    // שלא יהיה מצב ששתי משתמשים ילחצו ביחד על אותו קישור ולשיהם יחזירו את אותו אוביקט אחרון שנכנס
    const session = await mongoose.startSession();
session.startTransaction();
    try{
        let link=await links.findByIdAndUpdate(id, { $push: { clicks: {"ipAddress":req.socket.remoteAddress } } },{new:true});
        if(req.query.hasOwnProperty(link.targetParamName))
        {
            link=await links.findByIdAndUpdate(id,
                 { $push: { targetValues: {"name":req.query[link.targetParamName] ,"value":link.clicks[link.clicks.length - 1]._id} } },{new:true});
        }
 
    res.writeHead(302, { 'Location': link.originalUrl });
    res.end();
     await session.commitTransaction();
}

catch(e)
{
    await session.abortTransaction();
    res.status(400).json({message:e.message});
}
finally {
    session.endSession();
  };
});
app.post("/login",(req,res=>{}))

app.use('/Users',UsersRouter);
app.use('/Links',LinksRouter);

const port=3000;



app.listen(port,()=>{console.log(`listening on ...${port}`)})





