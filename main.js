import Sprite from '/js/Sprite.js';
import SceneManager from '/js/SceneManager.js';

var c = document.getElementById("kokoko");

setBg(c)

var trngl = new Sprite("trngl.png");
var sprite = new Sprite("hrt.png");
var params = {};
window.params = params;

sprite.normalize(c);

trngl.render_to_save(c);
sprite.render_to_save(c);

var scene = new SceneManager([trngl, sprite]);
scene.update();

window.c = c;
window.sprite = sprite;
window.scene = scene;

/*var ctx = c.getContext("2d");
ctx.imageSmoothingEnabled = false;
var palette = {};
var imageData = [];

var Img = new Image();
Img.src = "hrt.png";

Img.addEventListener("load", function() {
    ctx.drawImage(Img, 20, 20, 200, 100);
    imageData = ctx.getImageData(0, 0, 200, 200);
	palette = renderer.buildPalette(imageData);
	renderer.updateColors(imageData, palette._old, palette._new)
    ctx.putImageData(imageData, 0, 0);
}, false);*/


function setBg(canvas){
//var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);
}