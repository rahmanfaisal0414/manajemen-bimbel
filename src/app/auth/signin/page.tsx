'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter hook
import Link from 'next/link';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Initialize the useRouter hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Example check, you can replace this with an actual authentication logic
    if (username === 'admin' && password === 'password') {
      // Redirect to the dashboard if the credentials are correct
      router.push('/admin');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-[#C949E5] to-white">
      {/* Form Sign In */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-16 py-12 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-extrabold text-center text-purple-600 mb-6">
          Welcome Back
        </h1>
        <p className="text-lg text-center text-gray-700 mb-8">
          Login to your bimbel account
        </p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-800 font-medium">Username or Email</label>
              <input
                type="text"
                placeholder="Enter your username or email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-2 p-4 border border-gray-300 text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-800 font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 p-4 border border-gray-300 text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <Link href="/auth/f_password" className="text-purple-600 text-sm hover:text-purple-700">
                Forgot your password?
              </Link>
            </div>

            <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-lg mt-6 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
              Sign In
            </button>

            <p className="mt-6 text-center text-gray-600">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-purple-600 hover:text-purple-700">
                Create one
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Ilustrasi */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-b from-[#C949E5] to-white flex items-center justify-center">
        <img
          src="/login-image.png"
          alt="Login Illustration"
          className="w-3/4"
        />
      </div>
    </div>
  );
};

export default SignIn;
