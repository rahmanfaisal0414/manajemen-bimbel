'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const VerifyResetToken = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email') || '';

  const [otp, setOtp] = useState(Array(6).fill(''));
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (value: string, index: number) => {
    if (/^\d$/.test(value) || value === '') {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (value && nextInput) (nextInput as HTMLInputElement).focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = otp.join('');

    if (token.length !== 6) {
      toast.error('⚠️ Kode harus 6 digit');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('http://localhost:8000/api/auth/verify-reset-token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('✅ OTP valid! Redirecting...');
        setTimeout(() => router.push(`/auth/reset_password?email=${email}`), 1500);
      } else {
        toast.error(data.error || '❌ Token tidak valid');
      }
    } catch {
      toast.error('Terjadi kesalahan. Coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#C949E5] to-white">
      {/* Ilustrasi kiri */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-b from-[#C949E5] to-white items-center justify-center">
        <img src="/reset-token.png" alt="OTP Verification" className="w-3/4" />
      </div>

      {/* Form kanan */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-10 py-12 bg-white shadow-2xl rounded-lg">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-3">Verifikasi Kode OTP</h1>
        <p className="text-md text-center text-gray-600 mb-6">
          Masukkan 6 digit kode yang dikirim ke <br />
          <span className="text-purple-600 font-semibold">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex justify-center gap-4 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-14 h-14 text-2xl font-bold text-center border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-700 bg-purple-50"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-purple-600 text-white text-lg py-3 rounded-lg hover:bg-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          >
            {submitting ? 'Memverifikasi...' : 'Verifikasi Kode'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyResetToken;
