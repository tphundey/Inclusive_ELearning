

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
routerCoupon.patch("/:id", async (req, res) => {
  try {
    const { likes, likedBy, comments } = req.body;

    // Update likes, likedBy, and comments for the post
    const updatedPost = await Coupons.findByIdAndUpdate(
      req.params.id,
      { likes, likedBy, comments },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ error: "Could not update post" });
  }
});
// Update
routerCoupon.put("/:id", async (req, res) => {
  try {
    const updatedCourse = await Coupons.findByIdAndUpdate(
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
