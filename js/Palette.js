import * as Recolor from './Recolor.js';


export default class Palette {

    imageData = false;
    oldPalette = false;
    newPalette = false;
    params = false;

    setBase(ctx, width, height) {
        this.imageData = ctx.getImageData(0, 0, width, height);
    }

    setParams(params) {
        if (!!params)
            this.params = params;
    }

    get() {
        return { imageData: this.imageData, params: this.params };
    }

    getNoBgImage(ctx, width, height) {
        this.imageData = ctx.getImageData(0, 0, width, height);
        for (var i = 0; i < this.imageData.data.length / 4; i++) {
            var currentColor = this.getColor(i);
            //bg
            if (Recolor.rgbToHex(currentColor) == '#2b8585') {
                Recolor.setColor('transparent', this.imageData, i);
            }
        }
        //console.log(this.imageData)
        return this.imageData;
    }

    getNewImage() {

        //build palettes  
        if (!this.params || this.params.palette_id == null) {
            return this.imageData;
        }
        this.getOldPalette();
        this.getNewPalette();      

        //replace colors
        for (var i = 0; i < this.imageData.data.length / 4; i++) {
            var currentColor = this.getColor(i);
            //bg transparent
            if (currentColor.a == 0) {
                continue;
            }

            if (Recolor.rgbToHex(currentColor) == '#2b8585') {
                Recolor.setColor('transparent', this.imageData, i);
                continue;
            }

            //remove skin
            if (Recolor.sameColor(currentColor, Recolor.hexToRgb('#ebbf96'), 30)) { // || Recolor.rgbToHex(currentColor) == '#ffebc7') {

                Recolor.setColor(currentColor, this.imageData, i);
                continue;
            }

            var newColorIndex = this.oldPalette.findIndex(item => Recolor.sameColor(currentColor, item));
            Recolor.setColor(this.newPalette[newColorIndex], this.imageData, i);
        }
        return this.imageData;
    }

    getOldPalette() {
        let oldPalette = [];
        for (let i = 0; i < this.imageData.data.length / 4; i++) {
            let currentColor = this.getColor(i);
            
            //bg transparent
            if (currentColor.a == 0) {
                continue;
            }

            if (this.notInPalette(oldPalette, currentColor) && !!this.notBg(i)) {
                oldPalette.push(currentColor);
            }
        }

        oldPalette.sort((a, b) => (a.r + a.g + a.b) < (b.r + b.g + b.b) ? -1 : 1);
        this.oldPalette = oldPalette;
        //console.log(oldPalette);
        return oldPalette;
    }

    getNewPalette() {
        if (!this.params)
            this.newPalette = this.oldPalette
        else
            this.newPalette = Recolor.getNewColorCollection(
                this.oldPalette.length, 
                Recolor.preDefinedColor, 
                this.params)

        //console.log(this.newPalette);
        return this.newPalette;
    }

    getColor(i) {
        return {
            r: this.imageData.data[i * 4],
            g: this.imageData.data[i * 4 + 1],
            b: this.imageData.data[i * 4 + 2],
            a: this.imageData.data[i * 4 + 3]
        }
    }

    notInPalette(palette, color) {
        if (palette.length == 0)
            return true;

        if (Recolor.sameColor(palette[0], color))
            return false;

        return palette.reduce((res, item) => { return res && !Recolor.sameColor(color, item) })
    }

    notBg(i) {
        return this.imageData.data[i * 4 + 3] > 200;
    }

}