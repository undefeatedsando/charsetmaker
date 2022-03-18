import Resources from '../config/resources_json.js'
import * as Const from './constants.js';
import Palette from './Palette.js';
import Decorated from '../config/decorated_elements.js';

export default class Controls {
    constructor(scene) {
        this.scene = scene;
        this.active_resource = false;
        this.ctxs = [];
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
            document.getElementById('color').append(set_link);
        });
    }

    initResourceControls() {

        let width = Const.TRGT_WIDTH / 4;
        let height = Const.TRGT_HEIGHT / 4;
        let controls = this;

        Resources.layers.forEach((resource_folder, i) => {

            //create containers for previews
            let container = document.createElement('div');
            container.classList.add('preview_container');
            let container_id = 'preview_container_' + i;
            container.id = container_id;

            //
            let need_save_ctx = this.hasLinked(resource_folder.name);

            document.getElementById('previews').append(container);

            //create canvas
            resource_folder.resources.forEach((resource) => {
                let set_resource = document.createElement('canvas');
                set_resource.setAttribute('data-source', resource_folder.base_folder);
                set_resource.height = resource_folder.canvas_size;//Const.TRGT_HEIGHT / 4 - 15;
                set_resource.width = width;

                //load image and draw
                let img = new Image();
                let ctx = set_resource.getContext("2d");                
                let src = resource_folder.base_folder + resource;
                ctx.name = resource;

                if(need_save_ctx){
                    controls.ctxs.push({ctx: ctx, canvas: set_resource});
                }

                img.src = src;
                let self = this;
                img.addEventListener("load", function() {
                    ctx.drawImage(img, 0, resource_folder.canvas_offset, width, height, 0, 0, img.naturalWidth / 4, img.naturalHeight / 4);


//////
/*                    let helper_palette = new Palette();
                    let transparent_data = helper_palette.getNoBgImage(ctx, width, height);

                    ctx.clearRect(0, 0, width, height);
                    ctx.putImageData(transparent_data, 0, 0);*/
//////
                    //console.log(src);
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
        this.complexControl();
    }

    hasLinked(name) {
        let has = 0;
        Decorated.forEach((linked_folders) => {
            has = has || linked_folders.indexOf(name) > -1;
        })
        return has;
    }


    complexControl() {
        let helper_palette = new Palette();
        let flag = 0;
        let width = Const.TRGT_WIDTH / 4;
        let height = Const.TRGT_HEIGHT / 4;
        let original_ctx = false;
        this.ctxs.forEach((item_a) => {
                //console.log(item_a);
                flag = 0;
                original_ctx = item_a;
                this.ctxs.forEach((item_b) => {
                        if (item_a.ctx.name == item_b.ctx.name && item_a.ctx.name !== '0.png') {
                            flag++;
                            if (flag > 1) {
                                console.log(item_a.ctx.name)

                                window.setTimeout(function() { 
                                //let original_data = item_a.getImageData(0, 0, width, height);
                                let transparent_data = helper_palette.getNoBgImage(item_b.ctx, width, height);
                                
                                item_b.ctx.putImageData(transparent_data, 0, 0);
                                item_a.ctx.drawImage(item_b.canvas, 0,0)
                                }, Const.DELAY);

                            }
                            
                        }
                    
                })
        })
    //let transparent_data = helper_palette.getNoBgImage(ctx, width, height);
    //
    //ctx.clearRect(0, 0, width, height);
    //ctx.putImageData(transparent_data, 0, 0);
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