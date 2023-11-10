import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username:{
    type:String,
    require:true,
    unique:true
  },
  email:{
    type:String,
    require:true,
    unique:true
  },
  password:{
    type:String,
    require:true,
  },
  img:{
    type:String,//store url
    require:false,
  },
  country:{
    type:String,
    require:true,
  },
  phone:{
    type:String,
    require:false,
  },
  password:{
    type:String,
    require:true,
  },
  desc:{
    type:String,
    require:false,
  },
  isSeller:{
    type:Boolean,
    default:false,
    require:true,
  },
  verified:{
    type:Boolean,
    default:false,
  },
},{
timestamps:true
});

export default mongoose.model("user",userSchema)