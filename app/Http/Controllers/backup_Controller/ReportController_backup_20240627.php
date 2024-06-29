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
        // 初期データの取得
        $initialData = $this->getReportData();

        return inertia('Reports/Report', [
            'initialData' => $initialData
        ]);
    }

    public function search(Request $request)
    {
        $startDate = Carbon::parse($request->setData)->startOfDay();
        $endDate = carbon::parse($request->endDate)->endOfDay();

        $data = $this->getReportData($$startDate, $endDate);

        return response()->json($data);
    }

    private function getReportData($startDate = null, $endDate = null)
    {
        $query = Transaction::query();

        if($startDate && $endDate) {
            $query->whereBetween('date', [$startDate, $endDate]);
        }

        // 月別収入
        $monthlyIncome = $query->selectRaw('DATE_FORMAT(date, "%Y-%m") as mnth, SUM(amount) as total_amount')
            ->where('type', 'income')
            ->groupBy('month')
            ->get()
            ->pluck('total_amount', 'month')
            ->toArray();

        // 月別支出
        $monthlyExpense = $query->selectRaw('DATE_FORMAT(date, "$Y-%m") as month, SUM(amount) as total_amount')
            ->where('type', 'expense')
            ->groupBy('month')
            ->get()
            ->pluck('total_amount', 'month')
            ->toArray();
    }
}
