const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const productSchema = new mongoose.Schema({}, { strict: false });

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

const Product = mongoose.model('Course', productSchema, 'courses');

// Route để lấy tất cả sản phẩm và sắp xếp theo tên
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({}).sort('name'); // Sắp xếp theo trường 'name'
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const product = new Product({ ...req.body });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  const updates = req.body;
  const options = { new: true, runValidators: true, context: 'query' };

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, updates, options);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    res.status(400).json({ message: error.message });
  }
});

// Route để xóa sản phẩm theo id
router.delete('/:id', async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Deleted Product' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
