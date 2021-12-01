import * as Recolor from './Recolor.js';
import * as Const from './constants.js';
import Controls from './Controls.js';
import Resources from '../config/resources_json.js'

export default class SceneManager {
    //sprites = [];

    constructor(canvas, sprites_arr) {
        Recolor.initPaletteFromSource();
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.sprites = sprites_arr;
        this.sprites.sort((a, b) => a.order > b.order ? 1 : -1);
        self = this;
        console.log(self.sprites);
        window.setTimeout(function() {
            self.palette = Recolor.paletteFromSource();
            self.controls = new Controls(self);
        }, Const.DELAY);
        //console.log(this.sprites);
    }

    render() {
        this.sprites.forEach(sprite => {
            sprite.render_to_save(this.canvas);
        })
    }

    recolor(sprite_name, param) {
        //console.log(this.sprites);
        let index = this.sprites.findIndex(item => item.img.src.indexOf(sprite_name) > -1);
        this.sprites.forEach((sprite, i) => {
            if (i !== index) {
                sprite.edit(sprite.img.src, this.canvas);
            } else {
                sprite.edit(sprite.img.src, this.canvas, param);
            }
        })
    }

    replace(sprite_old, sprite_new) {
        //console.log(this.sprites);
        let index = this.sprites.findIndex(item => item.img.src.indexOf(sprite_old) > -1);
        this.sprites.forEach((sprite, i) => {
            if (i == index) {
                sprite.edit(sprite_new, this.canvas);
            } else {
                sprite.edit(sprite.img.src, this.canvas);
            }
        })
    }

}