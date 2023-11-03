import mongoose from "mongoose";
import express from "express";
// import routerApp from "./router";
import CourseRouter from "./routers/Course";
import authRouter from "./Routers/auth";
import categoryRouter from "./Routers/Categorys";
import videoRouter from './Routers/video';
import userRouter from './Routers/user'
import Uploader from './Routers/uploader'
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
// routerApp(app);

app.get("/", (req, res) => {
    res.send("Hello word");
});
app.use('/api', CourseRouter);
app.use('/api', Uploader);
app.use('/api',videoRouter);
app.use('/auth', authRouter)
app.use('/api', categoryRouter)
app.use('/api',userRouter)
app.use('/api',upload)

mongoose.connect('mongodb+srv://datnsph25191:lvmSjx4T4CvRDckN@cluster0.4xubugv.mongodb.net/').then(
    console.log('Connected successfully')
)
export const viteNodeApp = app;