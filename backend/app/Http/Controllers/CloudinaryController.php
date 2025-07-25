<?php

namespace App\Http\Controllers;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;

class CloudinaryController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        try {
            // Upload file to Cloudinary
            $uploadedFile = Cloudinary::upload($request->file('image')->getRealPath(), [
                'folder' => 'employees',
            ]);

            // Get the secure URL from the uploaded file object
            $uploadedFileUrl = $uploadedFile->getSecurePath();

            return response()->json(['url' => $uploadedFileUrl], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
