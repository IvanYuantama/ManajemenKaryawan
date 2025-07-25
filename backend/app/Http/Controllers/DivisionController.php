<?php

namespace App\Http\Controllers;

use App\Models\Division;
use Illuminate\Http\Request;

class DivisionController extends Controller
{
    public function index(Request $request)
    {
        $query = Division::query();

        // Filter by name
        if ($request->has('name')) {
            $query->where('name', 'like', '%'.$request->name.'%');
        }

        $divisions = $query->paginate(10);

        return response()->json([
            'status' => 'success',
            'message' => 'Data retrieved successfully',
            'data' => [
                'divisions' => $divisions->items(),
            ],
            'pagination' => [
                'current_page' => $divisions->currentPage(),
                'per_page' => $divisions->perPage(),
                'total' => $divisions->total(),
                'last_page' => $divisions->lastPage(),
            ],
        ]);
    }
}
