import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import EmployeeCard from "../components/EmployeeCard";

import { getEmployees } from "../api/api";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees({ name: search, page: currentPage });
      setEmployees(res.data.data.employees);
      setPagination(res.data.pagination);
    } catch (error) {
      console.error("Gagal mengambil data karyawan:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [search, currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <Navbar />

      <main className="max-w-5xl mx-auto p-4 md:p-6">
        {/* Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start mb-6">
          <SearchBar
            keyword={search}
            onChange={setSearch}
            onSubmit={(e) => {
              e.preventDefault();
              setCurrentPage(1);
            }}
          />

          {/* Button */}
          <div className="flex flex-wrap md:justify-end gap-2">
            <button onClick={() => navigate("/create")} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow transition-all">
              + Tambah Karyawan
            </button>
            <button onClick={() => navigate("/nilai-rt")} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow transition-all">
              Nilai RT
            </button>
            <button onClick={() => navigate("/nilai-st")} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow transition-all">
              Nilai ST
            </button>
          </div>
        </div>

        {/* Employee List */}
        <div className="space-y-4">
          {employees.length > 0 ? (
            employees.map((emp) => <EmployeeCard key={emp.id} employee={emp} />)
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-12">
              <svg className="mx-auto w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6m16 0v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2v6m-4 0h8" />
              </svg>
              <p className="text-sm">Tidak ada data karyawan.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-8">
          <Pagination currentPage={pagination.current_page || 1} totalPages={pagination.last_page || 1} onPageChange={setCurrentPage} />
        </div>
      </main>
    </div>
  );
}
