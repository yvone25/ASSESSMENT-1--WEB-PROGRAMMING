const rgbValue = document.getElementById("rgbValue");
const options = document.getElementById("options");
const message = document.getElementById("message");
const livesDisplay = document.getElementById("lives");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart");

let lives = 3;
let score = 0;

// Function to generate a random RGB color
function getRandomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

// Function to start the game
function generateGame() {
    options.innerHTML = "";
    message.textContent = "";
    const correctColor = getRandomColor();
    rgbValue.textContent = correctColor;
    
    let choices = [correctColor];
    while (choices.length < 3) {
        let newColor = getRandomColor();
        if (!choices.includes(newColor)) {
            choices.push(newColor);
        }
    }
    
    choices.sort(() => Math.random() - 0.5);
    choices.forEach(color => {
        const div = document.createElement("div");
        div.classList.add("color-box");
        div.style.backgroundColor = color;
        div.addEventListener("click", () => checkAnswer(color, correctColor));
        options.appendChild(div);
    });
}

// Function to check if the player's choice is correct
function checkAnswer(selected, correct) {
    if (selected === correct) {
        message.textContent = "Correct!";
        score++;
    } else {
        message.textContent = "Wrong!";
        lives--;
    }
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
    
    if (lives > 0) {
        setTimeout(generateGame, 1000);
    } else {
        message.textContent = "Game Over! Your final score is " + score;
        restartButton.style.display = "block";
    }
}

// Restart game when button is clicked
restartButton.addEventListener("click", () => {
    lives = 3;
    score = 0;
    livesDisplay.textContent = lives;
    scoreDisplay.textContent = score;
    restartButton.style.display = "none";
    generateGame();
});

// Start the game when the page loads
generateGame();
