'use strict';
const preventFormater = 1;
const selectedBalls = [];
let timer = 60;

/////     GET HTML REFERENCES     /////
const recentBallsContainer = document.getElementById('recent-ball');
const celebration = document.getElementById('celebration');
const recentBallsTitle = document.getElementById('recent-balls-title');
const btnCelebrate = document
  .getElementById('celebrate')
  .addEventListener('click', () => {
    celebration.classList.remove('hide-modal');
  });

const btnRestart = document
  .getElementById('restart')
  .addEventListener('click', () => {
    window.location.reload();
  });

//***ADDING LISTENERS
celebration.addEventListener('click', () =>
  celebration.classList.add('hide-modal')
);

/////     END GET HTML REFERENCES     /////

/////     START VARIABLES DECLRATION     /////

/////     END START VARIABLES DECLRATION     /////

/////     BOARD CREATION     /////
const balls_board = document.getElementById('balls_board');
for (let i = 1; i <= 75; i++) {
  balls_board.innerHTML += `<li id='${i}' class='ball'>${i}</li>`;
}
const balls = document.querySelectorAll('.ball');
console.log(balls);
balls.forEach(ball => {
  ball.addEventListener('click', e => {
    selectBall(e.target);
  });
});
/////     END BOARD CREATION     /////

function selectBall(ball) {
  if (ball.classList.contains('selected')) {
    ball.classList.remove('selected');
    const indexBall = selectedBalls.indexOf(parseInt(ball.id));
    selectedBalls.splice(indexBall, 1);
    console.log(selectedBalls);
  } else {
    ball.classList.add('selected');
    selectedBalls.unshift(parseInt(ball.id));
    console.log(selectedBalls);
    removeLastRecentBall();
    if (selectedBalls.length > 1) {
      recentBallsAnimation().then(() => addNewRecentBall(ball));
    } else {
      addNewRecentBall(ball);
    }
  }
}

function recentBallsAnimation() {
  let animate;
  const recentBallsToAnimate = document.querySelectorAll('.recent-ball__ball');
  recentBallsToAnimate.forEach(ball => {
    animate = ball.animate(
      [
        { transform: `translate(0) rotate(0) scale(1)` },
        { transform: `translate(17rem) rotate(360deg) scale(0.9)` },
      ],
      {
        duration: 1000,
        iterations: 1,
      }
    );
  });

  return animate.finished;
}

function removeLastRecentBall() {
  if (selectedBalls.length >= 4)
    recentBallsContainer.removeChild(recentBallsContainer.lastChild);
}

function addNewRecentBall(ball) {
  const newLi = document.createElement('li');
  newLi.id = ball.id;
  newLi.classList.add('recent-ball__ball', 'recent-ball__ball--1');
  newLi.innerText = ball.id;
  recentBallsTitle.insertAdjacentElement('afterEnd', newLi);
}

document.getElementById('timer').addEventListener('click', () => {
  const initialTimer = timer;
  let timerSet = setInterval(function () {
    const minutes = Math.trunc(timer / 60);
    const seconds = Math.trunc((timer / 60 - Math.floor(timer / 60)) * 60);
    document.getElementById('myTimeMinute').innerText = minutes;
    document.getElementById('myTimeSecond').innerText = seconds;
    if (timer === 0) {
      clearInterval(timerSet);
    }
    timer -= 1;

    document.getElementById('stroke-3').style.width =
      (initialTimer - timer) / 100;
  }, 1000);
});
