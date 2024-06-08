<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Detail;
use Inertia\Inertia;

class DetailController extends Controller
{
    // chatgpt test
    // public function index() {
    //     $details = Detail::all();
    //     // return response()->json($details);
    //     return view('index', ['categories' => $details]);
    // }
    public function index()
    {
        $details = Detail::all();
        return Inertia::render('Detail', ['details' => $details]);
    }
}
