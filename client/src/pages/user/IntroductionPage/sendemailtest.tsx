// Client-side (React) code
import React, { useState } from 'react';
import axios from 'axios';

const EmailButton = () => {
  const [emailSent, setEmailSent] = useState(false);

  const sendEmail = async () => {
    try {
      const response = await axios.post('http://localhost:3000/send-email', {
        to: 'taidvph20044@gmail.com',
        subject: 'Test Email',
        text: 'This is a test email from React client.',
      });

      console.log(response.data);
      setEmailSent(true);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div>
      <button onClick={sendEmail} disabled={emailSent}>
        {emailSent ? 'Email Sent!' : 'Send Email'}
      </button>
    </div>
  );
};

export default EmailButton;
