export default class Controls {
	constructor(scene){
		scene.palette.forEach((set, i) => {
			let set_link = document.createElement('div');
			console.log(set_link);
			set_link.style.width = '20px';
			set_link.style.height = '20px';
			set_link.style.display = 'inline-block';
			set_link.style.backgroundColor = set[4];
			set_link.addEventListener("click", function(){
				scene.recolor('hair', {palette_id: i})
			})
			document.getElementById('controls').append(set_link);
		});
	}
}