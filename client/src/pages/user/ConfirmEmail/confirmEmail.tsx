import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { applyActionCode, getAuth } from 'firebase/auth';

const ConfirmEmail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    const oobCode = new URLSearchParams(location.search).get('oobCode');

    const confirmEmail = async () => {
      try {
        await applyActionCode(auth, oobCode!);
        console.log('Xác nhận email thành công.');
      } catch (error: any) {
        console.error('Lỗi xác nhận email:', error.message);
      }
    };

    if (oobCode) {
      confirmEmail();
    } else {
      console.error('Không tìm thấy mã xác nhận trong URL.');
    }
  }, [location, auth]);

  const handleSendData = async () => {
    try {
      // Dữ liệu để post
      const postData = {
        userId: auth.currentUser?.uid,
        displayName: displayName || auth.currentUser?.displayName,
        email: auth.currentUser?.email,
        photoURL: photoURL || auth.currentUser?.photoURL,

        courseSaved: [],
        registeredCourseID: [8, 2],
        collectionCourseID: [],
        historyCourseID: [10, 10]
      };

      // Gửi request POST đến API
      await axios.post('http://localhost:3000/googleAccount', postData);

      navigate('/');
    } catch (error: any) {
      console.error('Lỗi khi gửi dữ liệu:', error.message);
    }
  };

  return (
    <div>
      <p>Xác nhận email...</p>
      <div>
        <label htmlFor="displayName">Tên:</label>
        <input
          type="text"
          id="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="photoURL">URL hình ảnh:</label>
        <input
          type="text"
          id="photoURL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSendData}>Gửi</button>
      </div>
    </div>
  );
};

export default ConfirmEmail;
