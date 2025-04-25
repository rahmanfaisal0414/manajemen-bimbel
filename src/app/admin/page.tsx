'use client';

import { useEffect, useState } from 'react';

type StatItem = { label: string; value: number | string };
type ScheduleItem = { subject: string; status: string; tutor: string; time: string };

const AdminHomeContent = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/admin/dashboard/');
        const data = await res.json();
        setStats(data.stats || []);
        setSchedule(data.schedule || []);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading dashboard...</div>;
  }

  return (
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

        <div className="divide-y-2 border-2 rounded-lg overflow-hidden">
          {schedule.map((item, i) => (
            <div key={i} className="px-4 py-4 bg-white hover:bg-gray-50 transition">
              <div className="flex justify-between items-center">
                <span className="text-[#C949E5] font-medium">{item.subject}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-white text-xs font-bold ${
                    item.status === 'ONLINE' ? 'bg-green-500' : 'bg-blue-600'
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <div className="mt-2 flex justify-between items-center text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <img src="/icons/profile.svg" alt="profile" className="w-4 h-4" />
                  <span>{item.tutor}</span>
                </div>
                <span className="text-[#9D53CB]">{item.time}</span>
              </div>
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
  );
};

export default AdminHomeContent;
