import mongoose from "mongoose";
import express from "express";
// import routerApp from "./router";
import CourseRouter from "./Routers/Course";
import payments from "./Routers/payments";
import authRouter from "./Routers/auth";
import categoryRouter from "./Routers/Categorys";
import videoRouter from './Routers/video';
import userRouter from './Routers/user'
import upload from './Routers/uploader'
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
// routerApp(app);

app.get("/", (req, res) => {
    res.send("Hello word");
});
app.use('/', CourseRouter);
app.use('/api', payments);
app.use('/',videoRouter);
app.use('/', authRouter)
app.use('/', categoryRouter)
app.use('/',userRouter)
app.use('/',upload)

mongoose.connect('mongodb+srv://datnsph25191:lvmSjx4T4CvRDckN@cluster0.4xubugv.mongodb.net/').then(
    console.log('Connected successfully')
)
export const viteNodeApp = app;