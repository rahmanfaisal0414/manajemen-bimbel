"use client";
import { useEffect, useState } from "react";

interface TokenItem {
  id: number;
  token: string;
  role: string;
  full_name: string;
  phone: string;
  address: string;
  gender: string;
  birthdate: string;
  class_name: string;
  is_used: boolean;
}

export default function TokenManagementPage() {
  const [tokens, setTokens] = useState<TokenItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof TokenItem | "">("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetch("http://localhost:8000/api/admin/tokens/")
      .then(res => res.json())
      .then(data => setTokens(data.tokens))
      .catch(err => console.error("Failed to fetch tokens:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredTokens = tokens
    .filter(token =>
      token.full_name.toLowerCase().includes(search.toLowerCase()) ||
      token.token.toLowerCase().includes(search.toLowerCase())
    )
    .filter(token => (filterRole ? token.role.toLowerCase() === filterRole.toLowerCase() : true))
    .sort((a, b) => {
      if (!sortColumn) return 0;
      const valA = a[sortColumn];
      const valB = b[sortColumn];
      if (typeof valA === "string" && typeof valB === "string") {
        return sortDirection === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      return 0;
    });

  const copyToClipboard = (token: string) => {
    navigator.clipboard.writeText(token).then(() => setCopiedToken(token));
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleSort = (column: keyof TokenItem) => {
    if (sortColumn === column) {
      setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const statCard = (label: string, value: string | number) => (
    <div className="border border-gray-200 rounded-xl px-5 py-6 text-center shadow-sm bg-white hover:shadow-md transition">
      <p className="text-sm text-gray-500 font-semibold">{label}</p>
      <h2 className="text-4xl font-bold text-[#C949E5] mt-2">{value}</h2>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-[Poppins]">
      <h1 className="text-3xl font-bold text-[#C949E5] mb-6">Token Management</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {statCard("Total Tokens", filteredTokens.length)}
        {statCard("Used Tokens", filteredTokens.filter(t => t.is_used).length)}
        {statCard("Unused Tokens", filteredTokens.filter(t => !t.is_used).length)}
        {statCard("Tutor Tokens", filteredTokens.filter(t => t.role === "Tutor").length)}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 text-gray-500">
        <input
          type="text"
          placeholder="Search token or name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full md:w-64 focus:ring-2 focus:ring-[#C949E5]"
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full md:w-64 focus:ring-2 focus:ring-[#C949E5]"
        >
          <option value="">Filter by Role</option>
          <option value="Student">Student</option>
          <option value="Tutor">Tutor</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto border border-purple-100">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-purple-100 text-gray-700">
            <tr>
              {[{ key: "token", label: "Token" },
                { key: "", label: "Copy" },
                { key: "role", label: "Role" },
                { key: "full_name", label: "Name" },
                { key: "phone", label: "Phone" },
                { key: "class_name", label: "Class" },
                { key: "is_used", label: "Used?" },
                { key: "gender", label: "Gender" },
                { key: "birthdate", label: "Birthdate" }
              ].map(({ key, label }) => (
                <th
                  key={label}
                  onClick={() => key && handleSort(key as keyof TokenItem)}
                  className="px-4 py-3 font-semibold text-left text-[#C949E5] cursor-pointer"
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
          <tbody>
            {loading ? (
              <tr><td colSpan={10} className="text-center py-6">Loading...</td></tr>
            ) : filteredTokens.length === 0 ? (
              <tr><td colSpan={10} className="text-center py-6 text-gray-500">No tokens found.</td></tr>
            ) : filteredTokens.map(token => (
              <tr key={token.id} className="border-t hover:bg-gray-50 transition text-gray-800">
                <td className="px-4 py-3 font-mono">{token.token}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => copyToClipboard(token.token)}
                    className="text-[#C949E5] hover:underline text-sm"
                  >
                    {copiedToken === token.token ? "✔ Copied" : "Copy"}
                  </button>
                </td>
                <td className="px-4 py-3">{token.role}</td>
                <td className="px-4 py-3">{token.full_name}</td>
                <td className="px-4 py-3">{token.phone}</td>
                <td className="px-4 py-3">{token.class_name}</td>
                <td className="px-4 py-3">
                  <span className={token.is_used ? "text-green-600" : "text-red-500"}>
                    {token.is_used ? "Used" : "Not used"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {token.gender === "L" ? "Laki-laki" : token.gender === "P" ? "Perempuan" : "-"}
                </td>
                <td className="px-4 py-3">{token.birthdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
