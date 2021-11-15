export default class SceneManager {
	sprites = [];

	constructor(sprites_arr) {
		console.log(sprites_arr);
		this.sprites.concat(sprites_arr);
	}

	update(){
		console.log(this.sprites);
	}

}