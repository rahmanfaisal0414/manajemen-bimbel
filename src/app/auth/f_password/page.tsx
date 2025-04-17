'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi mengirim email untuk reset kata sandi
    // Setelah mengirim link reset, arahkan ke halaman konfirmasi
    setSubmitted(true);
    setTimeout(() => {
      router.push('/auth/reset_success'); // Halaman konfirmasi sukses
    }, 2000); // Waktu delay 2 detik
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-[#C949E5] to-white">
      {/* Form Forget Password */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-16 py-12 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-extrabold text-center text-purple-600 mb-6">
          Forgot Your Password?
        </h1>
        <p className="text-lg text-center text-gray-700 mb-8">
          No worries, we'll help you reset it. Enter your email to receive a password reset link.
        </p>

        <div className="space-y-6">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-800 font-medium">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 p-4 border border-gray-300 text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-lg mt-6 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
              {submitted ? 'Sending Link...' : 'Send Reset Link'}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Remember your password?{' '}
            <Link href="/auth/signin" className="text-purple-600 hover:text-purple-700">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Ilustrasi */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-b from-[#C949E5] to-white flex items-center justify-center">
        <img
          src="/forgot-password-image.png"
          alt="Forget Password Illustration"
          className="w-3/4"
        />
      </div>
    </div>
  );
};

export default ForgetPassword;
