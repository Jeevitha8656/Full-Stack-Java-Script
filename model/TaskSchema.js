import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
      title:{
         type: String
      },
      description:{
         type: String
      },
      due:{
         type: String
      },
      status:{
         type: String
      },
      user_id:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
      }
      
   },{timestamps: true});

const Task = mongoose.model('Task',TaskSchema);

export default Task;


