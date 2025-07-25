import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EditEmployee from "./pages/EditEmployee";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import CreateEmployee from "./pages/CreateEmployee";
import NilaiRT from "./pages/NilaiRT";
import NilaiST from "./pages/NilaiST";
import "./index.css"; // Penting agar Tailwind aktif

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees/:id/edit"
          element={
            <PrivateRoute>
              <EditEmployee />
            </PrivateRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateEmployee />
            </PrivateRoute>
          }
        />
        <Route
          path="/nilai-rt"
          element={
            <PrivateRoute>
              <NilaiRT />
            </PrivateRoute>
          }
        />
        <Route
          path="/nilai-st"
          element={
            <PrivateRoute>
              <NilaiST />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
