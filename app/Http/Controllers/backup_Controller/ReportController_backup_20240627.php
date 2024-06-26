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
        
    }
}
