<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $query = Employee::with('division');

        if ($request->filled('name')) {
            $query->where('name', 'like', '%'.$request->name.'%');
        }

        if ($request->filled('division_id')) {
            $query->where('division_id', $request->division_id);
        }

        $employees = $query->paginate(10);

        return response()->json([
            'status' => 'success',
            'message' => 'Data retrieved successfully',
            'data' => [
                'employees' => $employees->items(),
            ],
            'pagination' => [
                'current_page' => $employees->currentPage(),
                'per_page' => $employees->perPage(),
                'total' => $employees->total(),
                'last_page' => $employees->lastPage(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'name' => 'required|string',
            'phone' => 'required|string',
            'division' => 'required|exists:divisions,id',
            'position' => 'required|string',
        ]);

        $imageUrl = null;

        if ($request->hasFile('image')) {
            try {
                $upload = Cloudinary::upload($request->file('image')->getRealPath(), [
                    'folder' => 'employees',
                ]);
                $imageUrl = $upload->getSecurePath();
            } catch (\Exception $e) {
                Log::error('Cloudinary upload error: '.$e->getMessage());

                return response()->json([
                    'status' => 'error',
                    'message' => 'Upload image failed.',
                ], 500);
            }
        }

        Employee::create([
            'id' => Str::uuid(),
            'image' => $imageUrl,
            'name' => $request->name,
            'phone' => $request->phone,
            'division_id' => $request->division,
            'position' => $request->position,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Employee created successfully',
        ]);
    }

    public function update(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);

        $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'name' => 'required|string',
            'phone' => 'required|string',
            'division' => 'required|exists:divisions,id',
            'position' => 'required|string',
        ]);

        $imageUrl = $employee->image;

        if ($request->hasFile('image')) {
            try {
                $upload = Cloudinary::upload($request->file('image')->getRealPath(), [
                    'folder' => 'employees',
                ]);
                $imageUrl = $upload->getSecurePath();
            } catch (\Exception $e) {
                Log::error('Cloudinary upload error: '.$e->getMessage());

                return response()->json([
                    'status' => 'error',
                    'message' => 'Upload image failed.',
                ], 500);
            }
        }

        $employee->update([
            'image' => $imageUrl,
            'name' => $request->name,
            'phone' => $request->phone,
            'division_id' => $request->division,
            'position' => $request->position,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Employee updated successfully',
        ]);
    }

    public function destroy($id)
    {
        $employee = Employee::findOrFail($id);
        $employee->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Employee deleted successfully',
        ]);
    }
}
