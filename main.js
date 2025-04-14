import * as Recolor from './js/Recolor.js';
import Sprite from './js/Sprite.js';
import SceneManager from './js/SceneManager.js';
import AnimationPreview from './js/AnimationPreview.js';

var c = document.getElementById("kokoko");
var a = document.getElementById("animation");
var params = {};
window.params = params;

var scene = new SceneManager(c);
window.c = c;
window.scene = scene;
window.a = a;

var animation = new AnimationPreview(c, a);