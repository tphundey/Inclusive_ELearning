const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Schema cho Categories với strict: false để cho phép các trường động
const categorySchema = new mongoose.Schema({}, { strict: false });

// Chuyển đổi _id thành id và loại bỏ các trường không mong muốn khi chuyển đổi thành JSON
categorySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

// Model cho Categories
const Category = mongoose.model('Category', categorySchema, 'categories');

// Lấy tất cả danh mục
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy danh mục theo ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid category ID' });
    }
    res.status(500).json({ message: error.message });
  }
});

// Tạo danh mục mới
router.post('/', async (req, res) => {
  const category = new Category({ ...req.body });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cập nhật danh mục
router.patch('/:id', async (req, res) => {
  const updates = req.body;
  const options = { new: true, runValidators: true, context: 'query' };

  try {
    const category = await Category.findByIdAndUpdate(req.params.id, updates, options);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid category ID' });
    }
    res.status(400).json({ message: error.message });
  }
});

// Xóa danh mục
router.delete('/:id', async (req, res) => {
  try {
    const result = await Category.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Deleted Category' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid category ID' });
    }
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
