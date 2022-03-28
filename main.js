import * as Recolor from './js/Recolor.js';
import Sprite from './js/Sprite.js';
import SceneManager from './js/SceneManager.js';

var c = document.getElementById("kokoko");

var params = {};
window.params = params;

var scene = new SceneManager(c);
window.c = c;
window.scene = scene;