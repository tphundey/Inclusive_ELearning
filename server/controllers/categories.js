const express = require('express');
const mongoose = require('mongoose');
const routerCate = express.Router();
const Categories = require("../models/categories");
// Create
routerCate.post("/", async (req, res) => {
  try {
    const newCourse = await Categories.create(req.body);
    return res.status(201).json(newCourse);
  } catch (error) {
    return res.status(500).json({ error: "Could not create course" });
  }
});

// Read all
routerCate.get("/", async (req, res) => {
  try {
    const courses = await Categories.find();
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve cate" });
  }
});

// Read by ID
routerCate.get("/:id", async (req, res) => {
  try {
    const course = await Categories.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve course" });
  }
});

// Update
routerCate.patch("/:id", async (req, res) => {
  try {
    const updatedCourse = await Categories.findByIdAndUpdate(
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
routerCate.delete("/:id", async (req, res) => {
  try {
    const deletedCourse = await Categories.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: "Could not delete course" });
  }
});

module.exports = routerCate;
