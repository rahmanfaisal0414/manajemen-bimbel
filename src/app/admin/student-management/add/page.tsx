"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaRegCopy, FaCheckCircle } from "react-icons/fa";

interface ClassOption {
    id: number;
    class_name: string;
    capacity: number;
    current_student_count: number;
  }  

export default function AddStudentPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [parentContact, setParentContact] = useState("");
  const [classId, setClassId] = useState("");
  const [classOptions, setClassOptions] = useState<ClassOption[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/admin/list-classes/")
      .then(res => res.json())
      .then(data => setClassOptions(data))
      .catch(err => console.error("Failed to load classes:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCopied(false);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:8000/api/auth/generate-token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "student",
          full_name: fullName.trim(),
          phone: phone.trim(),
          address: address.trim(),
          gender,
          birthdate,
          parent_contact: parentContact.trim(),
          class_id: classId,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal membuat token.");
      } else {
        setToken(data.token);
        setFullName("");
        setPhone("");
        setAddress("");
        setGender("");
        setBirthdate("");
        setParentContact("");
        setClassId("");
      }
    } catch {
      setError("Terjadi kesalahan saat mengirim data.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (token) {
      navigator.clipboard.writeText(token).then(() => setCopied(true));
    }
  };

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen font-[Poppins] max-w-4xl mx-auto">
      <Link
        href="/admin/student-management"
        className="inline-flex items-center gap-2 text-sm mb-6 px-4 py-2 bg-white border border-purple-200 text-[#C949E5] rounded-lg shadow-sm hover:bg-purple-50 transition"
      >
        <span className="text-lg">←</span> <span>Back to Student Management</span>
      </Link>
  
      <h1 className="text-4xl font-bold text-[#C949E5] mb-8">Register New Student</h1>
  
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-10 border border-purple-100 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-500">
          <InputField label="Full Name" placeholder="e.g. Rahman Faisal" value={fullName} setValue={setFullName} />
          <InputField label="Phone Number" placeholder="e.g. 081234567890" value={phone} setValue={setPhone} />
          <TextAreaField
            label="Address"
            placeholder="e.g. Jl. Pendidikan No. 10"
            value={address}
            setValue={setAddress}
          />
          <SelectField label="Gender" value={gender} setValue={setGender} options={[
            { value: "", label: "-- Select Gender --" },
            { value: "L", label: "Laki-laki" },
            { value: "P", label: "Perempuan" }
          ]} />
          <InputField label="Birthdate" type="date" value={birthdate} setValue={setBirthdate} />
          <InputField label="Parent Contact" placeholder="e.g. 08561234567" value={parentContact} setValue={setParentContact} />
          <SelectField
            label="Class"
            value={classId}
            setValue={setClassId}
            options={[
                { value: "", label: "-- Select Class --" },
                ...classOptions.map(cls => ({
                value: cls.id.toString(),
                label: `${cls.class_name} (${cls.current_student_count}/${cls.capacity})`,
                disabled: cls.current_student_count >= cls.capacity
                }))
            ]}
            />
        </div>
  
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#C949E5] hover:bg-[#a837c5] text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Generate Signup Token"}
        </button>
  
        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
  
        {token && (
          <div className="mt-6 bg-green-50 border border-green-300 rounded-lg p-4 flex justify-between items-center text-green-800 text-sm">
            <span>
              <FaCheckCircle className="inline mr-1 text-green-600" />
              Token berhasil dibuat: <strong>{token}</strong>
              {copied && <span className="ml-2 text-green-700 font-semibold">✔ Copied</span>}
            </span>
            <button
              type="button"
              onClick={copyToClipboard}
              className="ml-4 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-xs transition"
            >
              <FaRegCopy /> Copy
            </button>
          </div>
        )}
      </form>
    </div>
  );  
}

function InputField({ label, value, setValue, type = "text", placeholder = "" }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C949E5]"
      />
    </div>
  );
}

function TextAreaField({ label, value, setValue, placeholder = "" }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C949E5]"
      />
    </div>
  );
}

function SelectField({ label, value, setValue, options }: any) {
    return (
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          {label} <span className="text-red-500">*</span>
        </label>
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C949E5]"
        >
          {options.map((opt: any, idx: number) => (
            <option key={idx} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
