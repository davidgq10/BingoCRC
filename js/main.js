'use strict';const preventFormater = 1;
const selectedBalls = [];
let timer = 60;

/////     GET HTML REFERENCES     /////
const recentBallsContainer = document.getElementById('recent-ball');
const gameOptionsContainer = document.getElementById('gameOptions');
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
const games = [
  { nombre: 'CartonLleno', imagen: 'img/imgCartonLleno.png' },
  { nombre: 'Cruz', imagen: 'img/imgCruz.png' },
  { nombre: 'CuatroEsquinas', imagen: 'img/imgCuatroEsquinas.png' },
  { nombre: 'Diagonal', imagen: 'img/imgDiagonal.png' },
  { nombre: 'LetraA', imagen: 'img/imgLetraA.png' },
  { nombre: 'LetraC', imagen: 'img/imgLetraC.png' },
  { nombre: 'LetraE', imagen: 'img/imgLetraE.png' },
  { nombre: 'LetraF', imagen: 'img/imgLetraF.png' },
  { nombre: 'LetraH', imagen: 'img/imgLetraH.png' },
  { nombre: 'LetraJ', imagen: 'img/imgLetraJ.png' },
  { nombre: 'LetraL', imagen: 'img/imgLetraL.png' },
  { nombre: 'LetraM', imagen: 'img/imgLetraM.png' },
  { nombre: 'LetraN', imagen: 'img/imgLetraN.png' },
  { nombre: 'LetraO', imagen: 'img/imgLetraO.png' },
  { nombre: 'LetraP', imagen: 'img/imgLetraP.png' },
  { nombre: 'LetraS', imagen: 'img/imgLetraS.png' },
  { nombre: 'LetraT', imagen: 'img/imgLetraT.png' },
  { nombre: 'LetraU', imagen: 'img/imgLetraU.png' },
  { nombre: 'LetraW', imagen: 'img/imgLetraW.png' },
  { nombre: 'LetraX', imagen: 'img/imgLetraX.png' },
  { nombre: 'LetraY', imagen: 'img/imgLetraY.png' },
  { nombre: 'LetraZ', imagen: 'img/imgLetraZ.png' },
  { nombre: 'LineaHorizontal', imagen: 'img/imgLineaHorizontal.png' },
  { nombre: 'LineaVertical', imagen: 'img/imgLineaVertical.png' },
];

const gameOptions = games.forEach(
  game =>
    (gameOptionsContainer.innerHTML += `<img  id='${game.nombre}' class='gameOptions__game' src='${game.imagen}' alt='${game.nombre}'>`)
);
document.querySelectorAll('.gameOptions__game').forEach(game =>
  game.addEventListener('click', e => {
    document.getElementById(e.target.id).classList.add('hide-modal');
  })
);

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

const btnOpenGameOption = document
  .getElementById('game')
  .addEventListener('click', () => {
    gameOptionsContainer.classList.remove('hide-modal');
    document
      .querySelectorAll('.gameOptions__game')
      .forEach(game => game.classList.remove('hide-modal'));
  });

const btnCloseGameOption = document
  .getElementById('closeGameOption')
  .addEventListener('click', () => {
    gameOptionsContainer.classList.add('hide-modal');
    console.log('Helow!');
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

    document
      .getElementById('stroke-3')
      .setAttribute('style', `width:${(timer / initialTimer) * 100}%`);
  }, 1000);
});
