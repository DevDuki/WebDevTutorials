// Big function over everything to have no global variables
// Also makes you declare variables exactly where you need them
const game = () => {

    // Scores
    let pScore = 0; //Player score
    let cScore = 0; //Computer score

    //Start the game
    // For example in this function we only need these variable, therefore they werent declared before
    const startGame = () => {
        const playBtn = document.querySelector(".intro button");
        const introScreen = document.querySelector(".intro");
        const match = document.querySelector(".match");
        
        //Eventlistener that reacts at a click on the play button
        playBtn.addEventListener('click', () => {
            introScreen.classList.add("fadeOut");
            match.classList.add("fadeIn");
        });
    };

    //Play match
    const playMatch = () => {

        const options = document.querySelectorAll(".options button");   //sleects all buttons in the options div
        
        //Hand images
        const playerHand = document.querySelector(".player-hand");      //image of the player hand
        const computerHand = document.querySelector(".computer-hand");  //image of the computer hand
        const hands = document.querySelectorAll(".hands img");           //get both player's images
        
        //Everytime the animation ends, it gets removed so that it can be added again later on, on the next match
        hands.forEach(hand => {
            hand.addEventListener('animationend', function() {
                this.style.animation = "";
            })
        })
        //computer's options (generated randomly) by clicking on each of the 3 buttons (rock, paper, scissor)
        const computerOptions = ["rock", "paper", "scissors"];

        options.forEach((option) => {
            option.addEventListener("click", function() { //if we used an arrow function here, we cant use the "this" keyword
                
                //computer choice
                const computerNumber = Math.floor(Math.random() * 3); //randomly returns a number between 0, 1 and 2
                const computerChoice = computerOptions[computerNumber];

                //Delays the code inside by 2000ms (2s) so that the updated things get updated after 2s (after animation ends)
                setTimeout(() => {
                    //call compare function here
                    compareHands(this.textContent, computerChoice);

                    //update images to the respective choices
                    playerHand.src = `./assets/${this.textContent}.png`;
                    computerHand.src = `./assets/${computerChoice}.png`;
                }, 1000);

                //Add animations (animation will be done only once on the first time if not removed later on, with eventlistener on animationend)
                playerHand.style.animation = "shakePlayer 1s ease";
                computerHand.style.animation = "shakeComputer 1s ease";
            });
        });        
    };

    const updateScore = () => {
        const playerScore = document.querySelector(".player-score p");
        const computerScore = document.querySelector(".computer-score p");
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    }

    const compareHands = (playerChoice, computerChoice) => {
        //update winner text
        const winner = document.querySelector(".winner");

        //checking for a tie
        if(playerChoice === computerChoice){
            winner.textContent = "It is a tie";
            return;
        }
        //Check for rock
        if(playerChoice === "rock"){
            if(computerChoice === "scissors"){
                winner.textContent = "Player wins";
                pScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Computer wins";
                cScore++;
                updateScore();
                return;
            }
        }
        //Check for paper
        if(playerChoice === "paper"){
            if(computerChoice === "scissors"){
                winner.textContent = "Computer wins";
                cScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Player wins";
                pScore++;
                updateScore();
                return;
            }
        }
        //Check for scissors
        if(playerChoice === "scissors"){
            if(computerChoice === "rock"){
                winner.textContent = "Computer wins";
                cScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Player wins";
                pScore++;
                updateScore();
                return;
            }
        }
    };

    // Call all the inner function so that we can test our code above
    startGame();
    playMatch();
}

//start the game function
game();