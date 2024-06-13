import express from 'express';
import {register,registerpage,login,loginpage,forgotPassword,forgotpasswordPage} from '../Controller/AuthController.js';

const router = express.Router();

router.get('/register', registerpage);
router.post('/register', register);
router.get('/login', loginpage);
router.post('/login', login);
router.get('/forgotpassword',forgotpasswordPage);
router.post('/forgotpassword',forgotPassword);

// import { registerGet,registerPost,loginGet,loginPost, getLocalStorage } from "../controllers/authController.js";

// const router = express();

// // router.get('/register', registerGet);

// // router.get('/login', loginGet);

// router.post('/register', registerPost);

// router.post('/login', loginPost);

// // router.get('/getFromLocalStorage', getLocalStorage);

export default router;