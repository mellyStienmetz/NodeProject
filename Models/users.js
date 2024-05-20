import mongoose from "mongoose";
const Schema = mongoose.Schema;


const UserSchema=mongoose.Schema({
   name:String,
   email:String,
   password:String,
  linkArr:{type:[{ type: Schema.Types.ObjectId, ref: 'LinkSchema' }],
default:[]
},
});

export default mongoose.model("users",UserSchema);