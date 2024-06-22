<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        // 全てのトランザクションを取得
        $transactions = Transaction::all();

        // 月別収支データを計算
        $monthlyIncome = $transactions->groupBy(function($item) {
            return \Carbon\Carbon::parse($item->date)->format('Y-m');
        })->map(function($group) {
            return $group->sum('amount');
        });

        // カテゴリー別終始データを計算
        $categoryExpense = $transactions->groupBy('category_id')->map(function($group) {
            return $group->sum('amount');
        });

        // カテゴリー名を取得
        $categories = Category::whereIn('id', $categoryExpense->keys())->pluck('name', 'id');

        return Inertia::render('Reports/Index', [
            'monthlyIncome' => $monthlyIncome,
            'categoryExpense' => $categoryExpense,
            'categories' => $categories,
        ]);
    }
}
