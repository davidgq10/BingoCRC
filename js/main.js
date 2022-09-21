let selectedBalls = [];const balls_board = document.getElementById('balls_board');
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

function selectBall(ball) {
  if (ball.classList.contains('selected')) {
    ball.classList.remove('selected');
    const indexBall = selectedBalls.indexOf(parseInt(ball.id));
    selectedBalls.splice(indexBall, 1);
    // selectedBalls = selectedBalls.filter((i, value) => {
    //   value !== parseInt(ball.id);
    // });
    console.log(selectedBalls);
  } else {
    ball.classList.add('selected');
    selectedBalls.push(parseInt(ball.id));
    console.log(selectedBalls);
  }
}
