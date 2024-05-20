import mongoose from "mongoose";


const  connectDb=async()=>{
    await mongoose.connect(process.env.DB_URI);
};

const database=mongoose.connection;

database.on('error',(error)=>{console.log(error);
})

database.once('connected',()=>{console.log("Database Connected");
})

// mongoose.set('toJSON',{
//     virtuals:true,
//     transform:(doc,converted)=>{
//         delete converted._id;
//     }
// })

export default connectDb;