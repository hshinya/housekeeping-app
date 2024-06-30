<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        // 初期データの取得
        $initialData = $this->getReportData();

        return Inertia::render('Reports/Report', $initialData);
    }

    public function search(Request $request)
    {
        $startDate = Carbon::parse($request->input('start_date'))->startOfDay();
        $endDate = Carbon::parse($request->input('end_date'))->endOfDay();

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
        // if($startDate && $endDate) {
        //     $monthlyIncomeQuery = DB::table('transactions')
        //         ->select(DB::raw('DATE_FORMAT(date, "%Y-%m") as month'), DB::raw('SUM(amount) as total_amount'))
        //         ->where('type', 'income')
        //         ->whereBetween('date', [$startDate, $endDate])
        //         ->groupBy(DB::raw('DDATE_FORMAT(date, "%Y-%m")'))
        //         ->orderBy(DB::raw('DDATE_FORMAT(date, "%Y-%m")'));

        //     $monthlyExpenseQuery = DB::table('transactions')
        //         ->select(DB::raw('DATE_FORMAT(date, "%Y-%m") as month'), DB::raw('SUM(amount) as total_amount'))
        //         ->where('type', 'expense')
        //         ->whereBetween('date', [$startDate, $endDate])
        //         ->groupBy(DB::raw('DDATE_FORMAT(date, "%Y-%m")'))
        //         ->orderBy(DB::raw('DDATE_FORMAT(date, "%Y-%m")'));

        //     $incomeByCategoryQuery = DB::table('transactions')
        //         ->select('category', DB::raw('SUM(amount) as total_amount'))
        //         ->where('type', 'income')
        //         ->whereBetween('date', [$startDate, $endDate])
        //         ->groupBy('category');

        //     $expenseByCategoryQuery = DB::table('transactions')
        //         ->select('category', DB::raw('SUM(amount) as total_amount'))
        //         ->where('type', 'expense')
        //         ->whereBetween('date', [$startDate, $endDate])
        //         ->groupBy('category');

        // }
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

        if($type !== 'category') {
            $query->groupBy('period')->orderBy('period');
        } else {
            $query->groupBy('category');
        }

        return $type === 'category' ? $query->pluck('total_amount', 'period') : $query->get();
    }
}