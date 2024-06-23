<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            // 追加するカラム情報
            $table->string('category')->after('amount'); // カテゴリカラムを追加
            $table->enum('type', ['income', 'expense'])->after('category'); //タイプカラムを追加
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn('category');
            $table->dropColumn('type');
        });
    }
};
