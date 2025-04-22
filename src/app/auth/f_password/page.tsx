'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/auth/request-reset/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Kode reset berhasil dikirim ke email kamu!');
        setTimeout(() => {
          router.push('/auth/reset_success');
        }, 2000);
      } else {
        toast.error(data.error || '❌ Gagal mengirim reset link');
      }
    } catch (err) {
      toast.error('Terjadi kesalahan saat mengirim permintaan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-[#C949E5] to-white">
      {/* Form Forget Password */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-16 py-12 bg-white shadow-xl rounded-lg">
        <h1 className="text-4xl font-extrabold text-center text-purple-600 mb-6">
          Forgot Your Password?
        </h1>
        <p className="text-lg text-center text-gray-700 mb-8">
          No worries! Masukkan email kamu dan kami akan kirimkan link reset password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-800 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-4 border border-gray-300 text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Remember your password?{' '}
          <Link href="/auth/signin" className="text-purple-600 hover:text-purple-700 font-medium">
            Sign In
          </Link>
        </p>
      </div>

      {/* Ilustrasi */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-b from-[#C949E5] to-white">
        <img src="/forgot-password-image.png" alt="Reset Illustration" className="w-3/4" />
      </div>
    </div>
  );
};

export default ForgetPassword;
