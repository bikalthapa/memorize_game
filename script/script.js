// Array of image file names
const level_img = [
    ['elephant.png', 'crocodile.png', 'rhino.png', 'hippo.png', 'leopard.png', 'anoconda.png',
        'elephant.png', 'crocodile.png', 'rhino.png', 'hippo.png', 'leopard.png', 'anoconda.png'],
    ['ace.png', 'agatsuma.png', 'brook.png', 'chopper.png', 'nezuko.png', 'nami.png',
        'ace.png', 'agatsuma.png', 'brook.png', 'chopper.png', 'nezuko.png', 'nami.png'],
    ['boy.jpg', 'doremon.png', 'hello_kitty.jpg', 'patric.png', 'pikasu.png', 'spongilla.jpg',
        'boy.jpg', 'doremon.png', 'hello_kitty.jpg', 'patric.png', 'pikasu.png', 'spongilla.jpg'
    ]
];
let images;

const flipSound = new Audio("sound/page_flip.mp3");
const matchingSound = new Audio("sound/winning.wav");
let selected_level;
let levels = document.getElementsByClassName("level_cards");
let cards = document.getElementsByClassName("game_card");
let home_container = document.getElementById("home_container");
let game_container = document.getElementById("game_container");
let home_btn = document.getElementById("home_btn");
let flippedCards = [];
let currentMode = true;//True for home UI and False for game UI

// Function to shuffle the array using Fisher-Yates algorithm
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        // Random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements arr[i] and arr[j]
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function flipImg(card) {
    card.classList.toggle("flipped"); // Toggling on the card itself
    let img = card.querySelector(".card-back img");
    let imgIndex = parseInt(img.getAttribute("img-index"));
    img.src = "./image/" + "level" + selected_level + "/" + images[imgIndex];
}

function toggleTab() {
    if (currentMode == false) {
        home_container.classList.remove("d-none");
        game_container.classList.add("d-none");
        currentMode = !currentMode;
    } else {
        home_container.classList.add("d-none");
        game_container.classList.remove("d-none");
        currentMode = !currentMode;
    }
}
// Event Listener for lavels
for (let lvl of levels) {
    lvl.addEventListener("click", (e) => {
        toggleTab();
        selected_level = parseInt(lvl.getAttribute("level"));
        images = level_img[selected_level - 1];
        shuffleArray(images);
    })
}
home_btn.addEventListener("click", () => {
    if (currentMode == false) {// Toggle only in game mode when home_btn is clicked
        toggleTab();
    }
});

// Targeting the .card (parent) instead of the inner content
for (let card of cards) {
    card.setAttribute("is_flipped", "false");
    card.addEventListener("click", () => {
        if (card.getAttribute("is_flipped") == "false") {
            flipImg(card);
            flipSound.play();
            card.setAttribute("is_flipped", "true");
            if (flippedCards.length == 0) {// Nothing flipped it is first time in flipping
                flippedCards.push(card);
            } else if (flippedCards.length == 1) {// One card is already flipped
                flippedCards.push(card);
                let previousImg = flippedCards[0].querySelector(".card-back img");
                let currentImg = flippedCards[1].querySelector(".card-back img");
                if (previousImg.src == currentImg.src) {// Two cards are matched
                    flippedCards = [];
                    matchingSound.play();
                } else {// Two cards didn't matched
                    flippedCards[0].classList.toggle("flipped");
                    flippedCards[0].setAttribute("is_flipped", "false");
                    flippedCards.shift();
                }
            }
        }

    });
}



