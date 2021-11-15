
export function rebuildSprite(alt_palette){
	imageData = ctx.getImageData(0, 0, 200, 200);
	palette = buildPalette(imageData);
	updateColors(imageData, palette._old, alt_palette)
    ctx.putImageData(imageData, 0, 0);
}

export function getColor(i, imageData) {
    return {
        r: imageData.data[i * 4],
        g: imageData.data[i * 4 + 1],
        b: imageData.data[i * 4 + 2]
    }
}

export function setColor(hex, imageData, i) {
	var rgb = hexToRgb(hex);
	if(!rgb)
		rgb = hexToRgb('#000000');
    imageData.data[i*4] 		= rgb.r;
    imageData.data[i*4 + 1] 	= rgb.g;
    imageData.data[i*4 + 2] 	= rgb.b;

}

export function sameColor(rgb1, rgb2, fault = 20) {
    var sameRed, sameGreen, sameBlue;

    sameRed 	= (rgb1.r + fault > rgb2.r) && (rgb1.r - fault < rgb2.r);
    sameGreen 	= (rgb1.g + fault > rgb2.g) && (rgb1.g - fault < rgb2.g);
    sameBlue 	= (rgb1.b + fault > rgb2.b) && (rgb1.b - fault < rgb2.b);

    return sameRed && sameGreen && sameBlue;
}

export function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export function randomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

export function buildPalette(imageData){
    var imageColors = [];
    var oldImageColors = [];
    var newImageColors = [];
	for (var i = 0; i < imageData.data.length / 4; i++) {
    	var currentColor = getColor(i, imageData);
    	if(!imageColors.length || imageColors.reduce((res, item) => { return res && !sameColor(currentColor, item) })){
    		imageColors.push(currentColor);
    	}
    }

	for (var i = 0; i < imageColors.length; i++) {
		if(!sameColor(imageColors[i], hexToRgb('#000000')) && !sameColor(imageColors[i], hexToRgb('#ffffff'))){
			oldImageColors.push(imageColors[i]);
			newImageColors.push(randomColor());
		}
	}

	return {_old: oldImageColors, _new: newImageColors}
}

export function updateColors(imageData, oldImageColors, newImageColors){
    for (var i = 0; i < imageData.data.length / 4; i++) {
    	var currentColor = getColor(i, imageData);
    	var randomColorIndex = oldImageColors.findIndex(item => sameColor(currentColor, item));
    	if(randomColorIndex > -1){
    		setColor(newImageColors[randomColorIndex], imageData, i);
    	}
    }
}
