"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; 

interface Student {
  id: number;
  student_id: string;
  full_name: string;
  class_name: string;
  status: string;
  attendance: string;
}

interface ClassOption {
  id: number;
  class_name: string;
}

const PER_PAGE = 10;

export default function StudentManagement() {
  const [students, setStudents] = useState<Student[]>([]);
  const [classOptions, setClassOptions] = useState<ClassOption[]>([]);

  const [totalStudents, setTotalStudents] = useState(0);
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [sortColumn, setSortColumn] = useState<keyof Student | "">("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetchStudents();
  }, [search, filterClass, currentPage]);

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    applySorting();
  }, [sortColumn, sortDirection]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (filterClass) params.append("filter_class", filterClass);
      params.append("page", currentPage.toString());

      const res = await fetch(`http://localhost:8000/api/admin/students/?${params}`);
      const data = await res.json();
      setStudents(data.students || []);
      setTotalStudents(data.total || 0);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/admin/list-classes/");
      const data = await res.json();
      setClassOptions(data);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    }
  };

  const applySorting = () => {
    setStudents((prevStudents) =>
      [...prevStudents].sort((a, b) => {
        if (!sortColumn) return 0;
        const valA = a[sortColumn];
        const valB = b[sortColumn];

        if (typeof valA === "string" && typeof valB === "string") {
          return sortDirection === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }

        if (typeof valA === "number" && typeof valB === "number") {
          return sortDirection === "asc" ? valA - valB : valB - valA;
        }

        return 0;
      })
    );
  };

  const handleSort = (column: keyof Student) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const totalPages = Math.ceil(totalStudents / PER_PAGE);

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-[Poppins]">
      <h1 className="text-3xl font-bold text-[#C949E5] mb-8">Student Management</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Student", value: totalStudents },
          { label: "Active Student", value: students.filter(s => s.status === "Active").length },
          { label: "Inactive Student", value: students.filter(s => s.status !== "Active").length },
          {
            label: "Average Attendance",
            value: students.length > 0
              ? (students.reduce((sum, s) => sum + parseFloat(s.attendance), 0) / students.length).toFixed(1) + "%"
              : "0%"
          },
        ].map((stat, idx) => (
          <div key={idx} className="border border-gray-200 rounded-xl px-5 py-6 text-center shadow-sm hover:shadow-md transition bg-white">
            <p className="text-sm text-gray-500 font-semibold">{stat.label}</p>
            <h2 className="text-4xl font-bold text-[#C949E5] my-2">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Search, Filter, Add */}
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search Student"
          className="border border-gray-500 p-3 rounded-lg w-full md:w-80 focus:ring-2 focus:ring-[#C949E5] outline-none text-gray-800 placeholder:text-gray-600"
          value={search}
          onChange={(e) => {
            setCurrentPage(1);
            setSearch(e.target.value);
          }}
        />
        <div className="flex gap-4">
          <select
            className="border border-gray-500 p-3 rounded-lg focus:ring-2 focus:ring-[#C949E5] outline-none text-gray-800"
            value={filterClass}
            onChange={(e) => {
              setCurrentPage(1);
              setFilterClass(e.target.value);
            }}
          >
            <option value="">Filter by Class</option>
            {classOptions.map((cls) => (
              <option key={cls.id} value={cls.class_name}>{cls.class_name}</option>
            ))}
          </select>
          <Link href="/admin/student-management/add">
            <button className="bg-[#C949E5] hover:bg-[#a837c5] text-white font-medium px-6 py-3 rounded-lg transition">
              Register Student
            </button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-purple-100 text-gray-700">
            <tr>
              {[{ key: "full_name", label: "Name" },
                { key: "student_id", label: "ID" },
                { key: "class_name", label: "Class" },
                { key: "status", label: "Status" },
                { key: "attendance", label: "Attendance" },
                { key: "", label: "Action" },
              ].map(({ key, label }) => (
                <th
                  key={label}
                  onClick={() => key && handleSort(key as keyof Student)}
                  className="px-6 py-4 text-left text-[#C949E5] font-bold text-lg cursor-pointer select-none"
                >
                  {label}
                  {sortColumn === key && (
                    <span className="ml-1 text-sm">
                      {sortDirection === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-6">Loading...</td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6">No students found.</td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id} className="border-t hover:bg-gray-50 transition text-base">
                  <td className="px-6 py-4">{student.full_name}</td>
                  <td className="px-6 py-4">{student.student_id}</td>
                  <td className="px-6 py-4">{student.class_name}</td>
                  <td className="px-6 py-4">{student.status}</td>
                  <td className="px-6 py-4">{student.attendance}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <a href={`/admin/student-management/${student.id}`}
                      className="text-[#C949E5] font-medium hover:underline">
                      View
                    </a>
                    <Link href={`/admin/student-management/edit/${student.id}`} className="text-[#C949E5] font-medium hover:underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`w-10 h-10 rounded-full font-semibold border transition-all duration-200 ${
                currentPage === idx + 1
                  ? "bg-[#C949E5] text-white border-[#C949E5]"
                  : "bg-white text-[#C949E5] border-[#C949E5] hover:bg-[#f3e8ff]"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
