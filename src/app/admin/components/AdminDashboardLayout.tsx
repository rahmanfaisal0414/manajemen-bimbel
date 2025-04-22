'use client';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-white p-8 overflow-y-auto">
        {/* Navbar Component */}
        <Navbar />

        {/* Children Content */}
        {children}
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
