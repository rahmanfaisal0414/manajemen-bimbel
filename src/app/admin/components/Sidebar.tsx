'use client';

import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-1/5 bg-[#C949E5] text-white p-6 flex flex-col justify-start">
    {/* Admin Info */}
    <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 overflow-hidden rounded-full mb-4">
        <img
            src="/admin-avatar.png"
            alt="Admin Avatar"
            className="w-full h-full object-cover" // Ensures the image covers the circle without distortion
        />
        </div>
        <p className="text-lg font-semibold">Rahman Faisal</p>
        <p className="text-sm">Admin</p>
    </div>


      {/* Sidebar Menu */}
      <nav className="space-y-6">
        {/* Home Link */}
        <Link
          href="/"
          className="flex items-center space-x-2 text-white hover:text-purple-300"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h18v18H3z"
            />
          </svg>
          <span>Home</span>
        </Link>

        {/* Student Management Link */}
        <Link
          href="/student-management"
          className="flex items-center space-x-2 text-white hover:text-purple-300"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5v14l11-7z"
            />
          </svg>
          <span>Student Management</span>
        </Link>

        {/* Tutor Management Link */}
        <Link
          href="/tutor-management"
          className="flex items-center space-x-2 text-white hover:text-purple-300"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 8h14l-7 7z"
            />
          </svg>
          <span>Tutor Management</span>
        </Link>

        {/* Class Management Link */}
        <Link
          href="/class-management"
          className="flex items-center space-x-2 text-white hover:text-purple-300"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16v12H4z"
            />
          </svg>
          <span>Class Management</span>
        </Link>

        {/* Learning Management Link */}
        <Link
          href="/learning-management"
          className="flex items-center space-x-2 text-white hover:text-purple-300"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 4h18l-9 16z"
            />
          </svg>
          <span>Learning Management</span>
        </Link>

        {/* Feedback & Reviews Link */}
        <Link
          href="/feedback-reviews"
          className="flex items-center space-x-2 text-white hover:text-purple-300"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5v14l11-7z"
            />
          </svg>
          <span>Feedback & Reviews</span>
        </Link>

        {/* Settings Link */}
        <Link
          href="/settings"
          className="flex items-center space-x-2 text-white hover:text-purple-300"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5v14l11-7z"
            />
          </svg>
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
