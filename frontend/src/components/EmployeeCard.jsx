import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteEmployee } from "../api/api";
import Notification from "./Notification";

export default function EmployeeCard({ employee }) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleEdit = () => {
    navigate(`/employees/${employee.id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await deleteEmployee(employee.id);
      setNotification({ type: "success", message: "Data berhasil dihapus." });
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      setNotification({ type: "error", message: "Terjadi kesalahan saat menghapus data." });
    }
  };

  return (
    <>
      <div className="p-5 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all flex items-center gap-4">
        <div className="flex-shrink-0">
          <img src={employee.image || "https://via.placeholder.com/80x80?text=No+Image"} alt={employee.name} className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{employee.name}</h3>
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              <span className="font-medium">No HP</span> : {employee.phone}
            </p>
            <p>
              <span className="font-medium">Divisi</span> : {employee.division?.name || "-"}
            </p>
            <p>
              <span className="font-medium">Jabatan</span> : {employee.position}
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="flex flex-col gap-2">
          <button onClick={handleEdit} className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded transition">
            Edit
          </button>
          <button onClick={() => setShowConfirm(true)} className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition">
            Hapus
          </button>
        </div>
      </div>

      {/* Confirm */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Konfirmasi Penghapusan</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-1 rounded bg-blue-500 hover:bg-blue-700 text-sm">
                Batal
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  handleDelete();
                }}
                className="px-4 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {notification && <Notification type={notification.type} message={notification.message} onClose={() => setNotification(null)} />}
    </>
  );
}
