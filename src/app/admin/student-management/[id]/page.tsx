"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface ClassOption {
  id: number;
  class_name: string;
  current_student_count: number;
  capacity: number; // 👈 tambahkan ini
}

interface StudentDetailType {
  full_name: string;
  student_id: string;
  email: string;
  phone: string;
  address: string;
  class_name: string;
  class_level: string;
  status: string;
  attendance: string;
  total_meetings: number;
  gender: string;
  birthdate: string;
  parent_contact: string;
  present_count: number;
  assignments: {
    title: string;
    grade: number;
    feedback: string;
  }[];
  attendance_history: {
    date: string;
    status: string;
  }[];
  class_history: {
    class_name: string;
    moved_at: string;
  }[];
}

export default function StudentDetailPage() {
  const { id } = useParams();
  const [student, setStudent] = useState<StudentDetailType | null>(null);
  const [classOptions, setClassOptions] = useState<ClassOption[]>([]);
  const [newClassId, setNewClassId] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showClassModal, setShowClassModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/admin/student/${id}/`)
      .then((res) => res.json())
      .then((data) => setStudent(data));

    fetch("http://localhost:8000/api/admin/list-classes/")
      .then((res) => res.json())
      .then((data) => setClassOptions(data));
  }, [id]);

  const handleChangeClass = async () => {
    if (!newClassId) return;
    setActionLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch(`http://localhost:8000/api/admin/student/${id}/change-class/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ class_id: newClassId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengganti kelas.");
      window.location.reload();
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setActionLoading(false);
      setShowClassModal(false);
    }
  };

  const handleToggleStatus = async () => {
    setActionLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch(
        `http://localhost:8000/api/admin/student/${id}/deactivate/`,
        { method: "POST" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengubah status.");
      window.location.reload();
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (!student) return <div className="p-6">Loading...</div>;

  const biodataFields: [string, React.ReactNode][] = [
    ["Full Name", student.full_name],
    ["Student ID", student.student_id],
    ["Email", student.email],
    ["Phone", student.phone],
    ["Address", student.address],
    ["Gender", student.gender === "L" ? "Laki-laki" : student.gender === "P" ? "Perempuan" : "-"],
    ["Birthdate", student.birthdate],
    ["Parent Contact", student.parent_contact],
    ["Class", `${student.class_name} (${student.class_level})`],
    [
      "Status",
      <span className="inline-flex items-center gap-1">
        {student.status === "Active" ? (
          <>
            <FaCheckCircle className="text-green-600" />
            <span className="text-green-700 font-medium">Active</span>
          </>
        ) : (
          <>
            <FaTimesCircle className="text-red-500" />
            <span className="text-red-600 font-medium">Inactive</span>
          </>
        )}
      </span>,
    ],
    ["Attendance", student.attendance],
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-[Poppins]">
      <Link
        href="/admin/student-management"
        className="inline-flex items-center gap-2 text-sm mb-6 px-4 py-2 bg-white border border-purple-200 text-[#C949E5] rounded-lg shadow-sm hover:bg-purple-50 transition"
      >
        <span className="text-lg">←</span> <span>Back to Student List</span>
      </Link>

      <h1 className="text-3xl font-bold text-[#C949E5] mb-6">Student Detail</h1>

      {/* Biodata */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-purple-100">
        <h2 className="text-xl font-semibold text-[#C949E5] mb-4">Biodata</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {biodataFields.map(([label, value]) => (
            <div key={label}>
              <p className="text-sm text-gray-500 font-semibold mb-1">{label}</p>
              <p className="text-base text-gray-800">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-purple-100">
        <h2 className="text-xl font-semibold text-[#C949E5] mb-4">📅 Attendance Summary</h2>
        <p className="text-gray-700 text-base">
          Hadir <strong className="text-green-600">{student.present_count}</strong> dari{" "}
          <strong>{student.total_meetings}</strong> pertemuan (
          <span className="font-semibold text-[#C949E5]">{student.attendance}</span>)
        </p>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-500"
            style={{ width: student.attendance }}
          ></div>
        </div>
      </div>

      {/* Assignment Grades */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-purple-100">
        <h2 className="text-xl font-semibold text-[#C949E5] mb-4">Assignment Grades</h2>
        {student.assignments.length === 0 ? (
          <p className="text-sm text-gray-500 italic">Belum ada nilai tugas.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {student.assignments.map((a, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-white transition"
              >
                <p className="font-semibold text-gray-800 mb-1">{a.title}</p>
                <p className="text-gray-700 text-sm">
                  Grade: <strong>{a.grade}</strong>
                </p>
                <p className="text-gray-700 text-sm italic">Feedback: {a.feedback}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Attendance History */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-purple-100">
        <h2 className="text-xl font-semibold text-[#C949E5] mb-4">Attendance History</h2>
        {student.attendance_history.length === 0 ? (
          <p className="text-sm text-gray-500 italic">Belum ada riwayat kehadiran.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {student.attendance_history.map((entry, i) => (
              <li key={i} className="flex justify-between py-3 text-sm text-gray-800">
                <span>{entry.date}</span>
                <span
                  className={`font-medium ${
                    entry.status === "Present" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {entry.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Class History */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-purple-100">
        <h2 className="text-xl font-semibold text-[#C949E5] mb-4">Class History</h2>
        {student.class_history.length === 0 ? (
          <p className="text-sm text-gray-500 italic">Belum ada riwayat kelas.</p>
        ) : (
          <ul className="divide-y divide-gray-200 text-sm text-gray-800">
            {student.class_history.map((entry, i) => (
              <li key={i} className="flex justify-between py-3">
                <span>{entry.class_name}</span>
                <span className="text-gray-500">Pindah pada {entry.moved_at}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

       {/* Manage Student */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-8 border border-purple-100">
        <h2 className="text-xl font-semibold text-[#C949E5] mb-4">Manage Student</h2>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/admin/student-management/edit/${id}`}
            className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg text-sm transition"
          >
            Edit
          </Link>

          <button
            onClick={() => setShowClassModal(true)}
            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded-lg text-sm"
          >
            Ganti Kelas
          </button>

          <button
            onClick={handleToggleStatus}
            disabled={actionLoading}
            className={`${
              student.status === "Active"
                ? "bg-red-100 hover:bg-red-200 text-red-700"
                : "bg-green-100 hover:bg-green-200 text-green-700"
            } px-4 py-2 rounded-lg text-sm`}
          >
            {actionLoading
              ? "Memproses..."
              : student.status === "Active"
              ? "Nonaktifkan"
              : "Aktifkan"}
          </button>
        </div>

        {errorMessage && (
          <p className="text-red-600 text-sm mt-3">{errorMessage}</p>
        )}
      </div>

      {/* Floating Modal Ganti Kelas */}
      {showClassModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-semibold text-[#C949E5] mb-4">
              Ganti Kelas Siswa
            </h3>
            <select
              className="w-full border border-gray-300 px-4 py-2 rounded-lg mb-4 text-gray-500"
              value={newClassId}
              onChange={(e) => setNewClassId(e.target.value)}
            >
              <option value="">-- Pilih Kelas --</option>
              {classOptions.map((cls) => (
              <option key={cls.id} value={cls.id}>
              {cls.class_name} - {cls.current_student_count}/{cls.capacity} siswa
            </option>
            ))}
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowClassModal(false)}
                className="px-4 py-2 text-sm bg-gray-500 hover:bg-gray-200 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={handleChangeClass}
                className="px-4 py-2 text-sm bg-[#C949E5] hover:bg-[#a837c5] text-white rounded-lg"
                disabled={actionLoading}
              >
                {actionLoading ? "Memproses..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}