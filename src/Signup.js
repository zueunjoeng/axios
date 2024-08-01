// src/Signup.js
import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => { // 모든 input , selct 
    const { name, value } = e.target;
    setFormData({
      ...formData, // 이전 데이터
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 데이터 2번전송됨 
    console.log('Form data submitted:', formData); // 확인
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([
          { username: formData.username, email: formData.email, password: formData.password }
        ]);

      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Form data submitted:', data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h2>Signup Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
