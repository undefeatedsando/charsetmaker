import Sprite from '/js/Sprite.js';
import SceneManager from '/js/SceneManager.js';

var c = document.getElementById("kokoko");

setBg(c)

var trngl = new Sprite("trngl.png", 2);
var sprite = new Sprite("cat.png", 1);
var params = {};
window.params = params;

sprite.normalize(c);

//trngl.render_to_save(c);
//sprite.render_to_save(c);

var scene = new SceneManager(c, [trngl, sprite]);
scene.render();

window.c = c;
window.sprite = sprite;
window.scene = scene;


function setBg(canvas){
//var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);
}