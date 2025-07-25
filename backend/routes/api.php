<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CloudinaryController;
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\NilaiController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/cloudinary/upload', [CloudinaryController::class, 'upload']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Divisions
    Route::get('/divisions', [DivisionController::class, 'index']);

    // Employees
    Route::get('/employees', [EmployeeController::class, 'index']);
    Route::post('/employees', [EmployeeController::class, 'store']);
    Route::put('/employees/{id}', [EmployeeController::class, 'update']);
    Route::post('/employees/{id}', [EmployeeController::class, 'update']);
    Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']);
    Route::get('/nilaiRT', [NilaiController::class, 'nilaiRT']);
    Route::get('/nilaiST', [NilaiController::class, 'nilaiST']);
});
