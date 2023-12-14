import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Radio, Button, Card, message } from 'antd';
import './test.css'
const TestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gửi yêu cầu đến API câu hỏi khi component được tạo
    axios.get('http://localhost:3000/questions')
      .then(response => {
        // Lấy ra một số câu hỏi từ API
        const fakeQuestions = response.data.slice(0, 5);
        setQuestions(fakeQuestions);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleAddQuestion = (values) => {
    // Gửi câu hỏi lên API
    axios.post('http://localhost:3000/questions', values)
      .then(response => {
        // Cập nhật danh sách câu hỏi sau khi thêm thành công
        setQuestions([...questions, response.data]);
      })
      .catch(error => {
        console.error('Error adding question:', error);
      });
  };

  const handleSelectAnswer = (questionId, answerIndex) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answerIndex,
    });
  };

  const handleSubmitAnswers = () => {
    // Compare user answers with correctAnswerIndex
    const score = questions.reduce((totalScore, question) => {
      const userAnswer = userAnswers[question.id];
      const correctAnswerIndex = question.correctAnswerIndex;

      return userAnswer === correctAnswerIndex ? totalScore + 1 : totalScore;
    }, 0);
    message.success(`Điểm của bạn là: ${score}`);
    // Do something with the score (you can display it, send it to the server, etc.)
    console.log('User Score:', score);
  };

  return (
    <div className='quiz-container'>
      <h1>Trang Làm Bài Kiểm Tra</h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div>
          <Form onFinish={handleAddQuestion}>
            <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Lựa chọn 1" name="options[0]" rules={[{ required: true, message: 'Vui lòng nhập lựa chọn 1!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Lựa chọn 2" name="options[1]" rules={[{ required: true, message: 'Vui lòng nhập lựa chọn 2!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Lựa chọn 3" name="options[2]" rules={[{ required: true, message: 'Vui lòng nhập lựa chọn 3!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Đáp án đúng" name="correctAnswerIndex" rules={[{ required: true, message: 'Vui lòng chọn đáp án đúng!' }]}>
              <Radio.Group>
                <Radio value={0}>Lựa chọn 1</Radio>
                <Radio value={1}>Lựa chọn 2</Radio>
                <Radio value={2}>Lựa chọn 3</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Thêm Câu Hỏi</Button>
            </Form.Item>
          </Form>
          
         
        </div>
      )}
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

<Button type="primary" onClick={handleSubmitAnswers}>
            Xác Nhận Đáp Án
          </Button>
    </div>
  );
};

export default TestPage;
