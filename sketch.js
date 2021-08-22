score=0;
gamestate="play";
var bg, backgroundImg;

function preload() {
  backgroundImg = loadImage("images/space.jpeg");
  playerImg = loadImage("images/iron.png");
  stoneImg = loadImage("images/stone.png");
  diamondImg= loadImage("images/diamond.png");
  spikesImg=loadImage("images/spikes.png");
  restartImg=loadImage("images/restart.png");
  stoneGroup=new Group();
  diamondGroup=new Group();
  spikesGroup=new Group();
}

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(1000,300);
  bg.addImage(backgroundImg);
  
  player=createSprite(500,500,20,40);
  player.addImage(playerImg);
  
  ground=createSprite(500,600,1000,10);

  restart=createSprite(500,300,200,50);
  restart.addImage(restartImg);
}

function draw() {
  if(gamestate=="play"){
    //making Restart invisible
    restart.visible=false;

    //giving velocity to background
    bg.velocityY=5;
    bg.scale=2;

    //giving velocity to player
    player.scale=0.3;
    player.debug=true;

    //not letting player to fell down
    player.collide(ground);
    //giving the velocity to palyer witha arrow keys 
    if(keyDown("up")){
      player.velocityY=-10;
    }
    if(keyDown("left")){
      player.x=player.x-5;
    }
    if(keyDown("right")){
      player.x=player.x+5;
    }
    //giving gravity to player
    player.velocityY=player.velocityY+0.7;
    
    //giving velocity to background
    if(bg.y>700)
    {
        bg.y=100;
    }
    //generating stones
    genreateStones();
    for(var i = 0 ; i< (stoneGroup).length ;i++){
      var temp = (stoneGroup).get(i);
      if (player.isTouching(temp)) {
        player.collide(temp);
        temp=null;
        }   
      }
    
    //generating diamonds
    generateDiamonds();
    for(var i = 0 ; i< (diamondGroup).length ;i++){
      var temp = (diamondGroup).get(i) ;
      if (player.isTouching(temp)) {
        temp.destroy();  
        temp=null;
        score=score+1;
        }   
      }
    
    //generating spikes
    generateSpikes();
    for(var i=0 ; i<(spikesGroup).length ;i++){
      var temp = (spikesGroup).get(i) ;
      if (player.isTouching(temp)) {
        temp.destroy();  
        temp=null;
        score=score-5;
        }   
    }
    if(score<=-10 || player.y>610 || player.y>660){
      gamestate="end";
    }
}
//when gamestate changes to "end"
if(gamestate=="end"){
  //condition after gamestate changes to "end"
  bg.velocityY=0;
  player.velocityX=0;
  player.velocityY=0;
  diamondGroup.setVelocityYEach(0);
  spikesGroup.setVelocityYEach(0);
  stoneGroup.setVelocityYEach(0);
  diamondGroup.setLifetimeEach(-1);
  spikesGroup.setLifetimeEach(-1);
  stoneGroup.setLifetimeEach(-1);
  restart.visible=true;
  //making restart button
  if(mousePressedOver(restart)){
    gamestate="play";
    score=0;
    restartGame();
    if(player.y>660){
      player.x=500;
      player.y=500;
    }
  }
}
    drawSprites();
    //score board
    textSize(20);
    fill("green")
    text("Your score is" + score,500,100);
}

//creating stones and giving properties
function genreateStones(){
  if (frameCount% 60 == 0){
    stone=createSprite(random(100,800),50,40,20);
    stone.velocityY=6;
    stone.addImage(stoneImg);
    stoneGroup.add(stone);
    stone.lifetime=250;
  }
}
//creating diamonds and giving properties
function generateDiamonds(){
  if(frameCount%35 == 0){
     diamond=createSprite(random(100,800),50,50,50);
     diamond.scale=0.7;
     diamond.velocityY=random(5,7);
     diamond.addImage(diamondImg);
     diamondGroup.add(diamond);
     diamond.lifetime=250;
  }
}
//creating spikes and giving properties
function generateSpikes(){
  if(frameCount%40== 0){
    spikes=createSprite(random(100,800),50,50,50);
    spikes.scale=0.6;
    spikes.velocityY=random(5,9);
    spikes.addImage(spikesImg);
    spikesGroup.add(spikes);
    spikes.lifetime=250;
  }
}

function restartGame(){
  stoneGroup.destroyEach();
  diamondGroup.destroyEach();
  spikesGroup.destroyEach();
}