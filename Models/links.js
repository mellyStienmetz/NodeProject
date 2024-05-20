import mongoose, { Schema } from "mongoose";


const LinkSchema=mongoose.Schema({
    originalUrl:{
        type:String,
        required:true,
        default:"jhgf.com"
    }
    ,
     clicks: [{
        insertedAt: {
          type: Date,
          default: Date.now
        },
        ipAddress: {
          type: String,
          required: true
        }
      }],
      targetParamName:
      {
        type:String,
        default:"t",
    
    },
      targetValues:[
        {
            name:{type:String,default:""},
            value:
            {
                type: Schema.Types.ObjectId,
                 ref: 'clicks'
            }
        }
      ]
});

export default mongoose.model("links",LinkSchema);