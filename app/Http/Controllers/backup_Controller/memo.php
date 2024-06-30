

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

    switch ($type) {
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

    if ($startDate && $endDate) {
        $query->whereBetween('date', [$startDate, $endDate]);
    }

    if ($type !== 'category') {
        $query->groupBy('period')->orderBy('period');
    } else {
        $query->groupBy('category');
    }

    return $type === 'category' ? $query->pluck('total_amount', 'period') : $query->get();
}
