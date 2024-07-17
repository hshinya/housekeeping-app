<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name','type'];

    // 予算とのリレーションシップを定義
    public function budgets()
    {
        return $this->hasMany(Budget::class);
    }
}
