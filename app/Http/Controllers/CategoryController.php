<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CategoryController extends Controller
{
    // テスト
    public function index() {
        $categories = Category::all();
        // return view('index', ['categories' => $categories]);
        return Inertia::render('Category', ['categories' => $categories]);
    }
}
