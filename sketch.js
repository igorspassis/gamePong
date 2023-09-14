//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let velocidadeYOponente;

//caracteristicas da raquete
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis da raquete1 (Esquerda)
let xRaquete1 = 5;
let yRaquete1 = 150;

//variáveis da raquete2 (Direita)
let xRaquete2 = 585;
let yRaquete2 = 150;

//verificando colisão
let colidiu = false

//placar do jogo
let pontos1 = 0;
let pontos2 = 0;

//chance do oponente errar só no modo de raquete AUTOMATICO
let chanceDeErrar = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  
  mostraBolinha();
  movimentaBolinha();
  
  verificaColisaoBorda();
  
  mostraRaquete(xRaquete1, yRaquete1);
  mostraRaquete(xRaquete2, yRaquete2);
  
  movimentaRaquete1();
  movimentaRaquete2Auto();
  //movimentaRaquete2Multplayer()
  
  verificaColisaoRaquete(xRaquete1, yRaquete1);
  verificaColisaoRaquete(xRaquete2, yRaquete2);
  
  incluiPlaca();
  marcaPonto();
  
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}


function verificaColisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= - 1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= - 1;
  }
}

function mostraRaquete(x, y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

//movimentando a raquete da direita com as teclas W e S
function movimentaRaquete1(){
  if (keyIsDown(87)){
    yRaquete1 -= 10;
  }
  if (keyIsDown(83)){
    yRaquete1 += 10;
  }
}

//Raquete do oponente automatica
function movimentaRaquete2Auto(){
  velocidadeYOponente = yBolinha - yRaquete2 - raqueteComprimento / 2 - 30;
  yRaquete2 += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

//Raquete para multiplayer (movimento pelas setas)
function movimentaRaquete2Multplayer(){
 if (keyIsDown(UP_ARROW)){
    yRaquete2 -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete2 += 10;
  }
}

function verificaColisaoRaquetes(){
  if (xBolinha - raio < xRaquete1 + raqueteComprimento && yBolinha - raio < yRaquete1 + raqueteAltura && yBolinha + raio > yRaquete1) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function incluiPlaca() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20, 50);
  fill(255);
  text(pontos1, 170, 26);
  
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20, 50);
  fill(255);
  text(pontos2, 470, 26);
}

function marcaPonto() {
  if (xBolinha > 590) {
    pontos1 += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    pontos2 += 1;
    ponto.play();
  }
}

function calculaChanceDeErrar() {
  if (pontos2 >= pontos1) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}