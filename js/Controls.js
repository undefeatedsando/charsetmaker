import Resources from '../config/resources_json.js'
import * as Const from './constants.js';

export default class Controls {
    constructor(scene) {
        this.scene = scene;
        this.active_resource = false;
        this.initColorControls();
        this.initResourceControls();
    }

    initColorControls() {
        self = this;
        this.scene.palette.forEach((set, i) => {
            let set_link = document.createElement('div');
            set_link.style.backgroundColor = set[4];
            set_link.classList.add('color_control');
            //color change
            set_link.addEventListener("click", function() {
                self.changeActiveClass('.color_control', this);
                self.colorChange(self.active_resource, i);
            })
            document.getElementById('controls').append(set_link);
        });
    }

    initResourceControls() {
        Resources.layers.forEach((resource_folder, i) => {
            //create containers for previews
            let container = document.createElement('div');
            container.classList.add('preview_container');
            let container_id = 'preview_container_' + i;
            container.id = container_id;
            document.getElementById('previews').append(container);

            resource_folder.resources.forEach((resource) => {
                let set_resource = document.createElement('canvas');
                set_resource.height = resource_folder.canvas_size;//Const.TRGT_HEIGHT / 4 - 15;
                set_resource.width = Const.TRGT_WIDTH / 4;
                let img = new Image();
                let ctx = set_resource.getContext("2d");
                img.src = resource_folder.base_folder + resource;
                let self = this;
                img.addEventListener("load", function() {
                    //ctx.drawImage(img, 0, 0, Const.TRGT_WIDTH / 4, Const.TRGT_HEIGHT / 4, 0, 0, img.naturalWidth / 4, img.naturalHeight / 4);
                    ctx.drawImage(img, 0, resource_folder.canvas_offset, Const.TRGT_WIDTH / 4, Const.TRGT_HEIGHT / 4, 0, 0, img.naturalWidth / 4, img.naturalHeight / 4);
                })

                set_resource.addEventListener("click", function() {
                    self.scene.replace(resource_folder.base_folder, resource_folder.base_folder + resource);
                    self.active_resource = resource_folder.name;
                    self.changeActiveClass('#'+container_id + ' canvas', this);
                    //console.log(resource_folder.base_folder + resource);
                })
                document.getElementById(container_id).append(set_resource);
                //console.log(resource_folder.base_folder + resource);
            })
        })
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