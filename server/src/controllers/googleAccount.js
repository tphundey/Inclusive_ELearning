import express from "express";
import GoogleAccount from "../models/googleAccount";

const routerGoogleAccounts = express.Router();

// Create
routerGoogleAccounts.post("/", async (req, res) => {
  try {
    const newCourse = await GoogleAccount.create(req.body);
    return res.status(201).json(newCourse);
  } catch (error) {
    return res.status(500).json({ error: "Could not create course" });
  }
});

// Read all
routerGoogleAccounts.get("/", async (req, res) => {
  try {
    const courses = await GoogleAccount.find();
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve courses" });
  }
});

// Read by ID
routerGoogleAccounts.get("/:id", async (req, res) => {
  try {
    const course = await GoogleAccount.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve course" });
  }
});

// Update
routerGoogleAccounts.put("/:id", async (req, res) => {
  try {
    const updatedCourse = await GoogleAccount.findByIdAndUpdate(
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
routerGoogleAccounts.delete("/:id", async (req, res) => {
  try {
    const deletedCourse = await GoogleAccount.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: "Could not delete course" });
  }
});

export default routerGoogleAccounts;
