// Array of image file names
let cardContainer = document.getElementById("card_container");


let images;
let isPlayingAllowed = true;

const flipSound = new Audio("sound/page_flip.mp3");
const matchingSound = new Audio("sound/winning.wav");
const coinCollect = new Audio("sound/coin_collection.wav");



let levels = document.getElementsByClassName("level_cards");
let cards = document.getElementsByClassName("game_card");

let home_container = document.getElementById("home_container");
let game_container = document.getElementById("game_container");
let level_container = document.getElementById("level_container");
let control_container = document.getElementById("control_container");

let level_field = document.getElementById("current_level");
let time_field = document.getElementById("time_field");
let moves_field = document.getElementById("moves_field");
let time_logo = document.getElementById(time_field.getAttribute("descriptor"));
let moves_logo = document.getElementById(moves_field.getAttribute("descriptor"));
let score_field = document.getElementById("score_field");

let home_btn = document.getElementById("home_btn");
let speaker_btn = document.getElementById("speaker_btn");
let quit_btn = document.getElementById("quit_btn");

let flippedCards = [];
let currentMode = true;//True for home UI and False for game UI

let selected_level;
let cardPR = 4;// cards per row
let totalFlips = 0;// This is for calculating the remaining number of cards

let score = 0; // Initial Score is zero
let passed_time = 0;// initial time to 0 s
let used_moves = 0;// Initial moves to 0

// This function will format the time
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function setData(dataType) {
    if (dataType == "time") {
        let timeLimit = level_data[selected_level - 1].timeLimit;
        let remainingTime = timeLimit.value - passed_time;
        if (timeLimit.permission == true) {// if timelimit is allowed display remaining time
            time_field.innerHTML = formatTime(remainingTime);
            if (remainingTime <= 0) {
                triggerModal("timelimit");
                stopTimmer();
            }
        } else {// If timelimit was not given display the passed time
            time_field.innerHTML = formatTime(passed_time);
        }
    } else if (dataType == "moves") {
        let movesLimit = level_data[selected_level - 1].movesLimit;
        let remainingMoves = movesLimit.value - used_moves;
        if (movesLimit.permission == true) {
            moves_field.innerHTML = remainingMoves;
            if (remainingMoves <= 0) {
                triggerModal("moveslimit");
                stopTimmer();
            }
        } else {
            moves_field.innerHTML = used_moves;
        }
    } else if (dataType == "score") {
        score_field.innerHTML = score;
    }

    if (flippedCards == level_data[selected_level - 1].images.length - 1) {
        triggerModal();
    }


}

function getData(dataType) {
    if (dataType == "time") {
        return formatTime(passed_time);
    } else if (dataType == "moves") {
        return used_moves;
    } else if (dataType == "score") {
        return score;
    }
}
// This is timmer function that runs every second
let timerInterval;

function startTimmer() {
    timerInterval = setInterval(() => {
        passed_time++;
        setData("time");
        setData("moves");
        setData("score");
    }, 1000);
}

function stopTimmer() {
    clearInterval(timerInterval);
}



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
                used_moves++;
                flipImg(card);
                flipSound.play();
                card.setAttribute("is_flipped", "true");
                if (flippedCards.length == 0) {// Nothing flipped it is first time in flipping
                    flippedCards.push(card);
                    totalFlips++;
                } else if (flippedCards.length == 1) {// One card is already flipped
                    flippedCards.push(card);
                    let previousImg = flippedCards[0].querySelector(".card-back img");
                    let currentImg = flippedCards[1].querySelector(".card-back img");
                    if (previousImg.src == currentImg.src) {// Two cards are matched
                        score++;
                        flippedCards = [];
                        totalFlips++;
                        matchingSound.play();
                    } else {// Two cards didn't matched
                        flippedCards[0].classList.toggle("flipped");
                        flippedCards[0].setAttribute("is_flipped", "false");
                        flippedCards.shift();
                    }
                }
            }
            isMovesLeft();
        });
    }
}

function updateControls() {
    if (level_data[selected_level - 1].timeLimit.permission == false) {
        time_logo.classList.add("text-secondary");
    } else {
        time_field.innerHTML = level_data[selected_level - 1].timeLimit.value + "s";
        time_logo.classList.remove("text-secondary");
    }

    if (level_data[selected_level - 1].movesLimit.permission == false) {
        moves_logo.classList.add("text-secondary");
    } else {
        moves_field.innerHTML = level_data[selected_level - 1].movesLimit.value;
        moves_logo.classList.remove("text-secondary");
    }
}

function isMovesLeft() {
    if (totalFlips == images.length) {
        triggerModal();
        return false;
    }
    return true;
}

function resetGame() {
    totalFlips = 0;
    score = 0; // Initial Score is zero
    passed_time = 0;// initial time to 0 s
    used_moves = 0;// Initial moves to 0
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
    cardOverlayDiv.className = 'card-img-overlay bg-light bg-opacity-75';

    // Create the card title element
    const cardTitle = document.createElement('h1');
    cardTitle.className = 'card-title';
    cardTitle.textContent = level_data[level - 1].title;

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



function playMusic(musicTyp, status = true) {
    if (isPlayingAllowed == true) {// Play the music if allowed
        if (musicTyp == "background" && status == true) {
            level_data[selected_level - 1].bgMusic.play();
            level_data[selected_level - 1].bgMusic.loop = true;
        } else if (musicTyp == "background" && status == false) {
            level_data[selected_level - 1].bgMusic.pause();
            level_data[selected_level - 1].bgMusic.loop = true;
        }
    } else {
        if (musicTyp == "background") {
            level_data[selected_level - 1].bgMusic.pause(); // Corrected line
        }
    }

    if (musicTyp == "reward") {
        coinCollect.currentTime = 0;
        coinCollect.play();
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
for (let i = 1; i <= level_data.length; i++) {
    createLevelCard(level_container, i, "image/logo.png");
}
// Event Listener for lavels
for (let lvl of levels) {
    lvl.addEventListener("click", (e) => {
        selected_level = parseInt(lvl.getAttribute("level"));
        toggleTab();
        control_container.classList.toggle("d-none");
        updateControls();
        level_field.innerHTML = level_data[selected_level - 1].title;
        images = level_data[selected_level - 1].images;
        shuffleArray(images);
        playMusic("background", true);
        startTimmer();
    })
}
home_btn.addEventListener("click", () => {
    if (currentMode == false) {// Toggle only in game mode when home_btn is clicked
        toggleTab();
        control_container.classList.toggle("d-none");
        resetGame();
        stopTimmer();
    }
    playMusic("background", false);
});
quit_btn.addEventListener("click", () => {
    if (currentMode == false) {
        toggleTab();
        playMusic("background", false);
        resetGame();
    }
})

// Speaker btn event listener
speaker_btn.addEventListener("click", () => {
    let mute_btn = speaker_btn.querySelector("#mute_btn");
    let unmute_btn = speaker_btn.querySelector("#unmute_btn");
    mute_btn.classList.toggle("d-none");
    unmute_btn.classList.toggle("d-none");
    isPlayingAllowed = !isPlayingAllowed;
    playMusic("background");
})





// Function to animate stars with a delay
function animateStar(starId, delay) {
    setTimeout(function () {
        const star = document.getElementById(starId);
        star.style.opacity = 1; // Make the star visible
        star.style.transform = 'scale(1)'; // Make the star grow to normal size
        playMusic("reward");
    }, delay);
}

// Function to trigger the Bootstrap modal
function triggerModal() {
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    let finalScoreDiv = document.getElementById("finalScore");
    let finalTimeDiv = document.getElementById("finalTime");
    let finalMovesDiv = document.getElementById("finalMoves");
    let nextlvl_btn = document.getElementById("next_level");
    finalScoreDiv.innerHTML = score;
    finalTimeDiv.innerHTML = getData("time");
    finalMovesDiv.innerHTML = getData("moves");
    modal.show();
    let totalScore = level_data[selected_level - 1].images.length / 2;
    let percentage_complete = (score / totalScore) * 100;
    // Show stars with delays: First star after 500ms, second after 1500ms, third after 2500ms
    if (percentage_complete >= 10) {
        animateStar('star1', 500); // First star (bronze) after 500ms
    }

    if (percentage_complete > 30) {
        animateStar('star2', 1000); // Second star (silver) after 1500ms
    }
    if (percentage_complete > 60) {
        animateStar('star3', 1500); // Third star (gold) after 2500ms
    }

    nextlvl_btn.addEventListener("click", () => {
        if (selected_level != level_data.length) {
            resetGame();
            playMusic("background", false);
            
            selected_level++;
            updateControls();
            level_field.innerHTML = level_data[selected_level - 1].title;
            modal.hide();
            playMusic("background",true);
            images = level_data[selected_level - 1].images;
            shuffleArray(images);
            startTimmer();
        }else{
            toggleTab();
            control_container.classList.toggle("d-none");
            resetGame();
            stopTimmer();
            modal.hide();
        }
        playMusic("background",false);
    })
};



