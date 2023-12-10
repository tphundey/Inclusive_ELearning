const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Review Schema with strict: false to allow dynamic fields
const reviewSchema = new mongoose.Schema({}, { strict: false });

// Transform _id to id in the output
reviewSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

// Review Model
const Review = mongoose.model('Review', reviewSchema, 'reviews');

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single review by id
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new review
router.post('/', async (req, res) => {
  const review = new Review({ ...req.body });

  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an existing review by id
router.patch('/:id', async (req, res) => {
  const updates = req.body;
  const options = { new: true };

  try {
    const review = await Review.findByIdAndUpdate(req.params.id, updates, options);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a review by id
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Deleted Review' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
