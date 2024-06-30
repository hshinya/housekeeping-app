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

        return inertia('Reports/Report', [
            'initialData' => $initialData
        ]);
    }

    public function search(Request $request)
    {
        $startDate = Carbon::parse($request->startDate)->startOfDay();
        $endDate = Carbon::parse($request->endDate)->endOfDay();

        return Inertia::render('Reports/Report', $this->getReportData($startDate, $endDate));
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
                $query->select(DB::raw('DATE_FORMAT(date, "%Y-%m") as month'), DB::raw('SUM(amount) as total_amount'));
                // $query->select(DB::raw('DATE_FORMAT(date, "%Y-%m") as period'), DB::raw('SUM(amount) as total_amount'));
                break;
            case 'category':
                $query->select('category', DB::raw('SUM(amount) as total_amount'));
                // $query->select('category as period', DB::raw('SUM(amount) as total_amount'));
                break;
            case 'daily':
                $query->select(DB::raw('DATE_FORMAT(date, "%Y-%m-%d") as day'), DB::raw('SUM(amount) as total_amount'));
                // $query->select(DB::raw('DATE_FORMAT(date, "%Y-%m-%d") as period'), DB::raw('SUM(amount) as total_amount'));
                break;
        }

        $query->where('type', $transactionType);

        if($startDate && $endDate) {
            $query->whereBetween('date', [$startDate, $endDate]);
        }

        if($type === 'monthly') {
            $query->groupBy(DB::raw('DATE_FORMAT(date, "%Y-%m")'))->orderBy(DB::raw('DATE_FORMAT(date, "%Y-%m")'));
        } else if($type === 'daily') {
            $query->groupBy(DB::raw('DATE_FORMAT(date, "%Y-%m-%d")'))->orderBy(DB::raw('DATE_FORMAT(date, "%Y-%m-%d")'));
        } else if($type === 'category') {
            $query->groupBy('category');
        }

        Log::error("getData");
        Log::error($query->toSql());
        Log::error($query->pluck('total_amount'));
        // return $type === 'category' ? $query->pluck('total_amount', 'period') : $query->get();
        return $type === 'category' ? $query->pluck('total_amount') : $query->get();
    }
}