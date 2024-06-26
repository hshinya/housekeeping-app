<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::all();
        return Inertia::render('Transactions/Index', ['transactions' => $transactions]);
    }

    public function create()
    {
        return Inertia::render('Transactions/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'date' => 'required|date',
        ]);

        Transaction::create($request->all());
        return redirect()->route('transactions.index')->with('success', 'Transaction created successfully.');
    }

    public function edit($id)
    {
        $transaction = Transaction::findOrFail($id);
        return Inertia::render('Transactions/Edit', ['transaction' => $transaction]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'date' => 'required|date',
        ]);

        $transaction = Transaction::findOrFail($id);
        $transaction->update($request->all());

        return redirect()->route('transactions.index')->with('success', 'Transaction updated successfully.');
    }

    public function destroy($id)
    {
        $transaction = Transaction::findOrFail($id);
        $transaction->delete();

        return redirect()->route('transactions.index')->with('success', 'transaction deleted successfully.');
    }
}
