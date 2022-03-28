import Resources from '../config/resources_json.js'
import * as Const from './constants.js';
import Palette from './Palette.js';
import Decorated from '../config/decorated_elements.js';
import Names from '../config/names.js';

export default class Controls {
    constructor(scene) {
        this.scene = scene;
        this.active_resource = false;
        this.ctxs = [];
        this.initColorControls();
        this.initResourceControls();
        this.linked = this.listOfLinked();
    }

    initColorControls() {
        self = this;
        this.scene.palette.forEach((set, i) => {
            let set_link = document.createElement('div');

            //set color displayed in square
            set_link.style.backgroundColor = set[4];
            set_link.classList.add('color_control');
            
            //color change
            set_link.addEventListener("click", function() {
                self.changeActiveClass('.color_control', this);
                self.colorChange(self.active_resource, i);
            })
            document.getElementById('color').append(set_link);
        });
    }

    initResourceControls() {

        let width = Const.TRGT_WIDTH / 4;
        let height = Const.TRGT_HEIGHT / 4;
        let controls = this;

        this.multiLayerControl();

        Resources.layers.forEach((resource_folder, i) => {

            //create containers for previews
            let container = document.createElement('div');
            container.classList.add('preview_container');
            let container_id = 'preview_container_' + i;
            container.id = container_id;

            let container_header = document.createElement('h2');
            container_header.classList.add('container_name');

            let name = controls.findContainerName(resource_folder.name);

            document.getElementById('previews').append(container);

            if(name){
                container_header.innerHTML = name;
                document.getElementById(container_id).append(container_header);
            } else {
                container.classList.add('hidden_control');
            }

            //create canvas
            resource_folder.resources.forEach((resource) => {
                let set_resource = document.createElement('canvas');
                let data_image = resource_folder.name + '/' + resource;
                set_resource.setAttribute('data-source', resource_folder.base_folder);
                set_resource.setAttribute('data-image', data_image);
                set_resource.height = resource_folder.canvas_size;//Const.TRGT_HEIGHT / 4 - 15;
                set_resource.width = width;

                //load image and draw
                let img = new Image();
                let ctx = set_resource.getContext("2d");                
                let src = resource_folder.base_folder + resource;
                ctx.name = resource;

                img.src = src;
                let self = this;
                img.addEventListener("load", function() {
                    ctx.drawImage(img, 0, resource_folder.canvas_offset, width, height, 0, 0, img.naturalWidth / 4, img.naturalHeight / 4);
                    //todo: remove background
                    document.dispatchEvent(new CustomEvent("loaded_control", {detail: 
                            {img_name: data_image}
                    }));
                })

                // set control
                set_resource.addEventListener("click", function() {
                    self.scene.replace(resource_folder.base_folder, resource_folder.base_folder + resource);
                    self.active_resource = resource_folder.name;
                    self.changeActiveClass('#'+container_id + ' canvas', this);
                })
                document.getElementById(container_id).append(set_resource);
            })
        })
    }

    multiLayerControl() {
        let self = this;
        document.addEventListener("loaded_control", function(e) {
            let base_canvas_id = self.findBaseCanvas(e.detail.img_name);
            if (!base_canvas_id)
                return;
    
            let helper_palette = new Palette();
            let width = Const.TRGT_WIDTH / 4;
            let height = Const.TRGT_HEIGHT / 4;

            let base_canvas = document.querySelector("[data-image='" + base_canvas_id + "']");
            let decor_canvas = document.querySelector("[data-image='" + e.detail.img_name + "']");
    
            let transparent_data = helper_palette.getNoBgImage(decor_canvas.getContext("2d"), width, height);

            decor_canvas.getContext("2d").putImageData(transparent_data, 0, 0);
            base_canvas.getContext("2d").drawImage(decor_canvas, 0,0);
    
            decor_canvas.style.display = "none";
    
        })
    }

    findContainerName(base_name) {
        let name = false;
        Names.forEach((name_item) => {
            if(name_item.folder == base_name) {
                name = name_item.name;
            }
        })
        return name;
    }

    findBaseCanvas(full_name) {
        let idx = this.linked.decor.indexOf(full_name);
        if(idx > -1) {
            return this.linked.base[idx];
        }
        return false;
    }

    listOfLinked() {
        let list_of_base = [];
        let list_of_decor = [];

        Resources.layers.forEach((resource_folder) => {
            resource_folder.resources.forEach((resource) => {
                Decorated.forEach((linked_folders) => {
                    if (resource !== "0.png") {
                        if (linked_folders.indexOf(resource_folder.name) > 0) {
                            list_of_decor.push(resource_folder.name + '/' + resource);                            
                            list_of_base.push(linked_folders[0] + '/' + resource);
                        }
                    }
                })
            })
        })

        return {base: list_of_base, decor: list_of_decor};
    }

    hasLinked(name) {
        let has = 0;
        Decorated.forEach((linked_folders) => {
            has = has || linked_folders.indexOf(name) > -1;
        })
        return has;
    }

    colorChange(resource_name, palette_id) {
        this.scene.recolor(resource_name, { palette_id: palette_id })
    }

    changeActiveClass(selector, element) {
        let elements = document.querySelectorAll(selector);
        for (var j = 0; j < elements.length; j++) {
            elements[j].classList.remove('active');
        }
        //also class
        element.classList.add('active');
    }
}