// src/app/register/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Registration failed');
        setLoading(false);
      }
      else{
        setEmail('');
        setName('');
        setSuccess(true);
        setLoading(false);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //   <div className="bg-white p-8 rounded-lg shadow-md w-96">
    //     <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
    //     {error && <p className="text-red-500 mb-4">{error}</p>}
    //     <form onSubmit={handleSubmit}>
    //       <div className="mb-4">
    //         <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
    //         <input
    //           type="email"
    //           id="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //           className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
    //           placeholder="Enter your email"
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
    //         <input
    //           type="text"
    //           id="name"
    //           value={name}
    //           onChange={(e) => setName(e.target.value)}
    //           required
    //           className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
    //           placeholder="Enter your name"
    //         />
    //       </div>
    //       <button
    //         type="submit"
    //         className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
    //       >
    //         Register
    //       </button>
    //     </form>
    //   </div>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-red-500 h-screen shadow-md w-70% hidden sm:block">
            <Image src="/ffdesktop.jpg" alt="Logo" width={1000} height={1000} quality={100} className="w-full h-full object-cover" />
        </div>
        <div className={`bg-black p-8 h-screen shadow-md w-full sm:w-1/2 flex items-center justify-center relative `}>
        <h1 className="text-5xl font-bold mb-6 text-center font-sans absolute top-[10%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10">ATX ARMY</h1>
        <Image src="/ffmobile.jpg" alt="Logo" width={1000} height={1000} quality={100} className="w-full h-full  opacity-20 sm:opacity-0 object-cover absolute top-0 left-0" />
        <div className=" p-8 rounded-lg w-[400px] z-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-transparent border-2   rounded-md focus:outline-none focus:ring focus:border-emerald-300"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 bg-transparent border-2 rounded-md focus:outline-none focus:ring focus:border-emerald-300"
              placeholder="Enter your name"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 sm:bg-emerald-500 text-white py-2 rounded-md sm:hover:bg-emerald-600 transition duration-300"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        {success && (
          <div className="mt-4 text-green-500">
            Registration successful!
          </div>
        )}
      </div>
        </div>
    </div>
  );
}
