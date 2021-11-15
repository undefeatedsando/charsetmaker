import * as Recolor from './Recolor.js';


export default class Palette {

    imageData = false;
    oldPalette = false;
    newPalette = false;

    setBase(ctx, width, height) {
        this.imageData = ctx.getImageData(0, 0, width, height);
    }

    get() {
        return { imageData: this.imageData };
    }

    getNewImage() {
    	this.getOldPalette();
    	this.getNewPalette();
            console.log(this.newPalette, this.oldPalette);
        for (var i = 0; i < this.imageData.data.length / 4; i++) {
            var currentColor = this.getColor(i);
            //bg transparent
            if (currentColor.a == 0) {
                continue;
            }
            //bg white
            if (currentColor.r + currentColor.g + currentColor.b == 255 * 3) {
                continue;
            }
            //console.log(currentColor, this.oldPalette);
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
            //bg white
            if (currentColor.r + currentColor.g + currentColor.b == 255 * 3) {
                continue;
            }
            if (this.notInPalette(oldPalette, currentColor) && !!this.notBg(i)) {
                oldPalette.push(currentColor);
            }
        }
        this.oldPalette = oldPalette;
        return oldPalette;
    }

    getNewPalette() {
        this.newPalette = Recolor.getNewColorCollection(this.oldPalette.length, Recolor.preDefinedColor)
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