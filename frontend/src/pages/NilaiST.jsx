import { useEffect, useState } from "react";
import { getNilaiST } from "../api/api";
import Navbar from "../components/Navbar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function NilaiST() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getNilaiST()
      .then((res) => {
        const result = res.data.data;
        setData(result);

        const verbal = average(result.map((d) => Number(d.verbal || 0)));
        const kuantitatif = average(result.map((d) => Number(d.kuantitatif || 0)));
        const penalaran = average(result.map((d) => Number(d.penalaran || 0)));
        const figural = average(result.map((d) => Number(d.figural || 0)));

        setChartData([
          { kategori: "Verbal", nilai: verbal },
          { kategori: "Kuantitatif", nilai: kuantitatif },
          { kategori: "Penalaran", nilai: penalaran },
          { kategori: "Figural", nilai: figural },
        ]);
      })
      .catch((err) => {
        console.error(err);
        setError("Gagal mengambil data Nilai ST.");
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Chart */}
        <section>
          <h3 className="text-xl font-semibold mb-2 text-center">Rata-rata Nilai ST</h3>
          <div className="w-full h-72">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <XAxis dataKey="kategori" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="nilai" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Table */}
        <h2 className="text-2xl font-bold">Data Nilai ST</h2>
        {error && <p className="text-red-500">{error}</p>}

        <div className="overflow-x-auto rounded-lg shadow border">
          <table className="min-w-full bg-white dark:bg-gray-800 border rounded">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-sm text-left">
                <th className="px-4 py-2 border">NISN</th>
                <th className="px-4 py-2 border">Nama</th>
                <th className="px-4 py-2 border">Verbal</th>
                <th className="px-4 py-2 border">Kuantitatif</th>
                <th className="px-4 py-2 border">Penalaran</th>
                <th className="px-4 py-2 border">Figural</th>
                <th className="px-4 py-2 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.nisn} className="border-t text-sm">
                  <td className="px-4 py-2 border">{item.nisn}</td>
                  <td className="px-4 py-2 border">{item.nama}</td>
                  <td className="px-4 py-2 border">{item.verbal}</td>
                  <td className="px-4 py-2 border">{item.kuantitatif}</td>
                  <td className="px-4 py-2 border">{item.penalaran}</td>
                  <td className="px-4 py-2 border">{item.figural}</td>
                  <td className="px-4 py-2 border">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function average(arr) {
  const valid = arr.filter((n) => !isNaN(n));
  if (!valid.length) return 0;
  return parseFloat((valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(2));
}
