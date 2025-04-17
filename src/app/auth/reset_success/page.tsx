'use client';

import Link from 'next/link';

const ResetSuccess = () => {
  return (
    <div className="flex h-screen bg-gradient-to-b from-[#C949E5] to-white">
      <div className="w-full flex flex-col justify-center items-center px-16 py-12 bg-white shadow-lg rounded-lg">

        {/* Success Icon */}
        <div className="w-16 h-16 bg-purple-600 text-white flex items-center justify-center rounded-full mb-6">
          <span className="text-2xl font-bold">✔</span>
        </div>
        
        <h1 className="text-4xl font-extrabold text-center text-purple-600 mb-6">
          Check Your Email!
        </h1>
        <p className="text-lg text-center text-gray-700 mb-8">
          We have sent you a password reset link. Please check your inbox (and spam folder).
        </p>

        <Link
          href="/auth/signin"
          className="w-full bg-purple-600 text-white py-3 rounded-lg mt-6 text-center hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  );
};

export default ResetSuccess;
