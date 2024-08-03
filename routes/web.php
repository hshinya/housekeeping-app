<?php

use App\Http\Controllers\BudgetController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashbordController;
use App\Http\Controllers\DetailController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// カテゴリ/詳細
Route::get('/category', [CategoryController::class, 'index']);
Route::get('/detail', [DetailController::class, 'index']);

// カテゴリ
// Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
// Route::get('/categories/create', [CategoryController::class, 'create'])->name('categories.create');
// Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
// Route::get('/categories/{id}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
// Route::put('/categories/{id}', [CategoryController::class, 'update'])->name('categories.update');
// Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');
Route::resource('categories', CategoryController::class);

// ダッシュボード
Route::get('/dashboard', [DashbordController::class, 'index'])->name('dashboard');

// トランザクションページ
Route::get('/transactions',[TransactionController::class, 'index'])->name('transactions.index');
Route::get('/transactions/create', [TransactionController::class, 'create'])->name('transactions.create');
Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');
Route::get('/transactions/{id}/edit', [TransactionController::class, 'edit'])->name('transactions.edit');
// Route::put('/transactions/{id}', [TransactionController::class, 'update'])->name('transactions.update');
Route::post('/transactions/{id}', [TransactionController::class, 'update'])->name('transactions.update');
Route::delete('/transactions/{id}', [TransactionController::class, 'destroy'])->name('transactions.destroy');

// レポートページ
Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
Route::post('/reports/search', [ReportController::class, 'search'])->name('reports.search');

// 予算ページ
Route::resource('budgets', BudgetController::class);

// ユーザー設定ページ
Route::resource('users', UserController::class);

require __DIR__.'/auth.php';
