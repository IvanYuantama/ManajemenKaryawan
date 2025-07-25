<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Employee extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'image',
        'name',
        'phone',
        'division_id',
        'position',
    ];

    protected static function booted()
    {
        static::creating(function ($employee) {
            if (empty($employee->id)) {
                $employee->id = Str::uuid()->toString();
            }
        });
    }

    public function division()
    {
        return $this->belongsTo(Division::class);
    }
}
