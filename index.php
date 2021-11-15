<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://code.jquery.com/jquery-3.6.0.slim.min.js" integrity="sha256-u7e5khyithlIdTpu22PHhENmPcRdFiHRjhAuHcs05RI=" crossorigin="anonymous"></script>
</head>
<style>
    body{
        background-color: navy;
    }
#kokoko {
    -webkit-box-shadow: 0px 0px 18px 9px rgba(34, 60, 80, 0.11);
    -moz-box-shadow: 0px 0px 18px 9px rgba(34, 60, 80, 0.11);
    box-shadow: 0px 0px 18px 9px rgba(34, 60, 80, 0.11);
    height: 400px;
    width: 400px;
    background:transparent;
}
</style>

<body>
    <canvas id="kokoko"></canvas>
    <button id="recolor" onclick="scene.recolor('cat.png', {palette_id: 0})">Перекрасить кота 1</button>

    <button id="recolor" onclick="scene.recolor('trngl.png', {palette_id: 1})">Перекрасить треугольник 2</button>

    <button id="recolor" onclick="scene.recolor('cat.png', {palette_id: 2})">Перекрасить кота 3</button>
</body>
<script type="module" src="main.js"></script>

</html>