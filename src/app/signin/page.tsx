'use client';

import { useState } from 'react';
import Link from 'next/link';

const SignIn = () => {
  const [fade, setFade] = useState(false);

  const handleTransition = () => {
    setFade(true);
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-[#C949E5] to-white">
      {/* Form Sign In */}
      <div
        className={`w-full md:w-1/2 flex flex-col justify-center px-16 py-12 bg-white shadow-lg rounded-lg transition-all duration-700 ease-in-out transform ${
          fade ? 'opacity-0 scale-95 translate-x-[-100%]' : 'opacity-100 scale-100 translate-x-0'
        }`}
      >
        <h1 className="text-4xl font-extrabold text-center text-purple-600 mb-4 transition-all duration-700 ease-in-out">
          Welcome Back
        </h1>
        <p className="text-lg text-center text-gray-700 mb-12">
          Login to your bimbel account
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-800 font-medium">Username or Email</label>
            <input
              type="text"
              placeholder="Enter your username or email"
              className="w-full mt-2 p-4 border border-gray-600 text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-800 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-2 p-4 border border-gray-600 text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <Link href="#" className="text-purple-600 text-sm hover:text-purple-700">
              Forgot your password?
            </Link>
          </div>

          <button className="w-full bg-purple-600 text-white py-3 rounded-lg mt-6 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300">
            Sign In
          </button>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" onClick={handleTransition} className="text-purple-600 hover:text-purple-700">
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Ilustrasi */}
      <div
        className={`hidden md:flex w-1/2 bg-gradient-to-b from-[#C949E5] to-white flex items-center justify-center transition-all duration-700 ease-in-out transform ${
          fade ? 'opacity-0 scale-95 translate-x-[100%]' : 'opacity-100 scale-100 translate-x-0'
        }`}
      >
        <img
          src="/login-image.png"
          alt="Login Illustration"
          className="w-3/4 transition-all duration-700 ease-in-out transform"
        />
      </div>
    </div>
  );
};

export default SignIn;
