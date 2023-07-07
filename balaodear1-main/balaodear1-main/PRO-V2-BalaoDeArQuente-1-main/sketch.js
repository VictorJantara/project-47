var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop, obsTop1, obsTop2
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3
var TopGroup, BottomGroup, barraGroup;
var score = 0;

function preload(){
bgImg = loadImage("assets/bg.png");
balloonImg = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png");
obsBottom1 = loadImage("assets/obsBottom1.png");
obsBottom2 = loadImage("assets/obsBottom2.png");
obsBottom3 = loadImage("assets/obsBottom3.png");
obsTop1 = loadImage("assets/obsTop1.png");
obsTop2 = loadImage("assets/obsTop2.png");

}

function setup(){

//imagem de plano de fundo
bg = createSprite(165, 485, 1, 1);
bg.addImage("background", bgImg);
bg.scale = 1.3;
//criando canto superior e inferior
bottomGround = createSprite(200, 390, 800, 20);
topGround = createSprite(200, 10, 800, 20);
bottomGround.visible = false;
topGround.visible = false;
balloon = createSprite(100, 200, 20, 50);
balloon.addAnimation("balão", balloonImg);
balloon.scale = 0.2;
      
//criando o balão     
TopGroup = new Group();
BottomGroup = new Group();
barraGroup = new Group();


}

function draw() {
  
  background("black");
        if(gameState == PLAY){
          //fazendo o balão de ar quente pular
          if(keyDown("space")) {
            balloon.velocityY = -6;
          }

          //adicionando gravidade
          bar()
          balloon .velocityY = balloon.velocityY + 2.0
          spawnObstaclesTop()
          spawnObstaclesBottom()
          if(TopGroup.isTouching(balloon) || BottomGroup.isTouching(balloon) || topGround.isTouching(balloon) || bottomGround.isTouching(balloon)) {

          gameState = END

          } 
        } if(gameState == END){

          balloon.velocityX = 0;
          balloon.velocityY = 0;
          balloon.y = 200;
        }
        drawSprites();
        Score();
      }     
function spawnObstaclesTop(){

  if(frameCount % 60 === 0) {
   
    obstacleTop = createSprite(400, 50, 40, 50);
    //obstacle.debug = true;
    obstacleTop.velocityX = -4
    obstacleTop.y = Math.round(random(10, 100));
    //gere um obstáculo aleatório
    var rand = Math.round(random(1,2));
    switch(rand) {
     
      case 1: obstacleTop.addImage(obsTop1);
              break;
      case 2: obstacleTop.addImage(obsTop2);
              break;
 
      default: break;
    }
    
    //designe o escalonamento e tempo de vida ao obstáculo           
    obstacleTop.scale = 0.1;
    obstacleTop.lifetime = 100;

    balloon.depth = obstacleTop.depth;
    balloon.depth = balloon.depth + 1;

    TopGroup.add(obstacleTop);
  }
}

function spawnObstaclesBottom(){

  if(frameCount % 60 === 0) {
   
    obstacleBottom = createSprite(400, 350, 40, 50);
    //obstacle.debug = true;
    obstacleBottom.velocityX = -4
    //gere um obstáculo aleatório
    var rand = Math.round(random(1,3));
    switch(rand) {
     
      case 1: obstacleBottom.addImage(obsBottom1);
              break;
      case 2: obstacleBottom.addImage(obsBottom2);
              break;
      case 3: obstacleBottom.addImage(obsBottom3);
              break; 

      default: break;
    }
    
    //designe o escalonamento e tempo de vida ao obstáculo           
    obstacleBottom.scale = 0.07;
    obstacleBottom.lifetime = 100;

    balloon.depth = obstacleBottom.depth;
    balloon.depth = balloon.depth + 1;

    BottomGroup.add(obstacleBottom);
  }
}
function bar(){

  if(frameCount % 60 === 0) {
   
    var barra = createSprite(400, 200, 10, 800);
    //obstacle.debug = true;
    barra.velocityX = -6
    //gere um obstáculo aleatório
    barra.lifetime = 66;

   barra.visible = false;

    balloon.depth = barra.depth;
  

    barraGroup.add(barra);
    }
}
function Score(){
  
if(balloon.isTouching(barraGroup))
{
score = score + 1;
}
textFont("algerian");
textSize(30);
fill("yellow");
text("Pontuação:" + score, 230, 50);
}