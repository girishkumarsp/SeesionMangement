import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  // Initialize a single useState for both email and password
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

    // Function to update the email and password
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCredentials({
        ...credentials,
        [name]: value, // Dynamically update based on input field name
      });
    };

  const navigate = useNavigate()

  axios.defaults.withCredentials = true

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, such as sending a request to the server
    axios.post('http://localhost:8080/login',credentials)
    .then(res=>{
      if(res.data.login){
        // navigate('/') //  we can also use this navigate
        window.location.href = "/"
      }else{
        alert('Invalid credentials')
      }
      console.log(res)
    })
    .catch(err => console.log(err))
  };

  useEffect(()=>{
    axios.get('http://localhost:8080/')
    .then(res =>{
      if(res.data.valid){
        navigate('/')
      }else{
        navigate('/login')
      }
    })
    .catch(err => console.log(err))
  },[navigate])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={credentials.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
