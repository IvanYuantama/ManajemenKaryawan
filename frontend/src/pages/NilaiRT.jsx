import { useEffect, useState } from "react";
import { getNilaiRT } from "../api/api";
import Navbar from "../components/Navbar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function NilaiRT() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getNilaiRT()
      .then((res) => {
        const result = res.data.data;
        setData(result);

        const r = average(result.map((d) => Number(d.realistic || 0)));
        const i = average(result.map((d) => Number(d.investigative || 0)));
        const a = average(result.map((d) => Number(d.artistic || 0)));
        const s = average(result.map((d) => Number(d.social || 0)));
        const e = average(result.map((d) => Number(d.enterprising || 0)));
        const c = average(result.map((d) => Number(d.conventional || 0)));

        setChartData([
          { kategori: "Realistic (R)", nilai: r },
          { kategori: "Investigative (I)", nilai: i },
          { kategori: "Artistic (A)", nilai: a },
          { kategori: "Social (S)", nilai: s },
          { kategori: "Enterprising (E)", nilai: e },
          { kategori: "Conventional (C)", nilai: c },
        ]);
      })
      .catch((err) => {
        console.error(err);
        setError("Gagal mengambil data Nilai RT.");
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Chart */}
        <section>
          <h3 className="text-xl font-semibold mb-2 text-center">Rata-rata Nilai RT</h3>
          <div className="w-full h-72">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <XAxis dataKey="kategori" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="nilai" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Table */}
        <h2 className="text-2xl font-bold">Data Nilai RT</h2>
        {error && <p className="text-red-500">{error}</p>}

        <div className="overflow-x-auto rounded-lg shadow border">
          <table className="min-w-full bg-white dark:bg-gray-800 border rounded">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-sm text-left">
                <th className="px-4 py-2 border">NISN</th>
                <th className="px-4 py-2 border">Nama</th>
                <th className="px-4 py-2 border">R</th>
                <th className="px-4 py-2 border">I</th>
                <th className="px-4 py-2 border">A</th>
                <th className="px-4 py-2 border">S</th>
                <th className="px-4 py-2 border">E</th>
                <th className="px-4 py-2 border">C</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.nisn} className="border-t text-sm">
                  <td className="px-4 py-2 border">{item.nisn}</td>
                  <td className="px-4 py-2 border">{item.nama}</td>
                  <td className="px-4 py-2 border">{item.realistic}</td>
                  <td className="px-4 py-2 border">{item.investigative}</td>
                  <td className="px-4 py-2 border">{item.artistic}</td>
                  <td className="px-4 py-2 border">{item.social}</td>
                  <td className="px-4 py-2 border">{item.enterprising}</td>
                  <td className="px-4 py-2 border">{item.conventional}</td>
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
