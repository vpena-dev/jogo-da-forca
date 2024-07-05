const wordList = [
  'cachorro',
  'gato',
  'pato',
  'capivara',
  'mosquito',
  'besouro',
  'leao',
  'girafa',
];

let chosenWord;
let wordDisplay;
let kickedLetters;
let remainingAttempt;
let numErrors;

function startGame() {
  document.getElementById('btn-restart').style.display = 'none';
  document.getElementById('input-letter').style.display = 'inline';
  document.getElementById('btn-kick').style.display = 'inline';

  // ESCOLHE UMA PALAVRA ALEATORIAMENTE
  chosenWord = wordList[Math.floor(Math.random() * wordList.length)];

  // INICIA A EXIBIÇÃO COM AS UNDERLINES "_"
  wordDisplay = Array(chosenWord.length).fill('_');

  // INICIALIZA A LISTA DE PALAVRAS CHUTADAS
  kickedLetters = [];

  // DEFINIR O NÚMERO MÁXIMO DE TENTARIVAS
  remainingAttempt = 7;

  // INICIALIZA O NÚMERO DE ERROS
  numErrors = 0;

  updateDisplay();
}

function updateDisplay() {
  document.getElementById('word-display').innerText = wordDisplay.join(' ');
  document.getElementById('kicked-letters').innerText = `${kickedLetters.join(
    ', '
  )}`;
  document.getElementById('message').innerText = '';
  document.getElementById('image').src = `img/forca${numErrors}.png`;

  // VERIFICAR SE O JOGO TERMINOU
  if (remainingAttempt === 0) {
    document.getElementById('message').style.color = 'red';
    finishGame('VOCÊ MORREU!');
  } else if (!wordDisplay.includes('_')) {
    document.getElementById('message').style.color = 'greenyellow';
    finishGame('PARABÉNS! VOCÊ VENCEU!');
  }
}

function kickLetter() {
  const inputLetter = document.getElementById('input-letter');
  const letter = inputLetter.value.toLowerCase();

  if (!letter.match(/[a-zà-ùç]/i)) {
    alert('Por favor, insira uma letra válida.');
    return;
  }

  if (kickedLetters.includes(letter)) {
    alert('Você já tentou esta letra. Tente outra!');
    return;
  }
  console.log(letter);
  kickedLetters.push(letter);

  if (chosenWord.includes(letter)) {
    for (let i = 0; i < chosenWord.length; i++) {
      if (chosenWord[i] === letter) {
        console.log('foi ' + letter);
        wordDisplay[i] = letter;
      }
    }
  } else {
    remainingAttempt--;
    numErrors++;
  }

  inputLetter.value = '';

  updateDisplay();
}

function finishGame(message) {
  // DESABILITAR O CAMPO DIGITAÇÃO
  document.getElementById('input-letter').style.display = 'none';
  document.getElementById('btn-kick').style.display = 'none';

  // EXIBIR A MENSAGEM
  document.getElementById('message').style.display = 'block';
  document.getElementById('message').innerText = message;

  // EXIBIR O BOTÃO REINICIAR
  document.getElementById('btn-restart').style.display = 'block';
}

window.load = startGame();
