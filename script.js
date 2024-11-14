let actualAns;
let userGuesses = [];
let maxGuessCount;
let guessCount;
let input = document.getElementById("inputBox");
let winSound = new Audio('./audio/win.wav');
let looseSound = new Audio('./audio/wrong.wav');
let randomSound = new Audio('./audio/random.wav');
let invalid = new Audio('./audio/invalidSound.wav');

const pageload = () =>{
    document.getElementById("newGame").style.display = "none";
    document.getElementById("game").style.display = "none";

    let easy = document.getElementById("easy");
    let hard = document.getElementById("hard");
    let extreme = document.getElementById("extreme");

    easy.addEventListener('click', easyMode);
    hard.addEventListener('click', hardMode);
    extreme.addEventListener('click', extremeMode);

    randomSound.play();
};

const startGame = () => {
    actualAns = Math.floor(Math.random() * 100);
    console.log(actualAns);
    document.getElementById("game").style.display = "block";
    document.getElementById("main").style.display = "none";
    document.getElementById("attempts").innerHTML = maxGuessCount - userGuesses.length;
    input.addEventListener('change', compareGuess);

};

const startNew = () =>{
    window.location.reload();
}

const newGameStart = () =>{
    document.getElementById("newGame").style.display = "inline";
    input.style.opacity = 0.5;
    input.style.border = "2px solid black";
    input.setAttribute("disabled", true);
    let newGame = document.getElementById("newGame");
    newGame.addEventListener('click', startNew);

}

const compareGuess = () =>{
    let guess = Number(document.getElementById("inputBox").value);
    let heading = document.getElementById("gameHeading");
    let guesses = document.getElementById("guessSection");
    let attempt = document.getElementById("attempts");

    if(guess < 0 || guess > 100){
        userGuesses = [...userGuesses, "X"];
    }

    else{
        userGuesses = [...userGuesses, " " + guess];
    }
    
    if(userGuesses.length >= 5){
        guesses.style.flexDirection = "column";
        let attemptSection = document.getElementById("attemptSection");
        attemptSection.style.textAlign = "center";
        attemptSection.style.flexDirection = "column";
    }
    
    document.getElementById("guesses").innerHTML = userGuesses;

    if(userGuesses.length < maxGuessCount)
    {
        if(guess > 100 || guess < 0){
            heading.innerHTML = "Invalid Guess 🙄!!";
            input.value = "";
            invalid.play();
        }

        else if(guess < actualAns){
            heading.innerHTML = "Your guess is Low 😥";
            input.value = "";
            randomSound.play();
        }
    
        else if(guess > actualAns){
            heading.innerHTML = "Your guess is High 😲";
            input.value = "";
            randomSound.play();
        }
    
        else{
            heading.innerHTML = "Your guess is Correct !!! 🤩🤩 Hurray !! ";
            input.value = "";
            let disableInput = document.getElementById("inputBox");
            disableInput.setAttribute("disabled", true);
            
            winSound.play();
            newGameStart();
        }

    }
    
    else{

        if(guess == actualAns){
            heading.innerHTML = "Your guess is Correct !!! 🤩🤩 Hurray !! ";
            winSound.play();
        }
        else{
            heading.innerHTML = "You Loose !! correct number was " + actualAns + "😭";
            looseSound.play();
        }

        input.value = "";
        newGameStart();
    }

    attempt.innerHTML = maxGuessCount - userGuesses.length;
};

const easyMode = () =>{
    maxGuessCount = 10;
    startGame();
};

const hardMode = () =>{
    maxGuessCount = 5;
    startGame();
};

const extremeMode = () =>{
    maxGuessCount = 3;
    startGame();
};

