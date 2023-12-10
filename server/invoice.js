const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Định nghĩa Schema cho hóa đơn với các trường linh hoạt
const invoiceSchema = new mongoose.Schema({}, { strict: false });

// Chuyển đổi _id thành id và loại bỏ các trường không mong muốn khi trả về JSON
invoiceSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

// Model cho hóa đơn
const Invoice = mongoose.model('Invoice', invoiceSchema, 'invoices');

// Lấy tất cả hóa đơn
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy hóa đơn theo ID
router.get('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tạo hóa đơn mới
router.post('/', async (req, res) => {
  const invoice = new Invoice({ ...req.body });

  try {
    const newInvoice = await invoice.save();
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cập nhật hóa đơn theo ID
router.patch('/:id', async (req, res) => {
  const updates = req.body;
  const options = { new: true };

  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, updates, options);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Xóa hóa đơn theo ID
router.delete('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json({ message: 'Deleted Invoice' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
