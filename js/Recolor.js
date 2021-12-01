//Palette helpers

export function updateColors(imageData, oldImageColors, newImageColors) {
    for (var i = 0; i < imageData.data.length / 4; i++) {
        var currentColor = getColor(i, imageData);
        var randomColorIndex = oldImageColors.findIndex(item => sameColor(currentColor, item));
        if (randomColorIndex > -1) {
            setColor(newImageColors[randomColorIndex], imageData, i);
        }
    }
    return imageData;
}

export function setColor(hex, imageData, i) {
    if (hex == 'transparent') {
        imageData.data[i * 4] = 0;
        imageData.data[i * 4 + 1] = 0;
        imageData.data[i * 4 + 2] = 0;
        imageData.data[i * 4 + 3] = 0;
        return;
    }
    var rgb = hexToRgb(hex);
    if (!rgb)
        rgb = hexToRgb('#000000');
    imageData.data[i * 4] = rgb.r;
    imageData.data[i * 4 + 1] = rgb.g;
    imageData.data[i * 4 + 2] = rgb.b;

}

export function getNewColorCollection(size, rules, params) {
    let collection = [];
    for (let i = 0; i < size; i++) {
        collection.push(rules(i, params));
    }
    return collection;
}

export function sameColor(rgb1, rgb2, fault = 10) {
    let sameRed, sameGreen, sameBlue;

    sameRed = (rgb1.r + fault > rgb2.r) && (rgb1.r - fault < rgb2.r);
    sameGreen = (rgb1.g + fault > rgb2.g) && (rgb1.g - fault < rgb2.g);
    sameBlue = (rgb1.b + fault > rgb2.b) && (rgb1.b - fault < rgb2.b);

    return sameRed && sameGreen && sameBlue;//) || (sameGreen && sameBlue);

}

export function strictSameColor(rgb1, rgb2, fault = 20) {
    let sameRed, sameGreen, sameBlue;

    sameRed = rgb1.r = rgb2.r;
    sameGreen = rgb1.g = rgb2.g;
    sameBlue = rgb1.b = rgb2.b;

    return sameRed && sameGreen && sameBlue;

}

export function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export function rgbToHex(color) {
    return "#" + componentToHex(color.r) + componentToHex(color.g) + componentToHex(color.b);
}

export function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}


export function randomColor(i) {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export function preDefinedColor(i, params) {
    let collection = paletteFromSource();
    /*[
            ['#0B2027', '#0B2027', '#40798C', '#40798C', '#70A9A1', '#CFD7C7'],
            ['#242038', '#242038', '#725AC1', '#725AC1', '#CAC4CE', '#F7ECE1'],
            ['#45062E', '#45062E', '#7F055F', '#7F055F', '#E5A4CB', '#FFE8D4']
        ]*/
    ;
    return collection[params.palette_id][i];
}

export function paletteFromSource() {
    let canvas = document.getElementById('palette');
    let ctx = canvas.getContext("2d");
    let w = canvas.width;
    let h = canvas.height;
    let imageData = ctx.getImageData(0, 0, w, h).data;
    let palette = [];
    let collection = [];
    for (let i = 0; i < imageData.length; i += 4) {
        palette.push(rgbToHex({ r: imageData[i], g: imageData[i + 1], b: imageData[i + 2] }))
    }
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            if (collection[j] == undefined) {
                collection.push([palette[i + j]]);
            } else {
                collection[j].push(palette[i * w + j]);
            }
        }
    }
    for (let j = 0; j < w; j++) {
        collection[j].push(collection[j][4]);
    }
    return collection;
}


export function initPaletteFromSource() {
    let canvas = document.getElementById('palette');
    let ctx = canvas.getContext("2d");
    let img = new Image();
    img.src = 'img/palette.png';
    ctx.imageSmoothingEnabled = false;
    img.addEventListener("load", function() {
        canvas.height = img.naturalHeight;
        canvas.width = img.naturalWidth;
        ctx.drawImage(img, 0, 0);
    })
}