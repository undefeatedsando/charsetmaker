export default {
    name: 'default',
    layers: [{
        name: 'hair',
        order: 2,
        canvas_size: 28,
        canvas_offset: 0,
        base_folder: 'img/hair/',
        resources: [
            '1.png',
            '2.png'
        ]
    }, {
        name: 'dress',
        order: 1,
        canvas_size: 32,
        canvas_offset: 15,
        base_folder: 'img/dress/',
        resources: [
            '1.png',
            '2.png'
        ]
    }]
}