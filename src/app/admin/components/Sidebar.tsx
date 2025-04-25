'use client';

import Link from 'next/link';

const menuItems = [
  { href: '/admin', label: 'Home', icon: '/icons/home.svg' },
  { href: '/admin/student-management', label: 'Student Management', icon: '/icons/student.svg' },
  { href: '/admin/tutor-management', label: 'Tutor Management', icon: '/icons/tutor.svg' },
  { href: 'admin/class-management', label: 'Class Management', icon: '/icons/class.svg' },
  { href: '/admin/learning-management', label: 'Learning Management', icon: '/icons/learning.svg' },
  { href: '/admin/feedback', label: 'Feedback & Reviews', icon: '/icons/feedback.svg' },
  { href: '/admin/settings', label: 'Settings', icon: '/icons/settings.svg' },
];

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 w-[290px] h-screen bg-[#C949E5] text-white flex flex-col p-4 font-[Poppins] z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6 px-2">
        <img src="/icons/logo.svg" alt="Logo" className="w-8 h-8 filter invert" />
        <span className="text-xl font-bold">BIMBEL</span>
      </div>

      {/* Admin Info Horizontal */}
      <div className="flex items-center mb-6 px-2">
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <img
            src="/admin-avatar.png"
            alt="Admin Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-3">
          <p className="text-lg font-semibold">Rahman Faisal</p>
          <p className="text-sm text-white/80">Admin</p>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="space-y-1 text-base font-medium">
        {menuItems.map((item, index) => (
          <div key={item.href}>
            {/* Divider sebelum semua item KECUALI Home */}
            {index !== 0 && <hr className="border-t border-white/30 my-2 mx-2" />}

            <Link
              href={item.href}
              className="flex items-center gap-4 px-4 py-3 hover:bg-white/10 rounded-md transition"
            >
              <img src={item.icon} alt={item.label} className="w-6 h-6 filter invert" />
              <span>{item.label}</span>
            </Link>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
