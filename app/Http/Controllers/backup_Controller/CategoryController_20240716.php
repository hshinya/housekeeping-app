<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CategoryController extends Controller
{
    // テスト
    // public function index() {
    //     $categories = Category::all();
    //     // return view('index', ['categories' => $categories]);
    //     return Inertia::render('Category', ['categories' => $categories]);
    // }

    public function index(Request $request)
    {
        $categories = Category::all();
        // return Inertia::render('Categories/Index', ['categories' => $categories]);

        if ($request->wantsJson()) {
            return response()->json($categories);
        }

        return Inertia::render('Categories/Index', ['categories' => $categories]);
    }

    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:income,expense',
        ]);
        Category::create($request->all());
        return redirect()->route('categories.index')->with('success', 'Category created successfully!');
    }

    public function edit($id)
    {
        $category = Category::findOrFail($id);
        Log::error($category);
        return Inertia::render('Categories/Edit', ['category' => $category]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:income,expense',
        ]);
        $category = Category::findOrFail($id);
        $category->update($request->all());
        return redirect()->route('categories.index')->with('success', 'Category update successfully!');
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return redirect()->route('categories.index')->with('success', 'Category destory successfylly!');
    }
}
