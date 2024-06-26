<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;

// chatgpt これ違うんじゃね

class ReportController extends Controller
{
    public function index()
    {
        // 月別収入
        $monthlyIncome = Transaction::selectRaw('DATE_FORMAT(date, "%Y-%m") as month, SUM(amount) as total_amount')
            ->where('type', 'income')
            ->groupBy('month')
            ->get();

        // 月別支出
        $monthlyExpense = Transaction::selectRaw('DATE_FORMAT(date, "%Y-%m") as month, SUM(amount) as total_amount')
            ->where('type', 'expense')
            ->groupBy('month')
            ->get();

        // 日別収入
        $dailyIncome = Transaction::selectRaw('DATE_FORMAT(date, "%Y-%m-%d") as day, SUM(amount) as total_amount')
            ->where('type', 'income')
            ->groupBy('day')
            ->get();

        // 日別支出
        $dailyExpense = Transaction::selectRaw('DATE_FORMAT(date, "%Y-%m-%d") as day, SUM(amount) as total_amount')
            ->where('type', 'expense')
            ->groupBy('day')
            ->get();

        // カテゴリー別収入
        $incomeByCategory = Transaction::selectRaw('category, SUM(amount) as total_amount')
            ->where('type', 'income')
            ->groupBy('category')
            ->get();

        // カテゴリー別支出
        $expenseByCategory = Transaction::selectRaw('category, SUM(amount) as total_amount')
            ->where('type', 'expense')
            ->groupBy('category')
            ->get();

        return inertia('Reports/Report', [
            'monthlyIncome' => $monthlyIncome,
            'monthlyExpense' => $monthlyExpense,
            'dailyIncome' => $dailyIncome,
            'dailyExpense' => $dailyExpense,
            'incomeByCategory' => $incomeByCategory,
            'expenseByCategory' => $expenseByCategory,
        ]);
    }
}
