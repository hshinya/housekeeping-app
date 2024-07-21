<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
    use HasFactory;

    // 許可するフィールドを指定
    protected $fillable = [
        'category_id',
        'amount',
        'start_date',
        'end_date',
    ];

    // カテゴリとのリレーションシップを定義
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
