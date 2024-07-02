<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        // 初期データの取得
        $initialData = $this->getReportData();
        Log::error($initialData);

        return Inertia::render('Reports/Report', [
            'initialData' => $initialData
        ]);
    }

    public function search(Request $request)
    {
        $startDate = Carbon::parse($request->startDate)->startOfDay();
        $endDate = Carbon::parse($request->endDate)->endOfDay();

        $reportData = $this->getReportData($startDate, $endDate);

        return Inertia::render('Reports/Report', [
            'initialData' => $reportData
        ]);
    }

    private function getReportData($startDate = null, $endDate = null)
    {
        return [
            'monthlyIncome' => $this->getData('monthly', 'income', $startDate, $endDate),
            'monthlyExpense' => $this->getData('monthly', 'expense', $startDate, $endDate),
            'incomeByCategory' => $this->getData('category', 'income', $startDate, $endDate),
            'expenseByCategory' => $this->getData('category', 'expense', $startDate, $endDate),
            'dailyIncome' => $this->getData('daily', 'income', $startDate, $endDate),
            'dailyExpense' => $this->getData('daily', 'expense', $startDate, $endDate),
        ];
    }

    private function getData($type, $transactionType, $startDate = null, $endDate = null)
    {
        $query = DB::table('transactions');

        switch($type) {
            case 'monthly':
                $query->select(DB::raw('DATE_FORMAT(date, "%Y-%m") as period'), DB::raw('SUM(amount) as total_amount'));
                break;
            case 'category':
                $query->select('category as period', DB::raw('SUM(amount) as total_amount'));
                break;
            case 'daily':
                $query->select(DB::raw('DATE_FORMAT(date, "%Y-%m-%d") as period'), DB::raw('SUM(amount) as total_amount'));
                break;
        }

        $query->where('type', $transactionType);

        if($startDate && $endDate) {
            $query->whereBetween('date', [$startDate, $endDate]);
        }

        $query->groupBy('period')->orderBy('period');

        Log::error("getData");
        Log::error($query->toSql());
        Log::error($query->pluck('total_amount', 'period'));

        return $query->pluck('total_amount', 'period');
    }
}
