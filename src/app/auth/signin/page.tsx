'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/api/auth/signin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: username,
          password: password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('🎉 Login berhasil, selamat datang!');

        // Simpan user info ke localStorage
        localStorage.setItem('user', JSON.stringify(data));

        // Redirect berdasarkan role
        if (data.role === 'admin') {
          router.push('/admin');
        } else if (data.role === 'tutor') {
          router.push('/tutor');
        } else if (data.role === 'student') {
          router.push('/student');
        } else {
          router.push('/'); // fallback kalau role tidak dikenal
        }
      } else {
        toast.error(data.error || '❌ Gagal login. Cek username atau password kamu!');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('❌ Terjadi kesalahan saat login.');
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
            {/* Username / Email Input */}
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

            {/* Password Input */}
            <div>
              <label className="block text-sm text-gray-800 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-2 p-4 pr-12 border border-gray-300 text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-between items-center mt-4">
              <Link href="/auth/f_password" className="text-purple-600 text-sm hover:text-purple-700">
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg mt-6 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Sign In
            </button>

            {/* Link to Sign Up */}
            <p className="mt-6 text-center text-gray-600">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-purple-600 hover:text-purple-700">
                Create one
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Illustration */}
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
