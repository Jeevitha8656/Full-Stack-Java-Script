import bcrypt from 'bcryptjs';
import User from '../model/AuthSchema.js';
import { LocalStorage } from 'node-localstorage';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
let env=dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;


// const localstorage = new LocalStorage('./scratch');

export const registerpage = (req,res)=>{
    res.render('register.ejs');
}


export const register= async (req,res)=>{
    try{
    const {name,email,password,confirmPassword} = req.body;
    console.log(req.body);  
    const userExist = await User.findOne({email});
    if (!name || !email || !password){
        return res.status(400).json({"message":"Please fill all the fields"});
    }
    if(password!==confirmPassword){
        return res.status(400).json({"message":"Password does not match"}); 
    }
    if (userExist){
        return res.status(404).json({"message":"User already exist"});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    })
    newUser.save();
    res.status(200).json({"message":"Succesfully registered"}).redirect('/login');
    }catch(err){
        console.error(err);
        res.status(500).json({"message":"Internal Server Error"});
    }   
}

export const loginpage = (req,res)=>{
    res.render('login.ejs');
}

export const login= async(req,res)=>{
    try{
    const {email,password} = req.body;
    const userExist = await User.findOne({email});
    if(!email || !password){
        return res.status(400).json({"message":"Please fill all the fields"});
    }
    if(!userExist){
        return res.status(404).json({"message":"User Does not exist Please register "})
    }
    const correctPassword = await bcrypt.compare(password,userExist.password);
    if(!correctPassword){
        return res.status(400).json({"message":"Incorrect Password"})
    }
    const token = jwt.sign({id:userExist._id},SECRET_KEY,{expiresIn: '1d'})
    res.header('auth-token',token).status(200).json({"message":"Logged In"})
    LocalStorage.setItem('userExist._id',token);
    res.redirect('/taskmanagement');
    }
    catch(err){
        console.error(err);
        res.status(500).json({"message":"Internal Server Error"});
    }
}

export const forgotpasswordPage = (req,res)=>{
    res.render('forgotpassword.ejs');
}

export const forgotPassword = async(req,res)=>{
    try{
    const {email,password,confirmPassword} = req.body;
    const user = await User.findOne({email});
    if(!email || !password || !confirmPassword){
        return res.status(400).json({"message":"Please fill all the fields"});
    }
    if(password!==confirmPassword){
        return res.status(400).json({"message":"Password does not match"}); 
    }
    if(!user){
        return res.status(404).json({"message":"User Does not exist Please register "})
    }
    const hashedPassword = await bcrypt.hash(password,10);
    user.password = hashedPassword;
    user.save();
    res.status(200).json({"message":"Password Updated Succesfully"});
    }
    catch(err){
        console.error(err);
        res.status(500).json({"message":"Internal Server Error"});
    }
}















//  const loginGet = (req,res)=>{
//     res.render('login.html');
// }

//  const loginPost = async(req,res)=>{
//     try{
//     const {email,password} = req.body;
//     const userExist = await User.findOne({email});
    
//     if(!userExist){
//         return res.status(404).json({"message":"User Does not exist Please register "})
//     }
//     const correctPassword = await bcrypt.compare(password,userExist.password);
//     if(!correctPassword){
//         return res.status(400).json({"message":"Incorrect Password"})
//     }
//     let token = jwt.sign({id:userExist._id},SECRET_KEY,{expiresIn: '1d'})
//     res.header('auth-token',token).json({"message":"Logged In"})
//     // localstorage.setItem('userExist._id',token);
//     // res.redirect('/task/');
//    }catch(err){
//       console.error(err);
//       res.status(500).json({"message":"Internal Server Error"})
//    }
// }

// const getLocalStorage = (req, res) => {
//     const key = req.query.key; // Assuming the key is passed as a query parameter
//     // Now you can read from localStorage using the key
//     const value = localStorage.getItem(key); // You would need to implement localStorage functionality in your Node.js server
//     res.send(value);
// }

// export {
//     registerGet,
//     registerPost,
//     loginGet,
//     loginPost,
//     getLocalStorage
// }