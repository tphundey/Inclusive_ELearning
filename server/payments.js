const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Định nghĩa Schema cho payments với các trường linh hoạt
const paymentSchema = new mongoose.Schema({}, { strict: false });

// Chuyển đổi _id thành id và loại bỏ các trường không mong muốn khi trả về JSON
paymentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

// Model cho payments
const Payment = mongoose.model('Payment', paymentSchema, 'payments');

// Lấy tất cả payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy payment theo ID
router.get('/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tạo payment mới
router.post('/', async (req, res) => {
  const payment = new Payment({ ...req.body });

  try {
    const newPayment = await payment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cập nhật payment theo ID
router.patch('/:id', async (req, res) => {
  const updates = req.body;
  const options = { new: true };

  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, updates, options);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Xóa payment theo ID
router.delete('/:id', async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json({ message: 'Deleted Payment' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
