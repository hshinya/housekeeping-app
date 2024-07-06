<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashbordController extends Controller
{
    public function index()
    {
        // データの取得
        $data = [
            'income' => 1000, // 収入の総額
            'expense' => 800, // 支出の総額
            'transactions' => [
                // 最近のトランザクション
                ['id' => 1, 'description' => '食品', 'amount' => 31000, 'date' => '2024/06/01'],
                ['id' => 2, 'description' => '給料', 'amount' => 210000, 'date' => '2024/06/02'],
                ['id' => 3, 'description' => '家賃', 'amount' => 90000, 'date' => '2024/06/02'],
                ['id' => 4, 'description' => '食費', 'amount' => 5000, 'date' => '2024/06/12'],
                ['id' => 5, 'description' => '食費', 'amount' => 5000, 'date' => '2024/07/02'],
            ],
        ];

        return Inertia::render('Dashboard', $data);
    }
}
