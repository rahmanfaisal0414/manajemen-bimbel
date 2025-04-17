// /app/admin/components/Navbar.tsx

'use client';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center space-x-4 w-3/4">
        <div className="bg-white border-2 rounded-md flex items-center px-4 py-2 w-full">
          <input type="text" className="outline-none w-full" placeholder="Search for..." />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative">
          <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>
        <button className="w-8 h-8 rounded-full overflow-hidden">
          <img src="/admin-avatar.png" alt="Admin Avatar" className="w-full h-full object-cover" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
