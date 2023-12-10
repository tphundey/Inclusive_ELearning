const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Định nghĩa Schema cho video với các trường linh hoạt
const videoSchema = new mongoose.Schema({}, { strict: false });

// Chuyển đổi _id thành id và loại bỏ các trường không mong muốn khi trả về JSON
videoSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

// Model cho video
const Video = mongoose.model('Video', videoSchema, 'videos');

// Lấy tất cả video
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy video theo ID
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tạo video mới
router.post('/', async (req, res) => {
  const video = new Video({ ...req.body });

  try {
    const newVideo = await video.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cập nhật video theo ID
router.patch('/:id', async (req, res) => {
  const updates = req.body;
  const options = { new: true };

  try {
    const video = await Video.findByIdAndUpdate(req.params.id, updates, options);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Xóa video theo ID
router.delete('/:id', async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json({ message: 'Deleted Video' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
