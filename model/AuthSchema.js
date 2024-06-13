
import mongoose from 'mongoose';


mongoose.connect('mongodb://localhost:27017/testdb').then(()=>{
    console.log("Database connected");
}).catch((err)=>{ 
    console.log(err);
});



const AuthSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true});


const User = mongoose.model('User',AuthSchema);

export default User;


