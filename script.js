// Baraja de cartas con la nueva convención de nombres
const deck = [
    { name: 'AC', value: 11 }, { name: '2C', value: 2 }, { name: '3C', value: 3 },
    { name: '4C', value: 4 }, { name: '5C', value: 5 }, { name: '6C', value: 6 },
    { name: '7C', value: 7 }, { name: '8C', value: 8 }, { name: '9C', value: 9 },
    { name: '10C', value: 10 }, { name: 'JC', value: 10 }, { name: 'QC', value: 10 },
    { name: 'KC', value: 10 },

    { name: 'AT', value: 11 }, { name: '2T', value: 2 }, { name: '3T', value: 3 },
    { name: '4T', value: 4 }, { name: '5T', value: 5 }, { name: '6T', value: 6 },
    { name: '7T', value: 7 }, { name: '8T', value: 8 }, { name: '9T', value: 9 },
    { name: '10T', value: 10 }, { name: 'JT', value: 10 }, { name: 'QT', value: 10 },
    { name: 'KT', value: 10 },

    { name: 'AP', value: 11 }, { name: '2P', value: 2 }, { name: '3P', value: 3 },
    { name: '4P', value: 4 }, { name: '5P', value: 5 }, { name: '6P', value: 6 },
    { name: '7P', value: 7 }, { name: '8P', value: 8 }, { name: '9P', value: 9 },
    { name: '10P', value: 10 }, { name: 'JP', value: 10 }, { name: 'QP', value: 10 },
    { name: 'KP', value: 10 },

    { name: 'AD', value: 11 }, { name: '2D', value: 2 }, { name: '3D', value: 3 },
    { name: '4D', value: 4 }, { name: '5D', value: 5 }, { name: '6D', value: 6 },
    { name: '7D', value: 7 }, { name: '8D', value: 8 }, { name: '9D', value: 9 },
    { name: '10D', value: 10 }, { name: 'JD', value: 10 }, { name: 'QD', value: 10 },
    { name: 'KD', value: 10 }
];

// Variables para almacenar las cartas y puntuaciones de cada jugador
let player1Cards = [];
let player1Score = 0;
let player2Cards = [];
let player2Score = 0;

// Función para mostrar una carta en pantalla
function displayCard(card, playerCardsId) {
    const cardContainer = document.getElementById(playerCardsId);
    const cardElement = document.createElement('div');
    cardElement.className = 'card';

    // Actualiza la ruta para las imágenes
    cardElement.style.backgroundImage = `url('imagenes/${card.name}.png')`;

    cardContainer.appendChild(cardElement);
}

// Función para obtener una carta aleatoria
function getRandomCard() {
    const randomIndex = Math.floor(Math.random() * deck.length);
    return deck[randomIndex];
}

// Función para actualizar el puntaje
function updateScore(playerCards, playerScoreId) {
    let score = playerCards.reduce((total, card) => total + card.value, 0);
    
    // Ajustar el valor del As si el puntaje supera 21
    let aces = playerCards.filter(card => card.value === 11).length;
    while (score > 21 && aces > 0) {
        score -= 10;
        aces -= 1;
    }

    document.getElementById(playerScoreId).textContent = score;
    return score;
}

// Función para pedir una carta (Jugador 1)
function drawCardPlayer1() {
    const card = getRandomCard();
    player1Cards.push(card);
    displayCard(card, 'player1-cards');
    player1Score = updateScore(player1Cards, 'player1-score');
}

// Función para pedir una carta (Jugador 2)
function drawCardPlayer2() {
    const card = getRandomCard();
    player2Cards.push(card);
    displayCard(card, 'player2-cards');
    player2Score = updateScore(player2Cards, 'player2-score');
}

// Función de enfrentarse
function faceOff() {
    // Actualizar puntajes antes de comparar
    player1Score = updateScore(player1Cards, 'player1-score');
    player2Score = updateScore(player2Cards, 'player2-score');

    if (player1Score > 21 && player2Score > 21) {
        alert("Ambos jugadores se han pasado de 21. Empate.");
    } else if (player1Score > 21) {
        alert("Jugador 1 se ha pasado de 21. Jugador 2 gana.");
    } else if (player2Score > 21) {
        alert("Jugador 2 se ha pasado de 21. Jugador 1 gana.");
    } else if (player1Score > player2Score) {
        alert("Jugador 1 gana con " + player1Score + " puntos.");
    } else if (player2Score > player1Score) {
        alert("Jugador 2 gana con " + player2Score + " puntos.");
    } else {
        alert("Empate.");
    }
}

// Función para reiniciar el juego
function resetGame() {
    // Limpiar cartas y puntuaciones
    player1Cards = [];
    player1Score = 0;
    player2Cards = [];
    player2Score = 0;

    // Limpiar el contenido de las cartas mostradas
    document.getElementById('player1-cards').innerHTML = '';
    document.getElementById('player2-cards').innerHTML = '';

    // Restablecer las puntuaciones mostradas a 0
    document.getElementById('player1-score').textContent = 0;
    document.getElementById('player2-score').textContent = 0;
}

// Asignar funciones a los botones después de que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('player1-draw').addEventListener('click', drawCardPlayer1);
    document.getElementById('player2-draw').addEventListener('click', drawCardPlayer2);
    document.getElementById('face-off').addEventListener('click', faceOff);
    document.getElementById('reset-game').addEventListener('click', resetGame);
});
