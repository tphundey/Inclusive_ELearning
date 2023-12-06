import express from "express";
import Payment from "../models/payment";

const routerPayments = express.Router();

// Create
routerPayments.post("/", async (req, res) => {
  try {
    const newCourse = await Payment.create(req.body);
    return res.status(201).json(newCourse);
  } catch (error) {
    return res.status(500).json({ error: "Could not create course" });
  }
});

// Read all
routerPayments.get("/", async (req, res) => {
  try {
    const courses = await Payment.find();
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve courses" });
  }
});

// Read by ID
routerPayments.get("/:id", async (req, res) => {
  try {
    const course = await Payment.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve course" });
  }
});

// Update
routerPayments.put("/:id", async (req, res) => {
  try {
    const updatedCourse = await Payment.findByIdAndUpdate(
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
routerPayments.delete("/:id", async (req, res) => {
  try {
    const deletedCourse = await Payment.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: "Could not delete course" });
  }
});

export default routerPayments;
