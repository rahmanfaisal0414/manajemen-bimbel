import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-white font-[Poppins]">
      {/* Sidebar (fixed) */}
      <div className="w-[290px] fixed h-full z-30">
        <Sidebar />
      </div>

      {/* Konten utama */}
      <div className="ml-[290px] flex-1 flex flex-col">
        {/* Navbar tetap fixed */}
        <div className="fixed top-0 left-[290px] right-0 z-20">
          <Navbar />
        </div>

        {/* Main content */}
        <main className="pt-[72px] px-6 pb-6 overflow-y-auto h-screen bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
