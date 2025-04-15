import Palette from './Palette.js';
import * as Const from './constants.js';

export default class Sprite {
    constructor(src, layer_order = 1) {

        this.layer_id = Math.floor(Math.random() * 1000);

        let path = src.split('/');
        this.folder = path[1];
        
        this.layer = document.createElement('canvas');
        this.layer.height = Const.TRGT_HEIGHT;
        this.layer.width = Const.TRGT_WIDTH;
        this.layer.setAttribute('data-source', src);
        this.order = layer_order;
        this.ctx = this.layer.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.src = src;
        this.img = new Image();
        this.img.src = src;
        this.palette = new Palette();

        this.spriteSheetType = 'xp'; // default to XP
        this.updateSpriteSheetDimensions();

        let current_self = this;
        this.img.addEventListener("load", function() {
            current_self.drawScaled(current_self);
            document.dispatchEvent(new CustomEvent("loaded_sprite", {detail: 
                    {sprite: current_self}
            }));
        })
        document.getElementById('canvases').append(this.layer);
    }

    
    setSpriteSheetType(type) {
        this.spriteSheetType = type;
        this.updateSpriteSheetDimensions();
        this.drawScaled(this);
    }

    
    updateSpriteSheetDimensions() {
        const sheetType = Const.SPRITE_SHEET_TYPES[this.spriteSheetType.toUpperCase()];
        this.frameWidth = sheetType.frameWidth;
        this.frameHeight = sheetType.frameHeight;
        this.columns = sheetType.columns;
        this.rows = sheetType.rows;
        this.offsetX = sheetType.offsetX;
    }

    // change image on layer
    edit(src, canvas, params = false) {

        //palette id
        this.palette.setParams(params);

        //prepare img
        this.ctx.clearRect(0, 0, Const.TRGT_WIDTH, Const.TRGT_HEIGHT);
        let self = this;
        this.img = new Image();
        this.img.src = src;

        //wait till load
        this.img.addEventListener("load", function() {
            //draw stuff on layer
            self.drawScaled(self);
            self.palette.setBase(self.ctx, self.img.naturalWidth * Const.SCALE, self.img.naturalHeight * Const.SCALE);

            window.setTimeout(function() {
                let newImage = self.palette.getNewImage();
                self.ctx.putImageData(newImage, 0, 0);
                let local_ctx = canvas.getContext("2d");
                local_ctx.drawImage(self.layer, 0, 0);
            }, Const.DELAY / 2);

        }, false);
    }


    clear() {
        this.ctx.clearRect(0, 0, Const.TRGT_WIDTH, Const.TRGT_HEIGHT);
    }

    render_to_save(canvas) {
        let local_ctx = canvas.getContext("2d");
        local_ctx.drawImage(this.layer, 0, 0);
    }

    drawScaled(current_self) {
        current_self.layer.height = current_self.img.naturalHeight * Const.SCALE;
        current_self.layer.width = current_self.img.naturalWidth * Const.SCALE;
        current_self.ctx.imageSmoothingEnabled = false;
                // Apply offset for VX sprites
                const offsetX = current_self.offsetX * Const.SCALE;
                current_self.ctx.drawImage(
                    current_self.img, 
                    offsetX, 0, 
                    current_self.img.naturalWidth * Const.SCALE, current_self.img.naturalHeight * Const.SCALE,
                    0, 0,
                    current_self.img.naturalWidth * Const.SCALE, current_self.img.naturalHeight * Const.SCALE
                );
        ////
        window.setTimeout(function() {
            current_self.palette.setBase(current_self.ctx, current_self.layer.width, current_self.layer.height);
        }, Const.DELAY);


        let newImage = current_self.palette.getNoBgImage(current_self.ctx, Const.TRGT_WIDTH * Const.SCALE, Const.TRGT_HEIGHT * Const.SCALE);
        current_self.ctx.putImageData(newImage, 0, 0);
        ////
    }

}