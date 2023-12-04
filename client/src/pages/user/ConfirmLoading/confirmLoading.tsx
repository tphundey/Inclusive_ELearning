import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { applyActionCode, getAuth } from 'firebase/auth';

const ConfirmLoading: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const oobCode = new URLSearchParams(location.search).get('oobCode');

    const confirmEmail = async () => {
      try {
        await applyActionCode(auth, oobCode!);
        console.log('Xác nhận email thành công.');
        navigate('/');
      } catch (error: any) {
        console.error('Lỗi xác nhận email:', error.message);
      }
    };
    if (oobCode) {
      confirmEmail();
    } else {
      console.error('Không tìm thấy mã xác nhận trong URL.');
    }
  }, [location, navigate, auth]);

  return (
    <div>
      <p>Xác nhận email...</p>
    </div>
  );
};

export default ConfirmLoading;
