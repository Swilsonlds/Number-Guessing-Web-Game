const feedback = document.querySelector("#feedback");
const guessField = document.querySelector("#guess");
const submitBtn = document.querySelector("#submitBtn");
const feedbackBox = document.querySelector("#feedbackBox");
const playAgain = document.querySelector("#playAgain");
const highScore = document.querySelector("#highScore");
const resetHighScore = document.querySelector("#resetHighScore")
let random = Math.floor(Math.random() * 101);

let feedbackNum = Number(document.querySelector("#guess").value);
let counter = 0;

guessField.focus();
guessField.select();

if(submitBtn){
    submitBtn.addEventListener("click", CheckGuess);
}

if(playAgain){
    playAgain.addEventListener("click", reset)
}

if(resetHighScore){
    resetHighScore.addEventListener("click", clearHighScore)
}

function CheckGuess() {

    feedbackBox.style.backgroundColor= "rgb(228, 115, 81)";
    feedbackBox.classList.remove("hidden");
    console.log(counter);
    console.log(random);
    guessField.focus();
    guessField.select();

    if (guessField.value === 'number' || (guessField.value > 0 && guessField.value < 101)){

        if(guessField.value == random) {
            counter ++;
            feedbackBox.style.backgroundColor= "Green";
            feedback.innerHTML = `Congrats! You Guessed it in <b>${counter}</b> tries!`;
            playAgain.classList.remove("hidden");
            KeepingTrack(counter);
        }

        else if(parseInt(guessField.value) > random) {
            feedback.textContent = "You're a little high. Guess again!";
            counter++;
            guessField.value = null;
        }

        else {
            feedback.textContent = "You're a little low. Guess again!";
            counter++;
            guessField.value = null;
        }
    }

    else {
        feedbackBox.style.backgroundColor= "rgb(228, 115, 81)";
        feedback.textContent = "Invalid input. Please enter a number between 0 and 100";
        guessField.value = null;
    }
}

function reset() {
    feedbackBox.classList.add("hidden");
    playAgain.classList.add("hidden");
    guessField.value = null;
    guessField.focus();
    guessField.select();
    counter = 0;
    random = Math.floor(Math.random() * 101);

    return;
}

if (!localStorage.getItem("highScore")){
    highScore.innerHTML = "None";
  } else{
    highScore.innerHTML = localStorage.getItem("highScore") + " guesses";
  }
  
function KeepingTrack(score) {
  if(!localStorage.getItem("highScore")) {
    localStorage.setItem("highScore", score);
    highScore.innerHTML = localStorage.getItem("highScore");


  } else {
    let curHighScore = Number(localStorage.getItem("highScore"));

    if (curHighScore > score){
      localStorage.setItem("highScore", score);
      highScore.innerHTML = localStorage.getItem("highScore") + " guesses";
    }
  }
}

function clearHighScore(){
  localStorage.removeItem("highScore");
  highScore.innerHTML = "None";
}

