import * as Recolor from './Recolor.js';
import * as Const from './constants.js';
import Controls from './Controls.js';
import Sprite from './Sprite.js';
import Random from './Random.js';
import Resources from '../config/resources_json.js'
import Linked from '../config/linked_folders.js'
import Decorated from '../config/decorated_elements.js'

export default class SceneManager {

    constructor(canvas) {

        //build all available sprites
        this.canvas = canvas;

        this.ctx = canvas.getContext("2d");
        let self = this;

        //each of the first sprites
        self.sprites = [];

        Resources.layers.forEach((resource_folder, i) => {
            self.sprites.push(new Sprite(resource_folder.base_folder + resource_folder.resources[0], i));
        })

        document.addEventListener("loaded_sprite", function(e) {
            e.detail.sprite.render_to_save(self.canvas);
        })

        self.sprites.sort((a, b) => a.order > b.order ? 1 : -1);

        //init controls
        Recolor.initPaletteFromSource();
        document.addEventListener("palette", function() {
            self.palette = Recolor.paletteFromSource();
            self.controls = new Controls(self);
        })

        canvas.width = Const.TRGT_WIDTH;
        canvas.height = Const.TRGT_HEIGHT

    }

    randomize() {
        const random = new Random();
        random.randomize(this);
    }

    setSceneSpriteSheetType(type) {
        this.sprites.forEach(sprite => sprite.setSpriteSheetType(type));
        const typeConfig = Const.SPRITE_SHEET_TYPES[type.toUpperCase()];
        this.canvas.width = typeConfig.columns * typeConfig.frameWidth;
            
        // Re-render all sprite layers
        this.sprites.forEach(sprite => sprite.render_to_save(this.canvas));
    }

    recolor(sprite_name, param) {

        let index = this.sprites.findIndex(item => item.img.src.indexOf(sprite_name) > -1);

        let linked = [this.sprites[index].folder];

        //get connected folder
        Linked.forEach((arr) => {
            if(arr.indexOf(this.sprites[index].folder) > -1)
                linked = arr;
        })

        this.sprites.forEach((sprite, i) => {
            if (linked.indexOf(sprite.folder) > -1) {
                //recolor chosen
                sprite.edit(sprite.img.src, this.canvas, param);
            } else {
                //leave as is
                sprite.edit(sprite.img.src, this.canvas);
            }
        })

    }

    replace(sprite_old, sprite_new) {

        this.ctx.clearRect(0, 0, Const.TRGT_WIDTH, Const.TRGT_HEIGHT);

        //get layer index
        let index = this.sprites.findIndex(item => item.img.src.indexOf(sprite_old) > -1);
        
        this.sprites.forEach((sprite, i) => {
            if (i == index) {
                //redraw edited layer
                this.linked_replace(sprite, sprite_new);
            } else {
                //draw others
                sprite.edit(sprite.img.src, this.canvas);
            }
        })

    }

    linked_replace(sprite, sprite_new) {

        //for basic sprites
        sprite.edit(sprite_new, this.canvas);

        //each linked and decotrated from config
        let all_linked = Linked.concat(Decorated);
        all_linked.forEach((arr) => {
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