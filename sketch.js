var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running;

var banana, bananaImage, obstacle, obstacleImage;

var foodGroup, obstacleGroup;

var score;

var ground, groundImage, invisibleGround;

var survivalTime = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(400, 400);

  ground = createSprite(400, 350, 800, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.shapeColor = "gray";

  monkey = createSprite(100, 320, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  obstacleGroup = createGroup();
  foodGroup = createGroup();

  //obstacle = createSprite(200,320,10,10);
  //obstacle.addImage(obstacleImage);
  //obstacle.scale = 0.15;

}


function draw() {
  background("white");
    
  if (gameState === PLAY) {

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && monkey.y >= 250) {
      monkey.velocityY = -14;
    }

    if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
    }
    
    if(monkey.isTouching(obstacleGroup)){
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();  
    gameState = END;  
    }
    
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  textAlign(CENTER, CENTER);
  text("Survival Time >> "+survivalTime, 200, 50);    
    
    spawnObstacle();
    spawnFood();

  }
  
  else if(gameState === END){
    fill("black");
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Game Over", 200, 200);
    
    ground.velocityX = 0;
  }

  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);

  drawSprites();
}

function spawnObstacle() {
 if(frameCount % 300 === 0){
  obstacle = createSprite(400,330,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.1; 
  obstacle.velocityX = -5;
   
   obstacle.lifetime = 200;
   
   obstacleGroup.add(obstacle); 
 }
}

function spawnFood(){
 if(frameCount % 80 === 0){
  banana = createSprite(400,220,10,10);
  banana.addImage(bananaImage);
   
   banana.y = Math.round(random(120,200));
   
  banana.scale = 0.1;
  banana.velocityX = -5;
   
   banana.lifetime = 200;
   
   foodGroup.add(banana);  
 }
}
