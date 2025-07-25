import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-900 text-center px-4">
      <h1 className="text-7xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">404</h1>
      <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">Halaman tidak ditemukan atau sudah dipindahkan.</p>
      <Link to="/" className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition">
        Kembali ke Beranda
      </Link>
    </div>
  );
}
