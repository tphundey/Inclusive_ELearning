import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Form, Input, Radio, Button, Card, message, Upload, Table, Tabs, Result } from 'antd';
import './quiz.css'
import { useParams } from 'react-router-dom';

const Quizfor = () => {
  const formRef = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [excelData, setExcelData] = useState(null);
  const { id } = useParams(); // Get the ID from the URL
  console.log(id, 'id trên url');
  const courseId2 = id;
  const [courseName, setCourseName] = useState('');
  const [coutquestion, setcoutquestion] = useState('');
  const [submitted, setSubmitted] = useState(false); // Track if the quiz is submitted
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [congratulations, setCongratulations] = useState(false); // Track if the user got 100% correct

  useEffect(() => {
    const fetchCourseName = async () => {
      try {
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
        const response = await axios.get(`http://localhost:3000/questions?courseId=${id}`);
        setQuestions(response.data);
        setcoutquestion(response.data.length);
        setCorrectAnswers(response.data.reduce((acc, question) => {
          acc[question.id] = question.correctAnswerIndex;
          return acc;
        }, {}));
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
    setSubmitted(true);
    const totalQuestions = questions.length;
    const correctAnswersCount = questions.reduce((totalCorrect, question) => {
      const userAnswer = userAnswers[question.id];
      const correctAnswerIndex = question.correctAnswerIndex;

      return userAnswer === correctAnswerIndex ? totalCorrect + 1 : totalCorrect;
    }, 0);
    const percentage = (correctAnswersCount / totalQuestions) * 100;

    if (percentage === 100) {
      setCongratulations(true);
    } else {
      message.success(`Điểm của bạn là: ${percentage.toFixed(2)}%`);
    }
  };

  return (
    <div className='quiz-container'>
      {congratulations ? (
        <Result
          status="success"
          title="Chúc mừng!"
          subTitle={`Bạn đã trả lời đúng 100% câu hỏi trong khóa học ${courseName}.`}
        />
      ) : (
        <>
          <h2 className='text-red-500 font-bold mt-5 mb-3'>{`Khóa học: ${courseName}`}</h2>
          <p className='text-red-600 mb-5 '>Tổng số câu hỏi: {coutquestion}</p>

          {questions.map((question) => (
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

              {submitted && (
                <div className="answer-feedback">
                  {userAnswers[question.id] === correctAnswers[question.id] ? (
                    <p className="text-green-500">Đúng!</p>
                  ) : (
                    <p className="text-red-500">{`Sai! Câu trả lời đúng là: ${question.options[correctAnswers[question.id]]}`}</p>
                  )}
                </div>
              )}
            </Card>
          ))}

          <Button className='bg-blue-500 mt-3 mb-5' type="primary" onClick={handleSubmitAnswers}>
            Kiểm tra điểm!
          </Button>
        </>
      )}
    </div>
  );
};

export default Quizfor;
