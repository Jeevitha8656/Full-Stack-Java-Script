import express from 'express';
import { addTask ,addTaskPage,viewAllTask,viewtask,updateTask,updateTaskPage,deleteTask,deleteAllTask} from '../Controller/TaskController.js';

const router = express.Router();

router.post('/addTask', addTask);
router.get('/addTask', addTaskPage);
router.get('/viewAllTask', viewAllTask);
router.get('/viewtask', viewtask);
router.put('/updateTask/:id', updateTask);
router.get('/updateTask', updateTaskPage);
router.delete('/deleteTask/:id', deleteTask);
router.delete('/deleteAllTask', deleteAllTask);





export default router;
