// creating Variables.
var bg, backgroundImg ;
var stone ;
var stoneGroup;
var diamondGroup;
var spikeGroup;
var diamondCollected = 0;
var gameState = "PLAY";
// Loading Assets. 
function preload() {

  // loading Animations
  bgAnimation  = loadAnimation("images/bg.jpg","images/bg.jpg","images/bg.jpg");
  
  // loading Images
  ironImg      = loadImage("images/iron.png");
  stoneImage   = loadImage("images/stone.png");
  diamondImage = loadImage("images/diamond.png");
  spikeImage   = loadImage("images/spikes.png");
  restartImage = loadImage("images/restart.png")
}

function setup() {
  createCanvas(1000, 500);
  // Creating Bg Sprite.
  bg   = createSprite(300,300,300,300);
  bg.addAnimation("bgAnimation",bgAnimation);
  bg.scale = 2;
  // creating IronMan Sprite.
  iron = createSprite(100,450);
  iron.addImage(ironImg);
  iron.scale = 0.3;
  // creating Bg Velocity.
  bg.velocityY = 4;
  // creating Edge Sprites.
  edges=createEdgeSprites();
  // Creating Iron Not To Cross Top And Not To Go Out of area
  above = createSprite(40,-20,2000,20);
  
  // creating Restart Sprite
  restart = createSprite(800,100,40,40);
  restart.addImage(restartImage);
  restart.scale = 0.4; 
  
  // Defining Groups.
  stoneGroup   = new Group();
  diamondGroup = new Group();
  spikeGroup   = new Group()
}

function draw() {
  background('black');
  if(gameState == "PLAY"){
    restart.visible = false;
    // Making Iron Bounce Off Edges but not top.  
    iron.bounceOff(edges[0]);
    iron.bounceOff(edges[1]);
    iron.bounceOff(edges[3]);
    // Making BG Come Down After A point.
    if(bg.y > 750 ){
      bg.y = 0;
    }
    // making Iron To Move.
    if (keyDown("up")){
      iron.y = iron.y -18 ;
    }
    if (keyDown("down")){
      iron.y = iron.y +18 ;
    }
    if (keyDown("left")){
      iron.x = iron.x -18 ;
    }
    if (keyDown("right")){
      iron.x = iron.x +18 ;
    }
    // Making Iron Colliding With Stone.
    for( var i = 0 ; i<stoneGroup.length; i++){
      var temp = (stoneGroup).get(i);
      if(temp.isTouching(iron)){
          iron.collide(temp);
      }
  }
    // Adjusting Collider.
    iron.setCollider("rectangle",100,-60,180,400);
    // Adding Diamonds To Game.  
    for(var i = 0 ; i<diamondGroup.length ; i++){
      var temp = (diamondGroup).get(i);
      if(temp.isTouching(iron)){
        temp.destroy();
        diamondCollected ++;
      }
    }
    // Adding Spikes To Game
    for(var i  = 0 ; i<spikeGroup.length ; i++){
      var temp = (spikeGroup).get(i);
      if(temp.isTouching(iron)){
        // Decreasing Scores if Touching Spikes.
        diamondCollected -- ;
        diamondCollected -- ;
        diamondCollected -- ;
        diamondCollected -- ;
        diamondCollected -- ;
        temp.destroy()
      }
    }
    
  if(diamondCollected < -9){
    gameState = "END";
  }
  if(iron.isTouching(above)){
    gameState = "END";
  }
    generateDiamonds();
    generateStones();
    generateSpikes();
    drawSprites();   
  }
  else if(gameState == "END"){
    restart.visible = true;   
    bg.velocityY = 0;
    diamondGroup.setVelocityYEach(0);
    stoneGroup.setVelocityYEach(0);
    spikeGroup.setVelocityYEach(0);
    diamondGroup.setLifetimeEach(-1);
    stoneGroup.setLifetimeEach(-1);
    spikeGroup.setLifetimeEach(-1);  
    if(mousePressedOver(restart)){
      restartGame();
   } 
}  
  // adding text to Count Diamonds.
  textSize(20);
  stroke("#fff");
  text("diamonds Collected : " + diamondCollected,730,50);
}
// Creating function for Stones
function generateStones(){
  if(frameCount%100 == 0){
    // creating Stone Sprites
    stone = createSprite(random(150,1000),0,40,10);
    stone.addImage(stoneImage)
    stone.scale = 0.6;
    stone.velocityY = 4;
    // creating Lifetime To Avoid Memory task.
    stone.lifetime = 350;
    stoneGroup.add(stone);
  }
}
function generateDiamonds(){
  if(frameCount%40 == 0){
    // creating Sprite For Diamond.
    diamond = createSprite(random(150,1000),0,40,10);
    diamond.addImage(diamondImage);
    diamond.scale = 0.5;
    diamond.velocityY = 4;
    // creating Lifetime To Avoid Memory task.
    diamond.lifetime = 350;
    diamondGroup.add(diamond);
  }
}
// creating Function For Sprites.
function generateSpikes(){
  if(frameCount%90 == 0){
    // creating Sprite For Spikes.  
    spikes = createSprite(random(150,1000),0,40,10);
    spikes.addImage(spikeImage);
    spikes.scale = 0.5;
    spikes.velocityY = 4;
    // creating Lifetime To Avoid Memory task.
    spikes.lifetime = 350;
    spikeGroup.add(spikes);
  }
}
function restartGame(){
  gameState = "PLAY";
  diamondCollected = 0;
  diamondGroup.destryEach();
  stoneGroup.destryEach();
  spikeGroup.destryEach();
}