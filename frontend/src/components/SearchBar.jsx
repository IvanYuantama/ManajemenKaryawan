export default function SearchBar({ keyword, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex gap-2 mb-4">
      <input type="text" value={keyword} onChange={(e) => onChange(e.target.value)} className="px-4 py-2 border rounded w-full dark:bg-gray-800 dark:text-white" placeholder="Cari nama karyawan..." />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Cari
      </button>
    </form>
  );
}
