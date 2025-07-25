import { useEffect } from "react";

export default function Notification({ type = "success", message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: "bg-green-100 text-green-800 border-green-400",
    error: "bg-red-100 text-red-800 border-red-400",
    info: "bg-blue-100 text-blue-800 border-blue-400",
  };

  return (
    <div className={`fixed top-5 right-5 z-50 transition-all duration-300 transform animate-fade-in-down`}>
      <div className={`px-4 py-3 rounded-md shadow-md border ${colors[type]} flex items-center gap-3`}>
        <span>{message}</span>
        <button onClick={onClose} className="text-sm font-bold ml-4 hover:underline">
          ✕
        </button>
      </div>
    </div>
  );
}
