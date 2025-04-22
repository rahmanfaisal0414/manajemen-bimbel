'use client';

import AdminDashboardLayout from './components/AdminDashboardLayout';

const AdminHomeContent = () => {
  const stats = [
    { label: 'Total Tutor', value: 12 },
    { label: 'Total Student', value: 87 },
    { label: 'Total Class', value: 4 },
    { label: 'Average Attendance', value: '96%' },
  ];

  const schedule = [
    { status: 'OFFLINE', subject: 'MATHEMATICS - CLASS 11 A', tutor: 'MR. BUDI', time: '10:00 – 13:00' },
    { status: 'ONLINE', subject: 'SCIENCE - CLASS 10 C', tutor: 'MRS. RATNA', time: '10:00 – 13:00' },
    { status: 'OFFLINE', subject: 'MATHEMATICS - CLASS 11 B', tutor: 'MRS. BUDI', time: '13:00 – 15:00' },
    { status: 'OFFLINE', subject: 'CHEMISTRY - CLASS 11 B', tutor: 'MR. RUDI', time: '15:00 – 17:00' },
    { status: 'OFFLINE', subject: 'SCIENCE - CLASS 12 A', tutor: 'MRS. EVA', time: '19:00 – 21:00' },
    { status: 'OFFLINE', subject: 'CHEMISTRY - CLASS 12 A', tutor: 'MRS. RUDI', time: '20:00 – 21:00' },
  ];

  return (
    <AdminDashboardLayout>
      <div className="space-y-10 mt-6 font-[Poppins]">
        {/* Statistic Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-xl px-5 py-6 text-center shadow-sm hover:shadow-md transition"
            >
              <p className="text-xs text-gray-500 font-semibold">{item.label}</p>
              <h2 className="text-4xl font-bold text-[#C949E5] my-2">{item.value}</h2>
              <button className="text-xs text-[#C949E5] font-medium hover:underline transition">
                See All →
              </button>
            </div>
          ))}
        </div>

        {/* Schedule Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base md:text-lg font-semibold text-[#C949E5]">
              Schedule Time Statement - Today
            </h3>
            <button className="text-sm font-medium text-[#C949E5] hover:underline flex items-center gap-1">
              See All →
            </button>
          </div>

          <div className="divide-y border rounded-lg overflow-hidden">
            {schedule.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3 text-sm font-medium bg-white hover:bg-gray-50 transition">
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs font-bold ${
                    item.status === 'ONLINE' ? 'bg-green-500' : 'bg-blue-600'
                  }`}
                >
                  {item.status}
                </span>
                <span className="text-[#C949E5] w-1/3">{item.subject}</span>
                <span className="text-gray-800 w-1/4 text-center">{item.tutor}</span>
                <img src="/icons/profile.svg" alt="profile" className="w-5 h-5" />
                <span className="text-[#9D53CB] w-1/4 text-right">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          {['Student', 'Tutor', 'Class'].map((type) => (
            <button
              key={type}
              className="bg-[#C949E5] text-white rounded-lg px-4 py-3 flex items-center gap-2 shadow-md hover:bg-[#a837c5] transition"
            >
              <span className="text-xl font-bold">+</span>
              <span className="text-sm font-medium">Add {type}</span>
            </button>
          ))}
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminHomeContent;
