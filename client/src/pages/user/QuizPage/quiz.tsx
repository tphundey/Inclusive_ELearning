import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Form, Input, Radio, Button, Card, message, Upload, Table, Tabs } from 'antd';
import './quiz.css'
import { useParams } from 'react-router-dom';

const Quizfor = () => {
  const formRef = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [excelData, setExcelData] = useState(null);
  const { id } = useParams(); // Get the ID from the URL
  const apiUrl = `http://localhost:3000/questions/${id}`;
  console.log(id, 'id trên url');
  const courseId2 = id;
  const [courseName, setCourseName] = useState('');
  const [coutquestion, setcoutquestion] = useState('');
  useEffect(() => {
    const fetchCourseName = async () => {
      try {
        // Gửi yêu cầu đến API để lấy thông tin khóa học với courseId trùng với id trên URL
        const response = await axios.get(`http://localhost:3000/Courses/${courseId2}`);
        setCourseName(response.data.courseName);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu khóa học:', error);
      }
    };

    fetchCourseName();
  }, [courseId2]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gửi yêu cầu đến API để lấy câu hỏi với courseId trùng với id trên URL
        const response = await axios.get(`http://localhost:3000/questions?courseId=${id}`);
        setQuestions(response.data);
        setcoutquestion(response.data.length)
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu câu hỏi:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSelectAnswer = (questionId, answerIndex) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answerIndex,
    });
  };

  const handleSubmitAnswers = () => {
    const totalQuestions = questions.length;
    const correctAnswers = questions.reduce((totalCorrect, question) => {
      const userAnswer = userAnswers[question.id];
      const correctAnswerIndex = question.correctAnswerIndex;

      return userAnswer === correctAnswerIndex ? totalCorrect + 1 : totalCorrect;
    }, 0);
    const percentage = (correctAnswers / totalQuestions) * 100;
    message.success(`Điểm của bạn là: ${percentage.toFixed(2)}%`);

  };
  return (
    <div className='quiz-container'>
      <h2 className='text-red-500 font-bold mt-5 mb-3'>{`Khóa học: ${courseName}`}</h2>  <p className='text-red-600 mb-5 '>Tổng số câu hỏi: {coutquestion}</p>

      {questions.map(question => (
        <Card key={question.id} title={question.title}>
          <Radio.Group
            onChange={(e) => handleSelectAnswer(question.id, e.target.value)}
            value={userAnswers[question.id]}
          >
            {question.options ? (
              question.options.map((option, index) => (
                <Radio key={index} value={index}>{option}</Radio>
              ))
            ) : (
              <p>No options available for this question.</p>
            )}
          </Radio.Group>
        </Card>
      ))}

      <Button className='bg-blue-500 mt-3 mb-5' type="primary" onClick={handleSubmitAnswers}>
        Kiểm tra điểm!
      </Button>
    </div>
  );
};

export default Quizfor;
