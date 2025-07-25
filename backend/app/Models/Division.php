<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Division extends Model
{
    use HasFactory;

    public $incrementing = false; // karena ID menggunakan UUID
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'name',
    ];

    /**
     * Auto-generate UUID saat membuat instance baru.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->id) {
                $model->id = Str::uuid()->toString();
            }
        });
    }

    /**
     * Relasi: satu divisi memiliki banyak karyawan.
     */
    public function employees()
    {
        return $this->hasMany(Employee::class);
    }
}
