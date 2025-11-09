<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Led extends Model
{
    protected $fillable = ['is_on'];
    protected $casts = [
        'is_on' => 'boolean',
    ];
}
