// main.js

const startBtn = document.querySelector('.start_btn');
const startPage = document.querySelector('.start_page');
const gamePage = document.querySelector('.game_page');
const mainGame = document.querySelector('.main_game');
const gameExplain = document.querySelector('.game_explain');
const exitBtn = document.querySelector('.exit_btn');
const continueBtn = document.querySelector('.continue_btn');
const resultPop = document.querySelector('.result_popup');
const resultText = document.querySelector('.result_text');
const resultScore = document.querySelector('.result_score')
const skipBtn = document.querySelector('.skip_btn');
const endPage = document.querySelector('.end_page');
const firstPageBtn = document.querySelector('.firstPage_btn')
const endTitle = document.querySelector('.end_title')
const userScoreText = document.querySelector('.user_score');
const comScoreText = document.querySelector('.com_score');
const gameTimer = document.querySelector('.game_timer')

let timerInterval;
let userScore = 0;
let computerScore = 0;

const scissors = document.getElementById('scissors');
const rock = document.getElementById('rock');
const paper = document.getElementById('paper');

startBtn.addEventListener('click', function() {
   startPage.classList.add('active');
   gameExplain.classList.add('active');

   userScore = 0;
   computerScore = 0;

   clearInterval(timerInterval)
});

exitBtn.addEventListener('click', function() {
   startPage.classList.remove('active');
   gameExplain.classList.remove('active');
});

continueBtn.addEventListener('click', function() {
   gameExplain.classList.remove('active');
   mainGame.classList.add('active');

   userScore = 0;
   computerScore = 0;

   clearInterval(timerInterval)
   timer();
});
skipBtn.addEventListener('click', function() {
   if (userScore >= 3 || computerScore >= 3) {
      resultPop.classList.remove('active');
      gamePage.classList.add('active');
      endPage.classList.add('active');
   } else {
      resultPop.classList.remove('active');
   }
   clearInterval(timerInterval)
   timer();
});

function timer() {
   let i = 3;
   gameTimer.innerHTML = i;
   clearInterval(timerInterval);


   timerInterval = setInterval(() => {
      if (i > 0) {
         i--;
         gameTimer.innerHTML = i;
      } else {
         clearInterval(timerInterval);
         computerScore++;
         resultPop.classList.add('active');
         resultText.innerHTML = `시간 초과!`;
         resultScore.innerHTML = `유저: ${userScore} vs 컴퓨터: ${computerScore}`;
         winner();
      }
   }, 1000);
}

firstPageBtn.addEventListener('click', function() {
   startPage.classList.remove('active');
   gameExplain.classList.remove('active');
   gamePage.classList.remove('active');
   mainGame.classList.remove('active');
   resultPop.classList.remove('active');
   endPage.classList.remove('active');

   userScore = 0;
   computerScore = 0;
   clearInterval(timerInterval);
})

function computerChoice() {
   const randomChoice = ['가위', '바위', '보'];
   const randomNum = Math.floor(Math.random() * 3);
   return randomChoice[randomNum];
}

function win() {
   userScore++;
   resultPop.classList.add('active');
   resultText.innerHTML = 'WIN ^.^'
   resultScore.innerHTML = `유저: ${userScore} vs 컴퓨터: ${computerScore}`;
   winner();
}

function lose() {
   computerScore++;
   resultPop.classList.add('active');
   resultText.innerHTML = 'LOSE ㅜㅠ'
   resultScore.innerHTML = `
   유저: ${userScore} vs 컴퓨터: ${computerScore}`;
   winner();
}

function draw() {
   resultPop.classList.add('active');
   resultText.innerHTML = 'DRAW!!!'
   resultScore.innerHTML = `
   유저: ${userScore} vs 컴퓨터: ${computerScore}`;
}



function winner() {
   if(userScore >= 3) {
      endTitle.innerHTML = "";
      endTitle.innerHTML = "ㅊㅋㅊㅋ 오늘의 WINNER!"

   } else if(computerScore >= 3) {
      endTitle.innerHTML = "";
      endTitle.innerHTML = "아쉽습니다. 컴퓨터가 이겼어용"
   }
}
function game(userChoice) {
   clearInterval(timerInterval);

   if (userScore >= 3 || computerScore >= 3) {
      gamePage.classList.add('active');
      endPage.classList.add('active');

      return;
   }

   const comChoice = computerChoice();

   switch(userChoice + comChoice) {
      case "가위보":
      case "바위가위":
      case "보주먹":
         win();
         break;
      case "가위주먹":
      case "바위보":
      case "보가위":
         lose();
         break;
      case "가위가위":
      case "바위바위":
      case "보보":
         draw();
         break;
   };
}

   scissors.addEventListener('click', () => game('가위'));
   rock.addEventListener('click', () => game('바위'));
   paper.addEventListener('click', () => game('보'));
