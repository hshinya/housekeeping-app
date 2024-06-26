<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class ReportController extends Controller
{
    public function index()
    {
        // 全てのトランザクションを取得
        $transactions = Transaction::all();

        // 月別収支データを計算
        $monthlyIncome = $transactions->where('type', 'income')->groupBy(function($item) {
            return Carbon::parse($item->date)->format('Y-m');
        })->map->sum('amount');

        // 月別支出をグループ化し計算
        $monthlyExpense = $transactions->where('type', 'expense')->groupBy(function($item) {
            return Carbon::parse($item->date)->format('Y-m');
        })->map->sum('amount');

        // カテゴリー別収入をグループ化し計算
        $incomeByCategory = $transactions->where('type', 'income')->groupBy('category')->map->sum('amount');

        // カテゴリー別支出をグループ化し計算
        $expenseByCategory = $transactions->where('type', 'expense')->groupBy('category')->map->sum('amount');

        // 日別支出データを計算
        // $daylyExpense = $transactions->where('type', 'expense')->groupBy(function($item) {
        //     return Carbon::parse($item->date)->format('m-d');
        // })->map->sum('amount');


        // 日別収入
        $dailyIncome = Transaction::selectRaw('DATE_FORMAT(date, "%Y-%m-%d") as day, SUM(amount) as total_amount')
            ->where('type', 'income')
            ->groupBy('day')
            ->get();

        $dailyExpense = Transaction::selectRaw('DATE_FORMAT(date, "%Y-%m-%d") as day, SUM(amount) as total_amount')
            ->where('type', 'expense')
            ->groupBy('day')
            ->get();
        // // 日別支出
        // $dailyExpense = Transaction::selectRaw('DATE_FORMAT(date, "%Y-%m-%d") as day, SUM(amount) as total_amount')
        //     ->where('type', 'expense')
        //     ->groupBy('day')
        //     ->get();

        // データをInertiaに渡してviewにレンダリング
        return Inertia::render('Reports/Report', [
            'monthlyIncome' => $monthlyIncome,
            'monthlyExpense' => $monthlyExpense,
            'incomeByCategory' => $incomeByCategory,
            'expenseByCategory' => $expenseByCategory,
            'dailyIncome' => $dailyIncome,
            'dailyExpense' => $dailyExpense,
        ]);
    }
}
