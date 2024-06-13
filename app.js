import express from 'express'; // import express
import cors from 'cors'; // import cors
 import TaskRouter from './router/TaskRoute.js'// import router
import AuthRouter from './router/AuthRoute.js'// import router
const app=express();
app.set('view engine','ejs');
app.set('views','./views');
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({extended:true}));   

app.use('/',AuthRouter)
app.use("/task",TaskRouter);


export default app;