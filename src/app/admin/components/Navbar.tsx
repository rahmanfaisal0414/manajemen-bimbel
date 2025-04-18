'use client';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md border-b border-gray-200">
      {/* Search Bar */}
      <div className="flex items-center bg-[#F7F7F7] border border-[#E3E3E3] rounded-md px-4 py-2 w-1/2">
        <input
          type="text"
          placeholder="Search for..."
          className="bg-transparent w-full text-sm text-gray-600 focus:outline-none"
        />
        <img
          src="/icons/search.svg"
          alt="Search"
          className="w-5 h-5 text-[#9D53CB] ml-2"
        />
      </div>

      {/* Icons: Notification, Profile, Menu */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <div className="relative">
          <img
            src="/icons/notification.svg"
            alt="Notification"
            className="w-6 h-6 text-[#9D53CB]"
          />
          <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </div>

        {/* Profile */}
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src="/admin-avatar.png"
            alt="Admin Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Three Dots / More */}
        <button>
          <img
            src="/icons/dots.svg"
            alt="More"
            className="w-6 h-6 text-[#9D53CB]"
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
