"use client"
import { useState } from 'react';
import axios from 'axios';

// Ensure API URL is correct
const API = process.env.NEXT_PUBLIC_API_URL;

const ContactComponent = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API}/contact`, { name: 'Test', email: 'test@example.com', phone: '1234567890', message: 'Test message' });

            if (response.status === 200) {
                alert('Message sent successfully!');
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                alert('Failed to send message.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('An error occurred. Please try again.');
        }
    };


    return (
        <section className="contact_section layout_padding">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="heading_container">
                            <h2>Contact Us</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    name="message"
                                    className="message-box"
                                    placeholder="Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="btn-box">
                                <button type="submit">SEND</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <div className="img-box">
                            <img src="./images/about-img.png" alt="Contact" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactComponent;
