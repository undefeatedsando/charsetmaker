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
    var rgb = hexToRgb(hex);
    if (!rgb)
        rgb = hexToRgb('#000000');
    imageData.data[i * 4] = rgb.r;
    imageData.data[i * 4 + 1] = rgb.g;
    imageData.data[i * 4 + 2] = rgb.b;

}

export function getNewColorCollection(size, rules) {
    let collection = [];
    for (let i = 0; i < size; i++) {
        collection.push(rules(i));
    }
    return collection;
}

export function sameColor(rgb1, rgb2, fault = 20) {
    let sameRed, sameGreen, sameBlue;

    sameRed = (rgb1.r + fault > rgb2.r) && (rgb1.r - fault < rgb2.r);
    sameGreen = (rgb1.g + fault > rgb2.g) && (rgb1.g - fault < rgb2.g);
    sameBlue = (rgb1.b + fault > rgb2.b) && (rgb1.b - fault < rgb2.b);

    return sameRed && sameGreen && sameBlue;

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

export function preDefinedColor(i) {
	let collection = ['#7fac72', '#d0ddaf', '#ac650d', '#8539ab'];
	return collection[i];
}