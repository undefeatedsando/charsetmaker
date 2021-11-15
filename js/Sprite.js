import Palette from './Palette.js';
import * as Const from './constants.js';

export default class Sprite {
    constructor(src, layer_order = 1) {

        this.layer_id = Math.floor(Math.random() * 1000);
        this.layer = document.createElement('canvas');
        this.ctx = this.layer.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.img = new Image();
        this.img.src = src;
        this.palette = new Palette();

        let id = this.layer_id;
        let layer = this.layer;
        let ctx = this.ctx;
        let img = this.img;
        let drawScaled = this.drawScaled;
        this.img.addEventListener("load", function() {
            drawScaled(layer, ctx, img);
        })
        document.body.append(this.layer);
    }

    edit(src, canvas, params) {
        window.params = params;
        this.ctx.clearRect(0, 0, Const.TRGT_WIDTH, Const.TRGT_HEIGHT);
        let self = this;
        this.img = new Image();
        this.img.src = src;
        self = this;
        this.img.addEventListener("load", function() {
            self.drawScaled(self.layer, self.ctx, self.img)
            self.palette.setBase(self.ctx, self.img.naturalWidth * Const.SCALE, self.img.naturalHeight * Const.SCALE);

            window.setTimeout(function() {
                let newImage = self.palette.getNewImage();
                self.ctx.putImageData(newImage, 0, 0);
                let local_ctx = canvas.getContext("2d");
                local_ctx.drawImage(self.layer, 0, 0);
            }, Const.DELAY);

        }, false);
    }

    clear() {
        this.ctx.clearRect(0, 0, Const.TRGT_WIDTH, Const.TRGT_HEIGHT);
    }

    normalize(canvas) {
        let self = this;
        window.setTimeout(function() {
            canvas.width = self.layer.width;
            canvas.height = self.layer.height
        }, Const.DELAY);
    }

    render_to_save(canvas) {
        let self = this;
        window.setTimeout(function() { self._render_to_save(canvas) }, Const.DELAY);
    }

    _render_to_save(canvas) {
    	let local_ctx = canvas.getContext("2d");
        local_ctx.drawImage(this.layer, 0, 0);
    }

    drawScaled(canvas, ctx, img) {
        canvas.height = img.naturalHeight * Const.SCALE;
        canvas.width = img.naturalWidth * Const.SCALE;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, img.naturalWidth * Const.SCALE, img.naturalHeight * Const.SCALE);
    }

    setSelfBg(color = "transparent") {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, Const.TRGT_WIDTH, Const.TRGT_HEIGHT);
    }

    setBg(ctx) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(0, 0, Const.TRGT_WIDTH, Const.TRGT_HEIGHT)
    }

    test() {
        alert(1);
    }
}