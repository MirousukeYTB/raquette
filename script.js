const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Dimensions du canvas
canvas.width = 800;
canvas.height = 600;

// Joueur et ordinateur
const player = {
    x: 10,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: '#ffcc00',
    dy: 0,
    speed: 8,
    score: 0
};

const computer = {
    x: canvas.width - 20,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: '#ff0000',
    dy: 0,
    speed: 5,
    score: 0
};

// Balle
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    dx: 5,
    dy: 5,
    color: '#00ff00'
};

// Fonction pour dessiner les raquettes
function drawPaddle(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

// Fonction pour dessiner la balle
function drawBall(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

// Fonction pour afficher le score
function drawScore() {
    ctx.font = '32px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText(`Joueur: ${player.score}`, 20, 40);
    ctx.fillText(`Ordinateur: ${computer.score}`, canvas.width - 250, 40);
}

// Mettre à jour la position de la balle
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Rebondir sur les murs supérieur et inférieur
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Détection de collision avec les raquettes
    if (
        ball.x - ball.radius < player.x + player.width &&
        ball.y > player.y &&
        ball.y < player.y + player.height
    ) {
        ball.dx *= -1;
    }

    if (
        ball.x + ball.radius > computer.x &&
        ball.y > computer.y &&
        ball.y < computer.y + computer.height
    ) {
        ball.dx *= -1;
    }

    // Détection de sortie de balle (gauche ou droite)
    if (ball.x + ball.radius < 0) {
        computer.score++;
        resetBall();
    }

    if (ball.x - ball.radius > canvas.width) {
        player.score++;
        resetBall();
    }
}

// Remettre la balle au centre après un point
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
}

// Mettre à jour la position des raquettes
function updatePaddles() {
    // Mettre à jour la raquette du joueur
    player.y += player.dy;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;

    // Mettre à jour la raquette de l'ordinateur (IA basique)
    if (ball.y > computer.y + computer.height / 2) {
        computer.y += computer.speed;
    } else {
        computer.y -= computer.speed;
    }
}

// Fonction pour dessiner tout
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(player.x, player.y, player.width, player.height, player.color);
    drawPaddle(computer.x, computer.y, computer.width, computer.height, computer.color);
    drawBall(ball.x, ball.y, ball.radius, ball.color);
    drawScore();
}

// Mettre à jour le jeu
function update() {
    updateBall();
    updatePaddles();
}

// Fonction principale du jeu
function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

// Contrôler la raquette du joueur
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        player.dy = -player.speed;
    } else if (e.key === 'ArrowDown') {
        player.dy = player.speed;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        player.dy = 0;
    }
});

// Lancer le jeu
gameLoop();
// Obtenez le canvas et le contexte
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Dimensions du canvas
canvas.width = 800;
canvas.height = 600;

// Joueur et ordinateur
const player = {
    x: 10,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: '#ffcc00',
    dy: 0,
    speed: 8,
    score: 0
};

const computer = {
    x: canvas.width - 20,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: '#ff0000',
    dy: 0,
    speed: 5,
    score: 0
};

// Balle
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    dx: 5,
    dy: 5,
    color: '#00ff00'
};

// Dessine une raquette
function drawPaddle(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

// Dessine la balle
function drawBall(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

// Affiche le score
function drawScore() {
    ctx.font = '32px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText(`Joueur: ${player.score}`, 20, 40);
    ctx.fillText(`Ordinateur: ${computer.score}`, canvas.width - 250, 40);
}

// Met à jour la position de la balle
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Rebondir sur les murs supérieur et inférieur
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Détection de collision avec les raquettes
    if (
        ball.x - ball.radius < player.x + player.width &&
        ball.y > player.y &&
        ball.y < player.y + player.height
    ) {
        ball.dx *= -1;
    }

    if (
        ball.x + ball.radius > computer.x &&
        ball.y > computer.y &&
        ball.y < computer.y + computer.height
    ) {
        ball.dx *= -1;
    }

    // Détection de sortie de balle (gauche ou droite)
    if (ball.x + ball.radius < 0) {
        computer.score++;
        resetBall();
    }

    if (ball.x - ball.radius > canvas.width) {
        player.score++;
        resetBall();
    }
}

// Remettre la balle au centre après un point
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
}

// Met à jour la position des raquettes
function updatePaddles() {
    player.y += player.dy;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;

    // Mouvement basique de l'ordinateur
    if (ball.y > computer.y + computer.height / 2) {
        computer.y += computer.speed;
    } else {
        computer.y -= computer.speed;
    }
}

// Fonction pour dessiner tous les éléments
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(player.x, player.y, player.width, player.height, player.color);
    drawPaddle(computer.x, computer.y, computer.width, computer.height, computer.color);
    drawBall(ball.x, ball.y, ball.radius, ball.color);
    drawScore();
}

// Mettre à jour le jeu
function update() {
    updateBall();
    updatePaddles();
}

// Boucle principale du jeu
function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

// Contrôles du joueur
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        player.dy = -player.speed;
    } else if (e.key === 'ArrowDown') {
        player.dy = player.speed;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        player.dy = 0;
    }
});

// Lancer le jeu
gameLoop();
