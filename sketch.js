var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var survivalTime = 0;
var ground;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() 
{
  createCanvas(400, 400);
  
    monkey = createSprite(80,315,20,20);
    monkey.addAnimation("moving",monkey_running);
    monkey.scale = 0.1;
  
    ground = createSprite(400,350,900,10);
    ground.velocityX=-4;
    ground.x=ground.width/2;
  
   FoodGroup = createGroup();
   obstacleGroup = createGroup();
}


function draw() 
{
  background("white");
  text("Survival time : " + survivalTime,10,30);
  stroke("red");
  textSize(15);
  fill("black");
  
  if(ground.x<0)
    {
      ground.x = ground.width/2;
    }
  if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
  } 
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  Spawnbanana();
  
  if(monkey.isTouching(obstacleGroup)){
        gameState = END;
  }
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();  
    survivalTime = survivalTime + 1;
  }
  SpawnObstacles();
  drawSprites(); 
  text("Survival time : "+ survivalTime,180,30);
}
  



function Spawnbanana()
{
  if (frameCount % 60 === 0) 
  {
    banana = createSprite(410,100,20,20);
    banana.y = Math.round(random(100,140));
    banana.addAnimation("banana",bananaImage);
    banana.scale=0.1;
    banana.lifetime = 100; 
    banana.velocityX = -4;
     FoodGroup.add(banana);
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
}
function SpawnObstacles(){
  if(frameCount % 120===0)
  {
  Obstacles = createSprite(280,310,50,50);
  Obstacles.addAnimation("obstacle",obstacleImage);
  Obstacles.scale = 0.2;
  Obstacles.velocityX = -6;
  Obstacles.lifetime = 100; 
  obstacleGroup.add(Obstacles); 
  }

}

