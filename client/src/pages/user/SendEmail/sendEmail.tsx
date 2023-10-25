import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Form, Input, Button } from 'antd';

export const ContactUs = () => {
    const form = useRef();

    const sendEmail = (e: any) => {
        e.preventDefault();

        emailjs.sendForm('service_la6yzel', 'template_604npzp', e.target, 'lFDsvwdsjxYGi8aQ9')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Message</label>
            <input name="message" />


            <input type="submit" value="Send" />
        </form>
    );
};