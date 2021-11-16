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
    canvas {
        display: none;
    }

#kokoko {
    -webkit-box-shadow: 0px 0px 18px 9px rgba(34, 60, 80, 0.11);
    -moz-box-shadow: 0px 0px 18px 9px rgba(34, 60, 80, 0.11);
    box-shadow: 0px 0px 18px 9px rgba(34, 60, 80, 0.11);
    height: 192px;
    width: 128px;
    background:transparent;
    display: block;
}
</style>

<body>
    <div id="canvases">
        <canvas id="kokoko"></canvas>
        <canvas id="palette"></canvas>
    </div>
    <div id="controls"></div>
        <button id="kek" onclick="scene.replace('dress/1', 'dress/2')">Заменить платье</button>
</body>
<script type="module" src="main.js"></script>

</html>