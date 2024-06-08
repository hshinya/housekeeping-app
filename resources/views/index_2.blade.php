<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>モデルのテスト</title>
</head>

<body>
    <table>
        <tr>
            <th>商品名</th>
            <th>価格</th>
        </tr>
        <!-- コントローラで定義したモデルをインスタンス化したプロパティをforeachで回していきます -->
        @foreach ($categories as $product)

            <!-- 在庫ありの商品の商品名と価格を表示 -->
            <tr>
                <td>{{ $product->name }}</td>
                <td>{{ $product->type }}</td>
            </tr>
            @if ($product->stock === 1)
            @endif

        @endforeach
    </table>
</body>

</html>
<style>
    table {
        border: 1px solid #000;
    }
</style>
