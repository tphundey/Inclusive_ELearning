import express from "express";
import UserProgress from "../models/userProgress";

const routerUserProgress = express.Router();

// Create
routerUserProgress.post("/", async (req, res) => {
  try {
    const newCourse = await UserProgress.create(req.body);
    return res.status(201).json(newCourse);
  } catch (error) {
    return res.status(500).json({ error: "Could not create course" });
  }
});

// Read all
routerUserProgress.get("/", async (req, res) => {
  try {
    const courses = await UserProgress.find();
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve courses" });
  }
});

// Read by ID
routerUserProgress.get("/:id", async (req, res) => {
  try {
    const course = await UserProgress.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve course" });
  }
});

// Update
routerUserProgress.put("/:id", async (req, res) => {
  try {
    const updatedCourse = await UserProgress.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(200).json(updatedCourse);
  } catch (error) {
    return res.status(500).json({ error: "Could not update course" });
  }
});

// Delete
routerUserProgress.delete("/:id", async (req, res) => {
  try {
    const deletedCourse = await UserProgress.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: "Could not delete course" });
  }
});

export default routerUserProgress;
