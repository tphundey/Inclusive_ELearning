
const express = require('express');
const mongoose = require('mongoose');
const Reviews = require("../models/reviews");
const routerReviews = express.Router();

// Create
routerReviews.post("/", async (req, res) => {
  try {
    const newCourse = await Reviews.create(req.body);
    return res.status(201).json(newCourse);
  } catch (error) {
    return res.status(500).json({ error: "Could not create course" });
  }
});

routerReviews.get("/", async (req, res) => {
  try {
    const { courseID } = req.query;
    if (courseID) {
      const filteredReviews = await Reviews.find({ courseID });
      return res.status(200).json(filteredReviews);
    }

    const allReviews = await Reviews.find();
    return res.status(200).json(allReviews);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve reviews" });
  }
});

// Read by ID
routerReviews.get("/:id", async (req, res) => {
  try {
    const course = await Reviews.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve course" });
  }
});

// Update
routerReviews.put("/:id", async (req, res) => {
  try {
    const updatedCourse = await Reviews.findByIdAndUpdate(
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
routerReviews.delete("/:id", async (req, res) => {
  try {
    const deletedCourse = await Reviews.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: "Could not delete course" });
  }
});

module.exports = routerReviews;
