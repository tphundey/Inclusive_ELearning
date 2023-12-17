const express = require('express');
const Question = require('../models/questions');
const routerQuestions = express.Router();

routerQuestions.post('/', async (req, res) => {
  try {
    const { courseId, title, options, correctAnswerIndex } = req.body;

    const newQuestion = new Question({
      courseId,
      title,
      options, // Đảm bảo model Question của bạn có trường options để lưu mảng các lựa chọn
      correctAnswerIndex,
    });

    await newQuestion.save();

    res.json({ message: 'Question created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


routerQuestions.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = routerQuestions;
