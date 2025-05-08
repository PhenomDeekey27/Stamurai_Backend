import mongoose from "mongoose";
const Schema = mongoose.Schema;



const userSchema = new Schema({
  name: {
    type:String,
    requried:true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
 
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'user'],
    default: 'user', // default role
  },
});



const User = mongoose.model("User",userSchema)
export default User