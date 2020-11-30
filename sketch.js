var towerImg, tower;
var doorImg, doorGroup;
var climberImg, climberGroup;
var ghostImg, ghost;
var invisibleBlock, invisibleBlockGroup;

var gameState = "play";
var spookySound;

function preload() {
  towerImg = loadImage("tower.png")
  doorImg = loadImage("door.png")
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 2;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
}

function draw() {
  background(0);
  
  if(gameState === "play") {
    
    spookySound.loop();
  
  if(tower.y > 400){
    tower.y = 300;
  }
  
  if(keyDown("space")) {
    ghost.velocityY = -10;
  }
  
  if(keyDown("left_arrow")) {
    ghost.x = ghost.x - 3;
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3;
  }
    
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(climberGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    gameState = "end";
  }
    spawnDoors();
    drawSprites();
  
  }
  if(gameState === "end") {
    stroke("yellow");
    fill("red");
    textSize(35);
    text("Game Over", 230,350);
  }
  
  
}

function spawnDoors() {
  if(frameCount % 240 === 0){
    var door = createSprite(200,-50)
    door.addImage(doorImg);
    door.x = Math.round(random(120,400))
    door.velocityY = 2;
    door.lifetime = 600;
    
    doorGroup.add(door);
    
    var climber =  createSprite(200,10);
    climber.addImage(climberImg);
    climber.x = door.x;
    climber.velocityY = 2;
    climber.lifetime = 600;
    
    climberGroup.add(climber);
    
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocitY = 2;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}