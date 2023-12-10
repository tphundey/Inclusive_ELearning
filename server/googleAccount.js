const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Google Account Schema with strict: false to allow dynamic fields
const googleAccountSchema = new mongoose.Schema({}, { strict: false });

// Transform _id to id in the output
googleAccountSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

// Google Account Model
const GoogleAccount = mongoose.model('GoogleAccount', googleAccountSchema, 'googleAccounts');

// Get all Google Accounts
router.get('/', async (req, res) => {
  try {
    const accounts = await GoogleAccount.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single Google Account by id
router.get('/:id', async (req, res) => {
  try {
    const account = await GoogleAccount.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ message: 'Google account not found' });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new Google Account
router.post('/', async (req, res) => {
  const account = new GoogleAccount({ ...req.body });

  try {
    const newAccount = await account.save();
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an existing Google Account by id
router.patch('/:id', async (req, res) => {
  const updates = req.body;
  const options = { new: true };

  try {
    const account = await GoogleAccount.findByIdAndUpdate(req.params.id, updates, options);
    if (!account) {
      return res.status(404).json({ message: 'Google account not found' });
    }
    res.json(account);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Google Account by id
router.delete('/:id', async (req, res) => {
  try {
    const account = await GoogleAccount.findByIdAndDelete(req.params.id);
    if (!account) {
      return res.status(404).json({ message: 'Google account not found' });
    }
    res.json({ message: 'Deleted Google Account' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
