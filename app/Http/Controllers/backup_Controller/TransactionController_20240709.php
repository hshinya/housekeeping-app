<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Category;
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
        $categories = Category::all();
        return Inertia::render('Transactions/Create', ['categories' => $categories]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'date' => 'required|date',
            'type' => 'required|string|in:income,expense',
            'category_id' => 'required|exists:categories,id', // category_idのバリデーションを追加
        ]);

        Transaction::create([
            'description' => $request->input('description'),
            'amount' => $request->input('amount'),
            'date' => $request->input('date'),
            'type' => $request->input('type'),
            'category_id' => $request->input('category_id'),
        ]);

        return redirect()->route('transactions.index')->with('success', 'Transaction created successfully.');
    }

    public function edit($id)
    {
        $transaction = Transaction::findOrFail($id);
        $categories = Category::all();
        return Inertia::render('Transactions/Edit', ['transaction' => $transaction, 'categories' => $categories]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'date' => 'required|date',
            'type' => 'required|string|in:income,expense',
            'category_id' => 'required|exists:categories,id', // category_idのバリデーションを追加
        ]);

        $transaction = Transaction::findOrFail($id);
        $transaction->update([
            'description' => $request->input('description'),
            'amount' => $request->input('amount'),
            'date' => $request->input('date'),
            'type' => $request->input('type'),
            'category_id' => $request->input('category_id'),
        ]);

        return redirect()->route('transactions.index')->with('success', 'Transaction updated successfully.');
    }

    public function destroy($id)
    {
        $transaction = Transaction::findOrFail($id);
        $transaction->delete();

        return redirect()->route('transactions.index')->with('success', 'Transaction deleted successfully.');
    }
}
