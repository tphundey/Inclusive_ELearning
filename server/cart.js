const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Schema cho một mục trong giỏ hàng với các trường linh hoạt
const cartItemSchema = new mongoose.Schema({}, { strict: false });

// Schema cho giỏ hàng
const cartSchema = new mongoose.Schema({
  email: {
    type: String
  },
  products: [cartItemSchema]
}, { strict: false });

// Sử dụng một hàm trước khi chuyển đổi schema thành JSON
cartSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { 
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    // Xử lý mảng sản phẩm nếu cần
    ret.products.forEach(product => {
      product.id = product._id;
      delete product._id;
      delete product.__v;
    });
  }
});

const Cart = mongoose.model('Cart', cartSchema, 'carts');

// Route để lấy tất cả giỏ hàng
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route để lấy giỏ hàng theo email
router.get('/:email', async (req, res) => {
  try {
    const cart = await Cart.findOne({ email: req.params.email });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route để thêm giỏ hàng mới
router.post('/', async (req, res) => {
  const cart = new Cart({ ...req.body });

  try {
    const newCart = await cart.save();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route để cập nhật giỏ hàng
router.patch('/:id', async (req, res) => {
  const updates = req.body;
  const options = { new: true };

  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, updates, options);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route để xóa giỏ hàng
router.delete('/:id', async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json({ message: 'Deleted Cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
