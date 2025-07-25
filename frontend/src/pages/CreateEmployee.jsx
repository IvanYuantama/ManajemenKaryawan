import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Notification from "../components/Notification";

import { getDivisions, createEmployee } from "../api/api";

export default function CreateEmployee() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    division: "",
    position: "",
    image: null,
  });

  const [divisions, setDivisions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    getDivisions()
      .then((res) => setDivisions(res.data.data.divisions))
      .catch(() => setError("Gagal mengambil data divisi"));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("phone", form.phone);
      data.append("division", form.division);
      data.append("position", form.position);
      if (form.image) {
        data.append("image", form.image);
      }

      await createEmployee(data);
      setNotification({ type: "success", message: "Berhasil menambahkan karyawan." });

      setTimeout(() => {
        setNotification(null);
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("CreateEmployee error:", err.response || err.message);
      const messages = err.response?.data?.errors ? Object.values(err.response.data.errors).flat().join(", ") : err.response?.data?.message || "Gagal menambahkan karyawan.";
      setNotification({ type: "error", message: messages });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <main className="max-w-xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Tambah Karyawan</h2>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div>
            <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
            <input type="text" name="name" placeholder="Nama" value={form.name} onChange={handleChange} required className="w-full p-2 border rounded dark:bg-gray-700" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nomor Telepon</label>
            <input type="text" name="phone" placeholder="Nomor Telepon" value={form.phone} onChange={handleChange} required className="w-full p-2 border rounded dark:bg-gray-700" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Divisi</label>
            <select name="division" value={form.division} onChange={handleChange} required className="w-full p-2 border rounded dark:bg-gray-700">
              <option value="">Pilih Divisi</option>
              {divisions.map((div) => (
                <option key={div.id} value={div.id}>
                  {div.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Jabatan</label>
            <input type="text" name="position" placeholder="Jabatan" value={form.position} onChange={handleChange} required className="w-full p-2 border rounded dark:bg-gray-700" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Foto (opsional)</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700" />
          </div>

          <div className="text-end pt-4">
            <button type="submit" disabled={loading} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:bg-gray-400 transition">
              {loading ? "Menyimpan..." : "Tambah"}
            </button>
          </div>
        </form>
      </main>

      {notification && <Notification type={notification.type} message={notification.message} onClose={() => setNotification(null)} />}
    </div>
  );
}
