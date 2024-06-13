import Task from '../model/TaskSchema.js';
import User from '../model/AuthSchema.js';

export const addTask = async (req,res)=>{
    try{
        const {title,description,due,status} = req.body;
        if(!title || !description || !due || !status){
            return res.status(400).json({"message":"Please fill all the fields"});
        }
        let taskexit = await Task.findOne({title});
        if(taskexit){
            return res.status(400).json({"message":"Task already exist"});
        }
        const newTask = await Task.create({
            title,
            description,
            due,
            status,
            user_id:User._id
        });
        newTask.save();
        res.status(200).json({"message":"Task added successfully"});
    }catch(err){
        console.error(err);
        res.status(500).json({"message":"Internal Server Error"});
    }
}

export const addTaskPage = (req,res)=>{
    res.render('addtask');
}

export const viewAllTask = async (req,res)=>{
    try{
        const task = await Task.find({user_id:User._id});
        res.status(200).json(task);
    }catch(err){
        console.error(err);
        res.status(500).json({"message":"Internal Server Error"});
    }
}

export const viewtask=(req,res)=>{
    res.render('viewtask');
}

// export const viewIndividualTask = async (req,res)=>{
//     try{
//         const task = await Task.findById(req.params.id);
//         res.status(200).json(task);
//     }catch(err){
//         console.error(err);
//         res.status(500).json({"message":"Internal Server Error"});
//     }
// }

export const updateTask = async (req,res)=>{
    try{
        const {title,description,due,status} = req.body;
        if(!title || !description || !due || !status){
            return res.status(400).json({"message":"Please fill all the fields"});
        }
        const task = await Task.findByIdAndUpdate(req.params.id,{
            title,
            description,
            due,
            status
        },{new:true});
        res.status(200).json({"message":"Task updated successfully"});
    }catch(err){
        console.error(err);
        res.status(500).json({"message":"Internal Server Error"});
    }
}

export const deleteTask = async (req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({"message":"Task deleted successfully"});
    }
    catch(err){
        console.error(err);
        res.status(500).json({"message":"Internal Server Error"});
    }
}

export const deleteAllTask = async (req,res)=>{
    try{
        const task = await Task.deleteMany({user_id:User._id});
        res.status(200).json({"message":"All Task deleted successfully"});
    }
    catch(err){
        console.error(err);
        res.status(500).json({"message":"Internal Server Error"});
    }
}   

export const updateTaskPage = (req,res)=>{
    res.render('updatetask');
}
