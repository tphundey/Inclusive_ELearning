

const express = require('express');
const mongoose = require('mongoose');
const Coupons = require("../models/coupon");
const routerCoupon = express.Router();

// Create
routerCoupon.post("/", async (req, res) => {
  try {
    const newCourse = await Coupons.create(req.body);
    return res.status(201).json(newCourse);
  } catch (error) {
    return res.status(500).json({ error: "Could not create course" });
  }
});

// Read all
routerCoupon.get("/", async (req, res) => {
  try {
    const allPosts = await Coupons.find();

    if (!allPosts || allPosts.length === 0) {
      return res.status(404).json({ error: "No posts found" });
    }

    const reversedPosts = allPosts.reverse();

    return res.status(200).json(reversedPosts);
  } catch (error) {
    if (error.name === "MongoError" && error.code === 18) {
      return res.status(500).json({ error: "Invalid parameter format" });
    }
    return res.status(500).json({ error: "Could not retrieve posts" });
  }
});


routerCoupon.get("/:id", async (req, res) => {
  try {
    const course = await Coupons.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve course" });
  }
});
// Update Likes, LikedBy, and Comments
routerCoupon.put('/:id', async (req, res) => {
  try {
    const { quantity } = req.body;

    // Ensure that the quantity is a positive integer
    if (!Number.isInteger(quantity) || quantity < 0) {
      return res.status(400).json({ error: 'Invalid quantity value' });
    }

    // Find the coupon by ID and update the quantity
    const updatedCoupon = await Coupons.findByIdAndUpdate(
      req.params.id,
      { $set: { quantity } },
      { new: true }
    );

    if (!updatedCoupon) {
      return res.status(404).json({ error: 'Coupon not found or not updated' });
    }

    return res.status(200).json(updatedCoupon);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
// Delete
routerCoupon.delete("/:id", async (req, res) => {
  try {
    const deletedCourse = await Coupons.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: "Could not delete course" });
  }
});

module.exports = routerCoupon;
