'use strict';const preventFormater = 1;
const selectedBalls = [];
let timeInput = 0;

/////     GET HTML REFERENCES     /////
const recentBallsContainer = document.getElementById('recent-ball');
const gameOptionsContainer = document.getElementById('gameOptions');
const celebration = document.getElementById('celebration');
const sidebarContainer = document.getElementById('sitebar');
const recentBallsTitle = document.getElementById('recent-balls-title');
const TimerModal = document.getElementById('timerModal');
const btnAnimate = document
  .getElementById('animate')
  .addEventListener('click', e => {
    console.log(e.target.checked);
    if (e.target.checked) {
      document
        .querySelectorAll('.ball')
        .forEach(ball => ball.classList.add('animateSeleted'));
    } else {
      document
        .querySelectorAll('.ball')
        .forEach(ball => ball.classList.remove('animateSeleted'));
    }
  });

const cargarSonido = function (fuente) {
  const sonido = document.createElement('audio');
  sonido.src = fuente;
  sonido.setAttribute('preload', 'auto');
  sonido.setAttribute('controls', 'none');
  sonido.style.display = 'none'; // <-- oculto
  document.body.appendChild(sonido);
  return sonido;
};

const btnCelebrate = document
  .getElementById('celebrate')
  .addEventListener('click', () => {
    const sonido = cargarSonido('audio/celebrations.mp3');
    sonido.play();
    celebration.classList.remove('hide-modal');
  });

const btnStartTimer = document
  .getElementById('timeStart')
  .addEventListener('click', () => {
    timeInput = parseInt(document.getElementById('timeInput').value) * 60;
    if (timeInput > 0) {
      console.log(timeInput);
      TimerModal.classList.remove('hide-modal');

      let timerSet = setInterval(function () {
        const time = [];
        const minutes = Math.floor(timeInput / 60);
        const seconds = Math.trunc((timeInput / 60 - minutes) * 60);

        if (minutes > 9) [time[0], time[1]] = String(minutes);
        if (minutes <= 9) time[1] = String(minutes);
        if (seconds > 9) [time[2], time[3]] = String(seconds);
        if (seconds <= 9) time[3] = String(seconds);
        document.getElementById('number-1').innerText = time[0] ?? 0;
        document.getElementById('number-2').innerText = time[1] ?? 0;
        document.getElementById('number-3').innerText = time[2] ?? 0;
        document.getElementById('number-4').innerText = time[3] ?? 0;

        if (timeInput === 0) {
          clearInterval(timerSet);
        }
        timeInput -= 1;
      }, 1000);
    }
  });

const btnTimer = document
  .getElementById('timerOpen')
  .addEventListener('click', () => {
    if (
      document.getElementById('btn-timeInput').classList.contains('hide-modal')
    ) {
      document.getElementById('btn-timeInput').classList.remove('hide-modal');
    } else {
      document.getElementById('btn-timeInput').classList.add('hide-modal');
    }
  });
const btnCloseTimer = document
  .getElementById('closeTimer')
  .addEventListener('click', () => {
    TimerModal.classList.add('hide-modal');
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
    sidebarContainer.innerHTML += `<img  id='game${e.target.id}' class='sidebar__game' src='${e.target.src}' alt='${e.target.id}'>`;
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
    document.getElementById('gameOptions').classList.remove('hide-modal');

    const games = document.querySelectorAll('.sidebar__game');
    games.forEach(game => document.getElementById(game.id).remove());

    document
      .querySelectorAll('.gameOptions__game')
      .forEach(element => element.classList.remove('hide-modal'));
  });

const btnCloseGameOption = document
  .getElementById('closeGameOption')
  .addEventListener('click', () => {
    gameOptionsContainer.classList.add('hide-modal');
    const sidebarGames = document.querySelectorAll('.sidebar__game');
    console.log(sidebarGames);
    sidebarGames.forEach(card =>
      card.addEventListener('click', e => {
        if (e.target.classList.contains('inactive')) {
          e.target.classList.remove('inactive');
        } else {
          e.target.classList.add('inactive');
        }
      })
    );
  });
/////     END BOARD CREATION     /////

function selectBall(ball) {
  if (ball.classList.contains('selected')) {
    ball.classList.remove('selected');
    const indexBall = selectedBalls.indexOf(parseInt(ball.id));
    selectedBalls.splice(indexBall, 1);
    document.getElementById('recent-' + ball.id).remove();
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
  newLi.id = 'recent-' + ball.id;
  newLi.classList.add('recent-ball__ball', 'recent-ball__ball--1');
  newLi.innerText = ball.id;
  recentBallsTitle.insertAdjacentElement('afterEnd', newLi);
}
