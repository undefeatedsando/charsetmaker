import * as Recolor from './Recolor.js';
import * as Const from './constants.js';
import Controls from './Controls.js';
import Sprite from './Sprite.js';
import Resources from '../config/resources_json.js'
import Linked from '../config/linked_folders.js'

export default class SceneManager {
    //sprites = [];

    constructor(canvas /*, sprites_arr*/ ) {
        Recolor.initPaletteFromSource();
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        /*        this.sprites = sprites_arr;
                this.sprites.sort((a, b) => a.order > b.order ? 1 : -1);*/
        self = this;
        self.sprites = [];
        Resources.layers.forEach((resource_folder, i) => {
            self.sprites.push(new Sprite(resource_folder.base_folder + resource_folder.resources[0], i));
        })
        //console.log(self.sprites);
        self.sprites.sort((a, b) => a.order > b.order ? 1 : -1);

        document.addEventListener("palette", function() {
            self.palette = Recolor.paletteFromSource();
            self.controls = new Controls(self);
        })

        //console.log(this.sprites);
    }

    normalize() {
        this.sprites[0].normalize(this.canvas);
    }

    render() {
        this.sprites.forEach(sprite => {
            sprite.render_to_save(this.canvas);
        })
    }

    recolor(sprite_name, param) {
        //console.log(this.sprites);
        //console.log(sprite_name, this.sprites, Linked);
        let index = this.sprites.findIndex(item => item.img.src.indexOf(sprite_name) > -1);

        let linked = [this.sprites[index].folder];

        Linked.forEach((arr) => {
            if(arr.indexOf(this.sprites[index].folder) > -1)
                linked = arr;
        })

        console.log(linked);
        this.sprites.forEach((sprite, i) => {
            //console.log(sprite.src, i);
            if (linked.indexOf(sprite.folder) > -1) { // (i == index || i == 15) {
                //this.linked(sprite, sprite.src, param);
                sprite.edit(sprite.img.src, this.canvas, param);
                //this.linked_recolor(sprite, sprite.img.src, param);
                //console.log(sprite.img.src, this.canvas, param)
            } else {
                sprite.edit(sprite.img.src, this.canvas);
            }
        })
    }

    replace(sprite_old, sprite_new) {
        this.ctx.clearRect(0, 0, Const.TRGT_WIDTH, Const.TRGT_HEIGHT);
        let index = this.sprites.findIndex(item => item.img.src.indexOf(sprite_old) > -1);
        this.sprites.forEach((sprite, i) => {
            if (i == index) {
                //sprite.edit(sprite_new, this.canvas);
                this.linked_replace(sprite, sprite_new);
            } else {
                sprite.edit(sprite.img.src, this.canvas);
            }
            //console.log('Sprite' + i, sprite);
        })
    }

    linked_replace(sprite, sprite_new) {
        //console.log(sprite_new, this.canvas, param)
        //for basic sprites
        sprite.edit(sprite_new, this.canvas);
        //return;
        //each linked folders from config
        Linked.forEach((arr) => {
            let folders = sprite_new.split('/');
            //if link exists
            if (arr.indexOf(folders[1]) != -1) {
                //each element
                arr.forEach((str) => {
                    //do smthng
                    let data = this.build_linked(sprite.src, sprite_new, str);
                    data.sprite_to_replace.edit(data.new_sprite_name, this.canvas);
                })
            }
        })

    }

    find_sprite(src) {
        return this.sprites[this.sprites.findIndex(item => item.src == src)];
    }

    build_linked(old_src, new_src, connected_folder) {

        let old_folders = old_src.split('/');
        let new_folders = new_src.split('/');

        let old_name = old_folders[0] + '/' + connected_folder + '/' + old_folders[2];
        let new_name = new_folders[0] + '/' + connected_folder + '/' + new_folders[2];

        let old_sprite = this.find_sprite(old_name);

        return { sprite_to_replace: old_sprite, new_sprite_name: new_name };
    }

}