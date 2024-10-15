import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  axios.defaults.withCredentials = true


  useEffect(()=>{
    axios.get('http://localhost:8080/')
    .then(res =>{
      if(res.data.valid){
        setEmail(res.data.email)
      }else{
        navigate('/login')
      }
    })
    .catch(err => console.log(err))
  },[navigate])
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="bg-white shadow w-full">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Our Website {email}</h1>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your One-Stop Solution</h2>
          <p className="text-gray-600 mb-6">
            We offer a variety of services to cater to your needs. Explore our website to learn more!
          </p>
          <a
            href="/contact"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Contact Us
          </a>
        </div>
      </main>
      <footer className="bg-gray-800 text-white w-full py-4">
        <p className="text-center">&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
