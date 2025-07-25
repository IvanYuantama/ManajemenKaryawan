<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class NilaiController extends Controller
{
    public function nilaiRT()
    {
        $results = DB::select('
            SELECT
                nisn,
                nama,
                SUM(CASE WHEN pelajaran_id = 36 THEN skor ELSE 0 END) AS realistic,
                SUM(CASE WHEN pelajaran_id = 38 THEN skor ELSE 0 END) AS investigative,
                SUM(CASE WHEN pelajaran_id = 39 THEN skor ELSE 0 END) AS artistic,
                SUM(CASE WHEN pelajaran_id = 40 THEN skor ELSE 0 END) AS social,
                SUM(CASE WHEN pelajaran_id = 41 THEN skor ELSE 0 END) AS enterprising,
                SUM(CASE WHEN pelajaran_id = 42 THEN skor ELSE 0 END) AS conventional
            FROM nilai
            WHERE materi_uji_id = 7
              AND pelajaran_id != 43
            GROUP BY nisn, nama
        ');

        return response()->json([
            'status' => 'success',
            'message' => 'Data Nilai RT berhasil diambil',
            'data' => $results,
        ]);
    }

    public function nilaiST()
    {
        $results = DB::select('
            SELECT
                nisn,
                nama,
                SUM(CASE WHEN pelajaran_id = 44 THEN skor * 41.67 ELSE 0 END) AS verbal,
                SUM(CASE WHEN pelajaran_id = 45 THEN skor * 29.67 ELSE 0 END) AS kuantitatif,
                SUM(CASE WHEN pelajaran_id = 46 THEN skor * 100 ELSE 0 END) AS penalaran,
                SUM(CASE WHEN pelajaran_id = 47 THEN skor * 23.81 ELSE 0 END) AS figural,
                (
                    SUM(CASE WHEN pelajaran_id = 44 THEN skor * 41.67 ELSE 0 END) +
                    SUM(CASE WHEN pelajaran_id = 45 THEN skor * 29.67 ELSE 0 END) +
                    SUM(CASE WHEN pelajaran_id = 46 THEN skor * 100 ELSE 0 END) +
                    SUM(CASE WHEN pelajaran_id = 47 THEN skor * 23.81 ELSE 0 END)
                ) AS total
            FROM nilai
            WHERE materi_uji_id = 4
              AND pelajaran_id IN (44, 45, 46, 47)
            GROUP BY nisn, nama
            ORDER BY total DESC
        ');

        return response()->json([
            'status' => 'success',
            'message' => 'Data Nilai ST berhasil diambil',
            'data' => $results,
        ]);
    }
}
