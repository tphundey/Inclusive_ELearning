import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Form, Input, Radio, Button, Card, message, Upload, Table, Tabs } from 'antd';
import './quiz.css'
import * as XLSX from 'xlsx';
import { UploadOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const TestPage = () => {
  const formRef = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [excelData, setExcelData] = useState(null);
  const { id } = useParams(); // Get the ID from the URL
  const apiUrl = `http://localhost:3000/questions/${id}`;
  console.log(id, 'id trên url');

  const [formData, setFormData] = useState({
    title: '',
    options: ['', '', ''],
    correctAnswerIndex: 0,
  });
  const handleExcelUpload = (info) => {
    if (info.file.status === 'done') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetNames = workbook.SheetNames;
        sheetNames.forEach(sheetName => {
          const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

          const processedData = sheetData.map(row => ({
            title: row['Title'],
            options: [row['Option1'], row['Option2'], row['Option3']],
            correctAnswerIndex: row['Kết quả'],
          }));

          const { title, options, correctAnswerIndex } = processedData[0];
          // Use setFieldsValue to set the form values
          formRef.current.setFieldsValue({
            title: title || '',
            options: options || ['', '', ''],
            correctAnswerIndex: correctAnswerIndex || 0,
          });

          setExcelData(processedData);
        });
      };
      reader.readAsArrayBuffer(info.file.originFileObj);
    } else if (info.file.status === 'error') {
      message.error('File upload failed.');
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gửi yêu cầu đến API để lấy câu hỏi với courseId trùng với id trên URL
        const response = await axios.get(`http://localhost:3000/questions?courseId=${id}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu câu hỏi:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleAddQuestion = (values) => {
    // Kiểm tra xem values.options có tồn tại và không rỗng không
    if (values.options && Object.values(values.options).length > 0) {
      // Gửi câu hỏi lên API
      axios.post('http://localhost:3000/questions', {
        courseId: id,
        title: values.title,
        options: Object.values(values.options),
        correctAnswerIndex: values.correctAnswerIndex,
      })
        .then(response => {
          message.success(`Thêm thành công `);
          // setQuestions([...questions, response.data]);
        })
        .catch(error => {
          console.error('Error adding question:', error);
        });
    } else {
      console.error('Options are missing or empty in the form values');
    }
  };


  const handleSelectAnswer = (questionId, answerIndex) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answerIndex,
    });
  };

  const handleDeleteQuestion = (questionId: any) => {
    // Send a request to your API to delete the question by ID
    axios.delete(`http://localhost:3000/questions/${questionId}`)
      .then(response => {
        message.success('Xóa câu hỏi thành công');
        // Update the list of questions after successful deletion
        const updatedQuestions = questions.filter(q => q.id !== questionId);
        setQuestions(updatedQuestions);
      })
      .catch(error => {
        console.error('Error deleting question:', error);
      });
  };
  return (
    <div className=''>
      <div>
        <Upload
          customRequest={({ onSuccess }) => onSuccess('ok')}
          onChange={handleExcelUpload}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Import Excel</Button>
        </Upload>

        <br /><br />

        {excelData && excelData.map((item, index) => (
          <div key={index}>
            {/* <p>Tiêu đề: {item.title}</p>
              <p>Option1: {item.option1}</p>
              <p>Option2: {item.option2}</p>
              <p>Option3: {item.option3}</p>
              <p>Kết quả: {item.result}</p> */}

            <Form onFinish={handleAddQuestion} initialValues={item} ref={formRef} >
              <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Lựa chọn 1" name={['options', '0']} rules={[{ required: true, message: 'Vui lòng nhập lựa chọn 1!' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Lựa chọn 2" name={['options', '1']} rules={[{ required: true, message: 'Vui lòng nhập lựa chọn 2!' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Lựa chọn 3" name={['options', '2']} rules={[{ required: true, message: 'Vui lòng nhập lựa chọn 3!' }]}>
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
                <Button className='bg-blue-500' type="primary" htmlType="submit">
                  Thêm Câu Hỏi
                </Button>
              </Form.Item>
            </Form>
          </div>



        ))}
        <Form onFinish={handleAddQuestion} initialValues={formData} ref={formRef} >
          {/* <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Lựa chọn 1" name={['options', '0']} rules={[{ required: true, message: 'Vui lòng nhập lựa chọn 1!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Lựa chọn 2" name={['options', '1']} rules={[{ required: true, message: 'Vui lòng nhập lựa chọn 2!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Lựa chọn 3" name={['options', '2']} rules={[{ required: true, message: 'Vui lòng nhập lựa chọn 3!' }]}>
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
              <Button className='bg-blue-500' type="primary" htmlType="submit">
                Thêm Câu Hỏi
              </Button>
            </Form.Item> */}
        </Form>
      </div>
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
              <p>không có đáp án </p>
            )}
          </Radio.Group>


          <div className="flex gap-6 items-center mt-4">
            <div className="correct-answer">
              <p className='text-blue-700'>Đáp án chính xác: {question.options[question.correctAnswerIndex]}</p>
            </div>

            <Button
              className='bg-red-500 text-white'
              type="danger"
              onClick={() => handleDeleteQuestion(question.id)}
            >
              Xóa câu hỏi!
            </Button>
          </div>
        </Card>
      ))}


    </div>
  );
};

export default TestPage;
