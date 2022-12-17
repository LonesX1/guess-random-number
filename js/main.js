const input = document.getElementById('guessed_number');
const size = document.getElementById('size');
const textTry = document.getElementById('try');
const buttonStart = document.getElementById('start_game')
const attemptsActive = document.getElementById('attempts');
const recordOn = document.getElementById('record');
const nextLvl = document.getElementById('next');
const stayAtThisLvl = document.getElementById('no');
let attempts = 3;
let record = 0;

const closeNextLvlMenu = () => {
    nextLvl.classList.remove('active')
}

stayAtThisLvl.addEventListener('click', closeNextLvlMenu);

const getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

let randomNumber = getRandomArbitrary(1, 50);

const reloadGame = () => {
    randomNumber = getRandomArbitrary(1, 50);

    console.log(randomNumber)

    buttonStart.innerHTML = 'Start game :)';
    textTry.innerHTML = 'Guess size from 1 to 50';
    textTry.style.color = 'white'
    attempts = 3;
    attemptsActive.innerHTML = attempts;
    size.innerHTML = '???';

    document.querySelector('body').style.background = '#e63946';
    buttonStart.removeEventListener('click', reloadGame);
    buttonStart.addEventListener('click', guessRandomNumber)
}

const saveToLocalStorage = () => {
        localStorage.setItem('record', record);
}
const getFromLocalStorage = () => {
    const reference = localStorage.getItem('record');

    if (reference) {
        recordOn.innerHTML = parseInt(reference);
        record = parseInt(reference);
    }
}

const guessRandomNumber = () => {
    if (input.value == randomNumber) {
        size.innerHTML = randomNumber;
        textTry.innerHTML = 'Yes, you guess my size, i`am happy :)';
        textTry.style.color = 'lime'
        record += 1;
        saveToLocalStorage();
        console.log(localStorage.getItem('record'))
        buttonStart.innerHTML = 'Start over';
        recordOn.innerHTML = record;
        document.querySelector('body').style.background = '#39e661';

        nextLvl.classList.add('active');
        input.value = 0;
        buttonStart.removeEventListener('click', guessRandomNumber);
        buttonStart.addEventListener('click', reloadGame);
    
        saveToLocalStorage();
    } else if (input.value > randomNumber) {
        textTry.innerHTML = 'Your number its bigger then my :(';
        textTry.style.color = 'red';
        attempts--;
        input.value = 0;
    } else {
        textTry.innerHTML = 'Your number its smallest than my :)';
        textTry.style.color = 'red';
        attempts--;
        input.value = 0;
    }

    attemptsActive.innerHTML = attempts;

    if (attempts === 0 ) {
        textTry.innerHTML = 'You lose this game :(';
        textTry.style.color = 'red';

        buttonStart.innerHTML = 'Start over';
        
        buttonStart.removeEventListener('click', guessRandomNumber);
        buttonStart.addEventListener('click', reloadGame);
    }
};


buttonStart.addEventListener('click', guessRandomNumber);


getFromLocalStorage();
console.log(randomNumber)