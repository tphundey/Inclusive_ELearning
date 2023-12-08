import mongoose from "mongoose";
import express from "express";
import cors from 'cors';
const coursesController = require("./controllers/coursesController");
const categoriesController = require("./controllers/categoriesController");
const googleAccountController = require("./controllers/googleAccountController");
const paymentController = require("./controllers/paymentController");
const postsController = require("./controllers/postsController");
const reviewsController = require("./controllers/reviewsController");
const userProgressController = require("./controllers/userProgressController");
const userVideoProgressController = require("./controllers/userVideoProgressController");
const videoController = require("./controllers/videoController");
const notesController = require("./controllers/notesController");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/Courses", coursesController);
app.use("/Categories", categoriesController);
app.use("/googleAccount", googleAccountController);
app.use("/Payment", paymentController);
app.use("/posts", postsController);
app.use("/Reviews", reviewsController);
app.use("/UserProgress", userProgressController);
app.use("/userVideoProgress", userVideoProgressController);
app.use("/Videos", videoController);
app.use("/Notes", notesController);

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
