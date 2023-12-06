import express from "express";
import Notes from "../models/notes";

const routerNotes = express.Router();

// Create
routerNotes.post("/", async (req, res) => {
  try {
    const newCourse = await Notes.create(req.body);
    return res.status(201).json(newCourse);
  } catch (error) {
    return res.status(500).json({ error: "Could not create course" });
  }
});

// Read all
routerNotes.get("/", async (req, res) => {
  try {
    const courses = await Notes.find();
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve courses" });
  }
});

// Read by ID
routerNotes.get("/:id", async (req, res) => {
  try {
    const course = await Notes.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve course" });
  }
});

// Update
routerNotes.put("/:id", async (req, res) => {
  try {
    const updatedCourse = await Notes.findByIdAndUpdate(
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
routerNotes.delete("/:id", async (req, res) => {
  try {
    const deletedCourse = await Notes.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: "Could not delete course" });
  }
});

export default routerNotes;
