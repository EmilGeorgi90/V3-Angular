<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notes extends Model
{
    protected $fillable = ['id','title', 'user_id', 'context', 'image'];
}
