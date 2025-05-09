"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Tutor {
  id: number;
  tutor_id: string;
  full_name: string;
  subject: string;
  status: string;
  schedule: string;
  rating: number | null;
}

interface SubjectOption {
  id: number;
  name: string;
}

const PER_PAGE = 10;

export default function TutorManagement() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [subjectOptions, setSubjectOptions] = useState<SubjectOption[]>([]);

  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [sortColumn, setSortColumn] = useState<keyof Tutor | "">("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (filterSubject) params.append("filter_subject", filterSubject);

        const res = await fetch(`http://localhost:8000/api/admin/tutors/?${params}`);
        const data = await res.json();
        setTutors(data.tutors || []); // ✅ ambil hanya array-nya
      } catch (error) {
        console.error("Failed to fetch tutors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [search, filterSubject, currentPage]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/admin/list-subject/");
        const data = await res.json();
        setSubjectOptions(data);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    applySorting();
  }, [sortColumn, sortDirection]);

  const applySorting = () => {
    setTutors((prev) =>
      [...prev].sort((a, b) => {
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

  const handleSort = (column: keyof Tutor) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const totalPages = Math.ceil(tutors.length / PER_PAGE);

  const stats = {
    total: tutors.length,
    active: tutors.filter((t) => t.status === "Active").length,
    inactive: tutors.filter((t) => t.status === "Inactive").length,
    avgRating:
      tutors.length > 0
        ? (
            tutors.reduce((sum, t) => sum + (t.rating ?? 0), 0) / tutors.length
          ).toFixed(1)
        : "0.0",
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-[Poppins]">
      <h1 className="text-3xl font-bold text-[#C949E5] mb-8">Tutor Management</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {[{ label: "Total Tutors", value: stats.total },
          { label: "Active Tutors", value: stats.active },
          { label: "Inactive Tutors", value: stats.inactive },
          { label: "Average Rating", value: `${stats.avgRating} ⭐` },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-xl px-5 py-6 text-center shadow-sm bg-white"
          >
            <p className="text-sm text-gray-500 font-semibold">{stat.label}</p>
            <h2 className="text-4xl font-bold text-[#C949E5] my-2">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 text-gray-500">
        <input
          type="text"
          placeholder="Search Tutor"
          className="border border-gray-500 p-3 rounded-lg w-full md:w-80"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <div className="flex gap-4">
          <select
            className="border border-gray-500 p-3 rounded-lg text-gray-500"
            value={filterSubject}
            onChange={(e) => {
              setFilterSubject(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Filter by Subject</option>
            {subjectOptions.map((opt) => (
              <option key={opt.id} value={opt.name}>
                {opt.name}
              </option>
            ))}
          </select>
          <Link href="/admin/tutor-management/add">
            <button className="bg-[#C949E5] hover:bg-[#a837c5] text-white px-6 py-3 rounded-lg">
              + Add Tutor
            </button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-purple-100 text-[#C949E5] font-bold text-lg">
            <tr>
              {[{ key: "full_name", label: "Name" },
                { key: "tutor_id", label: "ID" },
                { key: "subject", label: "Subject" },
                { key: "status", label: "Status" },
                { key: "schedule", label: "Schedule" },
                { key: "rating", label: "Rating" },
                { key: "", label: "Action" },
              ].map(({ key, label }) => (
                <th
                  key={label}
                  onClick={() => key && handleSort(key as keyof Tutor)}
                  className="px-6 py-4 text-left cursor-pointer select-none"
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
                <td colSpan={7} className="text-center py-6">Loading...</td>
              </tr>
            ) : tutors.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6">No tutors found.</td>
              </tr>
            ) : (
              tutors.map((tutor) => (
                <tr key={tutor.id} className="border-t hover:bg-gray-50 transition text-base">
                  <td className="px-6 py-4">{tutor.full_name}</td>
                  <td className="px-6 py-4">{tutor.tutor_id}</td>
                  <td className="px-6 py-4">{tutor.subject}</td>
                  <td className="px-6 py-4">{tutor.status}</td>
                  <td className="px-6 py-4">{tutor.schedule}</td>
                  <td className="px-6 py-4">{tutor.rating ? `${tutor.rating}/5` : "-"}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <Link href={`/admin/tutor-management/${tutor.id}`} className="text-[#C949E5] font-medium hover:underline">
                      View
                    </Link>
                    <Link href={`/admin/tutor-management/edit/${tutor.id}`} className="text-[#C949E5] font-medium hover:underline">
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
