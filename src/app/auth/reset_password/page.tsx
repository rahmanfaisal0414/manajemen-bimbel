'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch('http://localhost:8000/api/auth/reset-password/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success('🔐 Password berhasil direset!');
      setTimeout(() => router.push('/auth/signin'), 2000);
    } else {
      toast.error(data.error || '❌ Gagal reset password');
    }

    setSubmitting(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#C949E5] to-white">
      {/* Ilustrasi Kiri */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-b from-[#C949E5] to-white">
        <img src="/reset-password.png" alt="Reset Illustration" className="w-3/4" />
      </div>

      {/* Form Kanan */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-16 py-12 bg-white shadow-2xl rounded-lg">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-6">Reset Your Password</h1>
        <p className="text-center text-gray-700 mb-8">Buat kata sandi baru untuk akun kamu</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-800">New Password</label>
            <input
              type={showNewPassword ? 'text' : 'password'}
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mt-2 p-4 pr-12 bg-purple-50 border-2 border-purple-300 rounded-lg text-purple-700 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-600"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-[52%] transform -translate-y-1/2 text-purple-500"
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-800">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-2 p-4 pr-12 bg-purple-50 border-2 border-purple-300 rounded-lg text-purple-700 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-600"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-[52%] transform -translate-y-1/2 text-purple-500"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-purple-600 text-white text-lg py-3 rounded-lg hover:bg-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          >
            {submitting ? 'Menyimpan...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
