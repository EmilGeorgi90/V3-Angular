<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notes extends Model
{
    protected $fillable = ['title', 'date', 'context', 'image', 'UserID'];
}