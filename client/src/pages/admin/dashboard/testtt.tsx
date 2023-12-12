import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gửi yêu cầu đến API giả mạo khi component được tạo
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        // Lấy ra một số câu hỏi giả mạo từ API
        const fakeQuestions = response.data.slice(0, 5);
        setQuestions(fakeQuestions);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    // Xử lý việc nộp bài kiểm tra, bạn có thể gửi userAnswers đến server để kiểm tra đáp án
    console.log('User answers:', userAnswers);
  };

  return (
    <div>
      <h1>Trang Làm Bài Kiểm Tra</h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div>
          <form>
            {questions.map(question => (
              <div key={question.id}>
                <p>{question.title}</p>
                <label>
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value="true"
                    onChange={() => handleAnswerChange(question.id, true)}
                  />
                  Đúng
                </label>
                <label>
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value="false"
                    onChange={() => handleAnswerChange(question.id, false)}
                  />
                  Sai
                </label>
              </div>
            ))}
            <button type="button" onClick={handleSubmit}>
              Nộp bài
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TestPage;
