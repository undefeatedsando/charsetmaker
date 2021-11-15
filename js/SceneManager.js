export default class SceneManager {
	//sprites = [];

	constructor(canvas, sprites_arr) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.sprites = sprites_arr;
		this.sprites.sort((a, b) => a.order > b.order ? 1: -1);
		console.log(this.sprites);
	}

	render(){
		this.sprites.forEach(sprite => sprite.render_to_save(this.canvas))
	}

	recolor(sprite_name, param){
		//console.log(this.sprites);
		let index = this.sprites.findIndex(item => item.img.src.indexOf(sprite_name) > -1);
		console.log(index);
		this.sprites.forEach((sprite, i) => {
			if(i !== index){
				sprite.edit(sprite.img.src, this.canvas);
			} else {
				sprite.edit(sprite.img.src, this.canvas, param);
			}
		})
	}

}