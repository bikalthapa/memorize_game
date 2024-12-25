// Array of image file names
let cardContainer = document.getElementById("card_container");
const level_img = [
    ['elephant.png', 'crocodile.png', 'rhino.png', 'hippo.png', 'leopard.png', 'anoconda.png',
        'elephant.png', 'crocodile.png', 'rhino.png', 'hippo.png', 'leopard.png', 'anoconda.png'],
    ['ace.png', 'agatsuma.png', 'brook.png', 'chopper.png', 'nezuko.png', 'nami.png', 'brook.png', 'fanky.png',
        'ace.png', 'agatsuma.png', 'brook.png', 'chopper.png', 'nezuko.png', 'nami.png', 'brook.png', 'fanky.png'],
    ['boy.jpg', 'doremon.png', 'hello_kitty.jpg', 'patric.png', 'pikasu.png', 'spongilla.jpg',
        'boy.jpg', 'doremon.png', 'hello_kitty.jpg', 'patric.png', 'pikasu.png', 'spongilla.jpg'
    ]
];
let images;
let isPlayingAllowed = true;

const flipSound = new Audio("sound/page_flip.mp3");
const matchingSound = new Audio("sound/winning.wav");
const lvlBackground = [];
lvlBackground[0] = new Audio("sound/level1/background_music.mp3");
lvlBackground[1] = new Audio("sound/level2/background_music.mp3");
lvlBackground[2] = new Audio("sound/level3/background_music.mp3");



let selected_level;
let levels = document.getElementsByClassName("level_cards");
let cards = document.getElementsByClassName("game_card");
let home_container = document.getElementById("home_container");
let game_container = document.getElementById("game_container");
let level_container = document.getElementById("level_container");
let home_btn = document.getElementById("home_btn");
let speaker_btn = document.getElementById("speaker_btn");
let flippedCards = [];
let currentMode = true;//True for home UI and False for game UI

let cardPR = 4;// cards per row
// Function to shuffle the array using Fisher-Yates algorithm
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        // Random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements arr[i] and arr[j]
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    let row = document.createElement("div");
    cardContainer.innerHTML = "";
    for (let i = 0; i < images.length / cardPR; i++) {
        createGameRow(cardContainer, i);
    }
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
}
function createGameRow(cardContainer, rowIndx) {
    // Create the main row container div
    const rowDiv = document.createElement("row");
    rowDiv.className = "game_row";
    for (let j = 0; j < cardPR; j++) {


        // Loop to create 5 game cards
        const gameCardDiv = document.createElement('div');
        gameCardDiv.className = 'game_card';

        const cardInnerDiv = document.createElement('div');
        cardInnerDiv.className = 'card-inner';

        const cardFrontDiv = document.createElement('div');
        cardFrontDiv.className = 'card-front';

        const cardBackDiv = document.createElement('div');
        cardBackDiv.className = 'card-back';

        const img = document.createElement('img');
        img.src = `./image/level${selected_level}/${images[cardPR * rowIndx + j]}`;
        img.setAttribute('img-index', rowIndx);

        cardBackDiv.appendChild(img);

        cardInnerDiv.appendChild(cardFrontDiv);
        cardInnerDiv.appendChild(cardBackDiv);

        gameCardDiv.appendChild(cardInnerDiv);


        rowDiv.appendChild(gameCardDiv);
    }
    // Append the main row container div to the card container
    cardContainer.appendChild(rowDiv);
}

function createLevelCard(container, level, imgSrc) {
    // Create the main container div
    const colDiv = document.createElement('div');
    colDiv.className = 'col';

    // Create the card div
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card text-bg-light level_cards';
    cardDiv.setAttribute('level', level);

    // Create the image element
    const img = document.createElement('img');
    img.src = imgSrc;
    img.className = 'card-img';
    img.alt = '...';

    // Create the card overlay div
    const cardOverlayDiv = document.createElement('div');
    cardOverlayDiv.className = 'card-img-overlay bg-light bg-opacity-25';

    // Create the card title element
    const cardTitle = document.createElement('h1');
    cardTitle.className = 'card-title';
    cardTitle.textContent = `Level ${level}`;

    // Append the card title to the card overlay div
    cardOverlayDiv.appendChild(cardTitle);

    // Append the image and card overlay div to the card div
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardOverlayDiv);

    // Append the card div to the main container div
    colDiv.appendChild(cardDiv);

    // Append the main container div to the specified container
    container.appendChild(colDiv);
}

function playMusic(musicTyp) {
    if (isPlayingAllowed == true) {// Play the music if allowed
        if (musicTyp == "background") {
            for (let i = 0; i < lvlBackground.length; i++) {
                if (i == selected_level - 1) {
                    lvlBackground[i].play();
                    lvlBackground[i].loop = true;
                } else {
                    lvlBackground[i].pause();
                }
            }
        }
    } else {
        if (musicTyp == "background") {
            for (let i = 0; i < lvlBackground.length; i++) {
                lvlBackground[i].pause();
            }
        }
    }
}

function flipImg(card) {
    card.classList.toggle("flipped"); // Toggling on the card itself
    let img = card.querySelector(".card-back img");
    let imgIndex = parseInt(img.getAttribute("img-index"));
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
// generating the levels
for(let i = 1; i<=level_img.length; i++){
    createLevelCard(level_container,i,"image/logo.png");
}
// Event Listener for lavels
for (let lvl of levels) {

    lvl.addEventListener("click", (e) => {
        toggleTab();
        selected_level = parseInt(lvl.getAttribute("level"));
        images = level_img[selected_level - 1];
        shuffleArray(images);
        playMusic("background", true);
    })
}
home_btn.addEventListener("click", () => {
    if (currentMode == false) {// Toggle only in game mode when home_btn is clicked
        toggleTab();
    }
});


// Speaker btn event listener
speaker_btn.addEventListener("click", () => {
    let mute_btn = speaker_btn.querySelector("#mute_btn");
    let unmute_btn = speaker_btn.querySelector("#unmute_btn");
    mute_btn.classList.toggle("d-none");
    unmute_btn.classList.toggle("d-none");
    isPlayingAllowed = !isPlayingAllowed;
    playMusic("background");
})





