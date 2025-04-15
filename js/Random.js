import Resources from '../config/resources_json.js'
import Ignored from '../config/ignoredRandom.js'
import Names from '../config/names.js'
import * as Const from './constants.js';

export default class Random {
    randomize(scene) {
        //random sprites
        Resources.layers.forEach((resource_folder) => {
            if (!Ignored.includes(resource_folder.name) && Names.map((i) => i.folder).includes(resource_folder.name)) {

                const selected = Math.floor(Math.random() * (resource_folder.resources.length));
                const resource = resource_folder.resources[selected]

                    console.log(resource_folder.base_folder)
                document.dispatchEvent(new CustomEvent("active_resource_changed", {
                    detail: { src: resource_folder.base_folder, img: resource_folder.name + '/' + resource }
                }));

                window.setTimeout(function() {
                    scene.replace(resource_folder.base_folder, resource_folder.base_folder + resource);
                    window.setTimeout(function() {
                        //random pallete
                        const selectedPallete = Math.floor(Math.random() * (scene.palette.length));
                        scene.recolor(resource_folder.name, { palette_id: selectedPallete })
                    }, Const.DELAY / 2);
                }, Const.DELAY / 2);


            }
        })
    }
}