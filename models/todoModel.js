import mongoose from "mongoose";

const schema = mongoose.Schema


const todoSchema = new schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    dueDate:{
        type:Date
    },
    priority:{
        type:String,
        enum:['Low','Medium','High'],
        default:'medium'
    },
    status:{
        type:String,
        enum: ['Pending', 'In-progress', 'Completed'], 
        default: 'pending'
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },

},{
    timestamps:true
})


const Todo = mongoose.model("todo",todoSchema)
export default Todo