import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Notification from "../components/Notification";

import { getDivisions, getEmployees, updateEmployee } from "../api/api";

export default function EditEmployee() {
  const { id } = useParams();
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
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    getDivisions()
      .then((res) => setDivisions(res.data.data.divisions))
      .catch(() => setError("Gagal mengambil data divisi."));

    getEmployees()
      .then((res) => {
        const emp = res.data.data.employees.find((e) => e.id === id);
        if (emp) {
          setForm({
            name: emp.name,
            phone: emp.phone,
            division: emp.division.id,
            position: emp.position,
            image: null,
          });
        } else {
          setError("Pegawai tidak ditemukan.");
        }
      })
      .catch(() => setError("Gagal mengambil data pegawai."));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: name === "image" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = new FormData();
      data.append("_method", "PUT");
      data.append("name", form.name);
      data.append("phone", form.phone);
      data.append("division", form.division);
      data.append("position", form.position);
      if (form.image) data.append("image", form.image);

      await updateEmployee(id, data);
      setNotification({ type: "success", message: "Data pegawai berhasil diperbarui." });

      setTimeout(() => {
        setNotification(null);
        navigate("/");
      }, 2000);
    } catch (err) {
      const errMsg = err.response?.data?.errors ? Object.values(err.response.data.errors).flat().join(", ") : "Gagal update pegawai. Coba cek inputnya.";
      setNotification({ type: "error", message: errMsg });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <Navbar />
      <main className="max-w-xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Data Pegawai</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div>
            <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full p-2 rounded border dark:bg-gray-700 focus:outline-none focus:ring focus:ring-blue-300" placeholder="Nama pegawai" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nomor Telepon</label>
            <input type="text" name="phone" value={form.phone} onChange={handleChange} required className="w-full p-2 rounded border dark:bg-gray-700 focus:outline-none focus:ring focus:ring-blue-300" placeholder="08xxxxxxxxxx" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Divisi</label>
            <select name="division" value={form.division} onChange={handleChange} required className="w-full p-2 rounded border dark:bg-gray-700 focus:outline-none focus:ring focus:ring-blue-300">
              <option value="">Pilih Divisi</option>
              {divisions.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Jabatan</label>
            <input type="text" name="position" value={form.position} onChange={handleChange} required className="w-full p-2 rounded border dark:bg-gray-700 focus:outline-none focus:ring focus:ring-blue-300" placeholder="Jabatan pegawai" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gambar (opsional)</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full p-2 rounded border dark:bg-gray-700" />
          </div>

          <div className="pt-4 text-end">
            <button type="submit" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow transition">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </main>

      {notification && <Notification type={notification.type} message={notification.message} onClose={() => setNotification(null)} />}
    </div>
  );
}
