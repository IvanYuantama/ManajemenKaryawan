export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [...Array(totalPages).keys()].map((n) => n + 1);

  return (
    <div className="flex justify-center mt-4 gap-2">
      {pages.map((page) => (
        <button key={page} className={`px-3 py-1 border rounded ${page === currentPage ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`} onClick={() => onPageChange(page)}>
          {page}
        </button>
      ))}
    </div>
  );
}
