// /app/admin/components/AdminDashboardLayout.tsx

'use client';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AdminDashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-white p-8">
        {/* Navbar Component */}
        <Navbar />
        {/* Add more content here */}
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
