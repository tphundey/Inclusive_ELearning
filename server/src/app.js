import mongoose from "mongoose";
import express from "express";
import cors from 'cors';
import router from "./controllers/course"
import routerCate from "./controllers/categories";
import routerGoogleAccounts from "./controllers/googleAccount";
import routerNotes from "./controllers/note";
import routerPayments from "./controllers/payment";
import routerPosts from "./controllers/posts";
import routerReviews from "./controllers/review";
import routerUserProgress from "./controllers/userProgress";
import routerVideoProgress from "./controllers/userVideoProgress";
import routerVideo from "./controllers/video";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/Courses", router);
app.use("/Categories", routerCate);
app.use("/googleAccount", routerGoogleAccounts);
app.use("/Payment", routerPayments);
app.use("/posts", routerPosts);
app.use("/Reviews", routerReviews);
app.use("/UserProgress", routerUserProgress);
app.use("/userVideoProgress", routerVideoProgress);
app.use("/Videos", routerVideo);
app.use("/Notes", routerNotes);

app.get("/", (req, res) => {
    res.send("Hello world");
});

mongoose.connect('mongodb+srv://Graduation:123@cluster0.nzrddg9.mongodb.net/LinkedIn_Learning').then(
    () => {
        console.log('Connected successfully!');
    }
).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

export const viteNodeApp = app;
