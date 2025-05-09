"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EditStudentPage() {
  const { id } = useParams();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [parentContact, setParentContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/admin/student/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setFullName(data.full_name);
        setPhone(data.phone);
        setAddress(data.address);
        setGender(data.gender);
        setBirthdate(data.birthdate);
        setParentContact(data.parent_contact);
      });
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        full_name: fullName,
        phone,
        address,
        gender,
        birthdate,
        parent_contact: parentContact,
      };

      const res = await fetch(`http://localhost:8000/api/admin/student/${id}/update/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal update.");
      } else {
        router.push("/admin/student-management");
      }
    } catch {
      setError("Terjadi kesalahan saat update.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-[Poppins] max-w-4xl mx-auto">
      <Link
        href="/admin/student-management"
        className="inline-flex items-center gap-2 text-sm mb-6 px-4 py-2 bg-white border border-purple-200 text-[#C949E5] rounded-lg shadow-sm hover:bg-purple-50 transition"
      >
        <span className="text-lg">←</span> <span>Back to Student Management</span>
      </Link>

      <h1 className="text-4xl font-bold text-[#C949E5] mb-8">Edit Student</h1>

      <form onSubmit={handleUpdate} className="bg-white rounded-xl shadow-lg p-10 border border-purple-100 space-y-6">
        <h2 className="text-xl font-semibold text-[#C949E5] mb-4">📝 Student Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <Input label="Full Name" value={fullName} onChange={setFullName} />
          <Input label="Phone Number" value={phone} onChange={setPhone} />
          <Input label="Birthdate" type="date" value={birthdate} onChange={setBirthdate} />
          <Input label="Parent Contact" value={parentContact} onChange={setParentContact} />
          <Input label="Address" value={address} onChange={setAddress} />
          <Select
            label="Gender"
            value={gender}
            onChange={setGender}
            options={[
              { value: "", label: "-- Select Gender --" },
              { value: "L", label: "Laki-laki" },
              { value: "P", label: "Perempuan" },
            ]}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#C949E5] hover:bg-[#a837c5] text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Student"}
        </button>

        {error && <p className="text-red-600 mt-3 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C949E5] transition"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C949E5] transition"
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
