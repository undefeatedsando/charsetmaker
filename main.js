import * as Recolor from '/js/Recolor.js';
import Sprite from '/js/Sprite.js';
import SceneManager from '/js/SceneManager.js';

var c = document.getElementById("kokoko");

setBg(c)

//var trngl = new Sprite("trngl.png", 2);
//var sprite = new Sprite("cat.png", 1);

var sprites = [
new Sprite("img/fbase.png", 1),
new Sprite("img/hair/1.png", 3),
new Sprite("img/dress/1.png", 2),
//new Sprite("img/palette.png", 2),
];
var params = {};
window.params = params;

sprites[0].normalize(c);

//trngl.render_to_save(c);
//sprite.render_to_save(c);

var scene = new SceneManager(c, sprites/*[trngl, sprite]*/);
scene.render();
window.c = c;
//window.sprite = sprite;
window.scene = scene;


function setBg(canvas){
//var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);
}