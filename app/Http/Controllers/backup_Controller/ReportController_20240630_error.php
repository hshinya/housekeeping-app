<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class ReportController extends Controller
{
    public function index()
    {
        // 初期データの取得
        $initialData = $this->getReportData();

        return inertia('Reports/Report', [
            'initialData' => $initialData
        ]);
    }

    public function search(Request $request)
    {
        $startDate = Carbon::parse($request->startDate)->startOfDay();
        $endDate = carbon::parse($request->endDate)->endOfDay();

        Log::error("search");
        $data = $this->getReportData($startDate, $endDate);

        return response()->json($data);
    }

    private function getReportData($startDate = null, $endDate = null)
    {
        Log::error('getReportData');
        $query = Transaction::query();
        Log::error($startDate);
        Log::error($endDate);
        Log::error($startDate && $endDate);

        if($startDate && $endDate) {
            $query->whereBetween('date', [$startDate, $endDate]);
        }
        Log::error("hoge");
        Log::error($query->toSql());

        // 月別収入
        $monthlyIncome = $query->selectRaw('DATE_FORMAT(date, "%Y-%m") as month, SUM(amount) as total_amount')
            ->where('type', 'income')
            ->groupBy('month')
            ->get()
            ->pluck('total_amount', 'month')
            ->toArray();
            Log::error($query->toSql());

        // 月別支出
        $monthlyExpense = $query->selectRaw('DATE_FORMAT(date, "%Y-%m") as month, SUM(amount) as total_amount')
            ->where('type', 'expense')
            ->groupBy('month')
            ->get()
            ->pluck('total_amount', 'month')
            ->toArray();
            Log::error($query->toSql());

        // 日別収入
        $dailyIncome = $query->selectRaw('DATE_FORMAT(date, "%Y-%m-%d") as day, SUM(amount) as total_amount')
            ->where('type', 'income')
            ->groupBy('day')
            ->get();
            Log::error($query->toSql());

        // 日別支出
        $dailyExpense = $query->selectRaw('DATE_FORMAT(date, "%Y-%m-%d") as day, SUM(amount) as total_amount')
            ->where('type', 'expense')
            ->groupBy('day')
            ->get();
            Log::error($query->toSql());

        // カテゴリー別収入
        $incomeByCategory = $query->selectRaw('category, SUM(amount) as total_amount')
            ->where('type', 'income')
            ->groupBy('category')
            ->get()
            ->pluck('total_amount')
            ->toArray();

        // カテゴリー別支出
        $expenseByCategory = $query->selectRaw('category, SUM(amount) as total_amount')
            ->where('type', 'expense')
            ->groupBy('category')
            ->get()
            ->pluck('total_amount', 'category')
            ->toArray();

        Log::error($monthlyIncome);
        Log::error($monthlyExpense);
        Log::error($dailyIncome);
        Log::error($dailyExpense);
        Log::error($incomeByCategory);
        Log::error($expenseByCategory);

        return [
            'monthlyIncome' => $monthlyIncome,
            'monthlyExpense' => $monthlyExpense,
            'dailyIncome' => $dailyIncome,
            'dailyExpense' => $dailyExpense,
            'incomeByCategory' => $incomeByCategory,
            'expenseByCategory' => $expenseByCategory,
        ];
    }
}