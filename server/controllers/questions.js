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
    const { courseId } = req.query;

    if (courseId) {
      // If courseId is provided, filter questions based on courseId
      const questions = await Question.find({ courseId });
      res.json(questions);
    } else {
      // If courseId is not provided, fetch all questions
      const questions = await Question.find();
      res.json(questions);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
routerQuestions.delete('/:id', async (req, res) => {
  try {
    const questionId = req.params.id;

    // Check if the question exists
    const existingQuestion = await Question.findById(questionId);
    if (!existingQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Delete the question
    await Question.findByIdAndDelete(questionId);

    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
module.exports = routerQuestions;
