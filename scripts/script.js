let players = [];
let nroPlayers = 0;
let rounds = 0;
let actualRound = 0;

function configGame() {
  const section1 = document.getElementById('section1');
  const section2 = document.getElementById('section2');
  const playersName = document.getElementById('playersName');

  for (let i = 0; i < nroPlayers; i += 1) {
    const div = document.createElement('div');
    div.className = 'item';
    const label = document.createElement('label');
    label.innerHTML = 'Nombre de jugador';
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'name';
    div.appendChild(label);
    div.appendChild(input);
    playersName.appendChild(div);
  }

  section1.classList.toggle('hide');
  section2.classList.toggle('hide');
}

document.getElementById('config').addEventListener('click', () => {
  nroPlayers = Number(document.getElementById('nroPlayers').value);
  if (nroPlayers === 3) {
    rounds = 20;
    configGame();
  } else if (nroPlayers === 4) {
    rounds = 15;
    configGame();
  } else if (nroPlayers === 5) {
    rounds = 12;
    configGame();
  } else if (nroPlayers === 6) {
    rounds = 10;
    configGame();
  } else {
    rounds = 0;
    alert('El numero minimo de jugadores es 3 y el numero maximo es 6');
  }
});

function createGame() {
  const section2 = document.getElementById('section2');
  const section3 = document.getElementById('section3');
  const playersContainer = document.getElementById('playersContainer');

  for (let i = 0; i < nroPlayers; i += 1) {
    const div = document.createElement('div');
    div.className = 'item';
    const label = document.createElement('label');
    label.innerHTML = players[i];
    const input = document.createElement('input');
    input.type = 'password';
    input.className = 'prediction';
    div.appendChild(label);
    div.appendChild(input);
    playersContainer.appendChild(div);
  }

  section2.classList.toggle('hide');
  section3.classList.toggle('hide');
  actualRound = 2;
}

document.getElementById('regis').addEventListener('click', () => {
  const aux = document.getElementsByClassName('name');

  for (let i = 0; i < nroPlayers; i += 1) {
    if (aux[i].value === '') {
      players = [];
      alert('Se deben ingresar todos los nombres');
      return;
    }
    players.push(aux[i].value);
  }

  createGame();
});

document.getElementById('check').addEventListener('click', () => {
  const predictions = document.getElementsByClassName('prediction');
  const last = players[players.length - 1];
  let sum = 0;

  for (let i = 0; i < nroPlayers; i += 1) {
    if (predictions[i].value === '') {
      alert('Todos los jugadores deben hacer una prediccion');
      return;
    }
    const aux = Number(predictions[i].value);
    sum += aux;
  }

  if (sum !== actualRound) {
    alert('El turno es valido. ¡A JUGAR!');
  } else {
    alert(`Turno invalido. ${last} debe cambiar el numero`);
    return;
  }

  if (actualRound < rounds) {
    const r = document.getElementById('round');
    actualRound += 1;
    r.innerHTML = `Ronda ${actualRound}`;
    for (let i = 0; i < nroPlayers; i += 1) {
      predictions[i].value = '';
    }
  } else {
    alert('¡Juego Terminado!');
    window.location.assign(window.location.pathname);
  }
});
