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
                ['id' => 1, 'description' => '食品', 'amount' => -50, 'date' => (2024-06-01)],
                ['id' => 1, 'description' => '給料', 'amount' => 1000, 'date' => (2024-06-02)],
            ],
        ];

        return Inertia::render('Dashboard', $data);
    }
}
