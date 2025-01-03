const level_data = [
    {
        title: "level 1",
        images: ['elephant.png', 'crocodile.png', 'rhino.png', 'hippo.png', 'leopard.png', 'anoconda.png',
            'elephant.png', 'crocodile.png', 'rhino.png', 'hippo.png', 'leopard.png', 'anoconda.png'],
        bgMusic: new Audio("sound/level1/background_music.mp3"),
        backgroundImage: "background_image.jpg",
        timeLimit: { permission: false, value: 10 },
        movesLimit: { permission: false, value: 25 }
    },
    {
        title: "Level 2",
        images: ['ace.png', 'agatsuma.png', 'brook.png', 'chopper.png', 'nezuko.png', 'nami.png', 'luffy.png', 'fanky.png',
            'ace.png', 'agatsuma.png', 'brook.png', 'chopper.png', 'nezuko.png', 'nami.png', 'luffy.png', 'fanky.png'],
        bgMusic: new Audio("sound/level2/background_music.mp3"),
        backgroundImage: "background_image.jpg",
        timeLimit: { permission: false, value: 120 },
        movesLimit: { permission: true, value:  30}
    },
    {
        title: "Level 3",
        images: ['ghasitaram.png', 'doctor_jhatka.png', 'patlu.png', 'patlu1.png', 'motu1.png', 'motu.png', 'john.png', 'john1.png', 'doctor_jhatka1.png', 'ghasitaram1.png',
            'ghasitaram.png', 'doctor_jhatka.png', 'patlu.png', 'patlu1.png', 'motu1.png', 'motu.png', 'john.png', 'john1.png', 'doctor_jhatka1.png', 'ghasitaram1.png'],
        bgMusic: new Audio("sound/level3/background_music.mp3"),
        backgroundImage: "background_image.jpg",
        timeLimit: { permission: true, value: 120 },
        movesLimit: { permission: true, value: 25 }
    },
    {
        title: "Level 4",
        images: ['captain america.jpg', 'dr_strange.jpg', 'hulk.jpg', 'IRON man.png', 'spider man.png', 'wanda.png',
            'captain america.jpg', 'dr_strange.jpg', 'hulk.jpg', 'IRON man.png', 'spider man.png', 'wanda.png'],
        bgMusic: new Audio("sound/level4/background_music.mp3"),
        backgroundImage: "background_image.jpg",
        timeLimit: { permission: true, value: 120 },
        movesLimit: { permission: true, value: 25 }
    }
];