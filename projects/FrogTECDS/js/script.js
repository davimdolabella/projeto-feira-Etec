var canvas = document.getElementById("cnv");
var ctx = canvas.getContext("2d");
var frog = new Image();
var pedra = new Image();
var fundo = new Image();
var gravidade = 0;
var aceleracao = 0.4;
var pontuacao;
var interval;
var floor = (canvas.height / 2) + 100;
var stoneVelocity = 3;

///////////////////
// Mostrar score //
///////////////////

var scoreArr = [];

function updateScore () {
    let maxScoreEl = document.querySelector('#max-score span');
    let minScoreEl = document.querySelector('#min-score span');

    let maxScore;
    let minScore;

    let scoresEl = document.getElementById('score-all');

    scoresEl.innerHTML = '';

    if (scoreArr.length === 0) {
        let liScoreEl = document.createElement('li');
        let text = document.createElement('p');
        text.innerText = "Histórico de pontos vazio.";

        liScoreEl.append(text);
        scoresEl.append(liScoreEl);
    } else {
        scoreArr.forEach((scorePoint) => {
            if (scorePoint >= maxScore || maxScore === undefined) {
                maxScore = scorePoint;
            }

            if (scorePoint <= minScore || minScore === undefined) {
                minScore = scorePoint;
            }

            let liScoreEl = document.createElement('li');
            let text = document.createElement('p');
            text.innerText = scorePoint;
    
            liScoreEl.append(text);
            scoresEl.append(liScoreEl);
        });
    }

    maxScoreEl.innerText = maxScore === undefined ? '' : maxScore; 
    minScoreEl.innerText = minScore === undefined ? '' : minScore;
}

updateScore();

///////////////////////
// Fim mostrar score //
///////////////////////

var posicFrog = {
    x: 15,
    y: (canvas.height / 2) + 100
};

var tamanhoFrog = {
    width: 60,
    height: 60
}

var tamanhoPedra = {
    width: 150,
    height: 150
}

var posicPedra = {
    x: canvas.width + 100,
    y: posicFrog.y - 20
};

var posicFundo = {
    x: 0,
    y: 0
};

function desenhar() { // inicio da função desenhar
    posicPedra.x -= stoneVelocity;
    gravidade += aceleracao;
    if (posicFrog.y < floor) {
        posicFrog.y += gravidade;
    } else {
        posicFrog.y = floor;
    }
    

    ctx.clearRect(0, 0, 288, 512);
    ctx.beginPath();
    ctx.drawImage(fundo, posicFundo.x, posicFundo.y, canvas.width, canvas.height + 10);

    ctx.drawImage(frog, posicFrog.x, posicFrog.y, tamanhoFrog.width, tamanhoFrog.height);
    ctx.drawImage(pedra, posicPedra.x, posicPedra.y - 30, tamanhoPedra.width, tamanhoPedra.height);

    ctx.font = "bold 30px Courier";
    ctx.fillStyle = "yellow";
    ctx.fillText("Pontos: " + Math.trunc(pontuacao), 25, 30);
    ctx.closePath();

    if (posicPedra.x + tamanhoPedra.width < 0) {
        posicPedra.x = canvas.width + 50;
        posicPedra.y = posicFrog.y - 20;

        if (stoneVelocity + 1 <= 10) {
            stoneVelocity++;
        }
    }

    pontuacao += 0.1

    colisao();
} // fim da função desenhar

function start() { // inicio da função start

    addEventListener('keydown', handleKeyDown)

    frog.src = "img/frog.png";
    pedra.src = "img/stone.png";
    fundo.src = "img/fundo.jpg";
    pontuacao = 0;

    interval = setInterval(desenhar, 20);
} // fim da função start

function colisao() {

    // Colisão sapo e pedra

    if (
        posicFrog.x + tamanhoFrog.width >= posicPedra.x + 20 &&
        posicFrog.x <= posicPedra.x + tamanhoPedra.width - 20 &&
        posicFrog.y + tamanhoFrog.height >= posicPedra.y + 20 &&
        posicFrog.y <= posicPedra.y + tamanhoPedra.height - 20
    ) {
        gameOver();
        setTimeout(restartGame, 3000);
    }

    if (posicFrog.y <= 0) {
        posicFrog.y = 0;
    }

} // fim da função colisao()

function gameOver () {
    ctx.beginPath();

    ctx.font = "bold 50px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("GAME OVER!", 190, (canvas.height / 2));

    ctx.fillStyle = "orange";
    ctx.fillText("Sua pontuação: " + Math.trunc(pontuacao), 150, (canvas.height / 2) + 50);

    ctx.closePath();

    clearInterval(interval);
}

function restartGame () {
    posicFrog = {
        x: 15,
        y: (canvas.height / 2) + 100
    };
    
    tamanhoFrog = {
        width: 60,
        height: 60
    }
    
    tamanhoPedra = {
        width: 150,
        height: 150
    }
    
    posicPedra = {
        x: canvas.width + 100,
        y: posicFrog.y - 20
    };

    stoneVelocity = 3;

    removeEventListener("keydown", handleKeyDown);

    scoreArr.push(Math.trunc(pontuacao));
    updateScore();

    start();
}

///////////////////////////////
// Funções para mover o sapo //
///////////////////////////////

function impulso() {
    gravidade = -10;
    posicFrog.y += gravidade;
}

function irDireita () {
    if (posicFrog.x + tamanhoFrog.width + 3  < canvas.width) {
        posicFrog.x += 3;
    }
}

function irEsquerda() {
    if (posicFrog.x - 3 > 0) {
        posicFrog.x -= 3
    }
}

function handleKeyDown (e) {
    if (e.key === "ArrowRight") {
        irDireita();
    }

    if (e.key === "ArrowLeft") {
        irEsquerda();
    }

    if (e.key === "ArrowUp") {
        impulso();
    }
}