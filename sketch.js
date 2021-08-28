var PLAY=1;
var END=0;
var gameState=PLAY;
var bG, bGImg, bG1, bG1Img;
var ship,shipImg;
var ob, ob1, ob2, ob3, obstacleGroup;
var score=0, highscore=0;
var dv1, dv2;
var go, goImg;


function preload(){
bGImg= loadImage("background.png");
bG1Img= loadImage("background.png");
shipImg= loadImage("ufo.png");
ob1= loadImage("rocks.png");
ob2= loadImage("rock1.png");
ob3= loadImage("rock2.png");
goImg= loadImage("go.png")
}

function setup() {
  createCanvas(300, 500);
 bG = createSprite(150, 250)
 bG.velocityY=3;
 bG.addImage(bGImg)
 bG1 = createSprite(150, -249)
 bG1.velocityY=3;
 bG1.addImage(bG1Img)
 ship = createSprite(150, 450)
 ship.addImage(shipImg);
 ship.scale=0.15;
 dv1=createSprite(35, 250, 5, 500)
 dv2=createSprite(265, 250, 5, 500)
 dv1.visible=false;
 dv2.visible=false;
 obstacleGroup = new Group();
 go=createSprite(145, 255, 100, 100)
 go.addImage(goImg)
 go.scale=0.5;
 go.visible=false;
 score=score+1;
 
}

function draw() {
 background("red");

 if(ship.isTouching(obstacleGroup)){
  gameState = END; 
}


 

 if(gameState===PLAY){

  if (bG.y>750){
    bG.y=bG1.y-499;
    }
  if (bG1.y>750){
    bG1.y=bG.y-499;
    go.visible=false;
  }

  bG.velocityY = (3 + score/1000);
  bG1.velocityY = (3 + score/1000);
    movement();
  
    spawnObstacles(); 
    score = score + Math.round(frameCount/60); 

    
    if(score>highscore){
highscore=score
    }
    
  
    ship.bounceOff(dv1);
    ship.bounceOff(dv2);
  
 }
 

   if(gameState===END){
bG.velocityY=0;
bG1.velocityY=0;
obstacleGroup.setVelocityYEach(0);
obstacleGroup.destroyEach();
score=score+0
go.visible=true;
ship.x=150;
score=score+0;

   }
 
   drawSprites();
    
   
   textSize(17);
   fill("white");
   text("Score:"+score, 50, 40)
   text("High Score:"+highscore, 50, 70)
 
 
}
function movement(){
if(keyDown(LEFT_ARROW)){
ship.x=ship.x-3;
}
if(keyDown(RIGHT_ARROW)){
ship.x=ship.x+3;
}

}
function spawnObstacles(){
  if (frameCount % 60 === 0){
    ob = createSprite(150,-50,10,40);
    ob.velocityY = 3;
    ob.x=Math.round(random(50, 230))
   ob.scale=0.17;
    obstacleGroup.add(ob);
    ob.velocityY = (3 + score/1000);
 

      var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: ob.addImage(ob1);
              break;
      case 2: ob.addImage(ob2);
              break;
      case 3: ob.addImage(ob3);
              break;
      default: break;
    }
      
    }
    if(obstacleGroup.isTouching(ship)){
      gameState=END;
      console.log(gameState)
    
     //assign scale and lifetime to the obstacle           
     ob.lifetime = 500;
   
    
  }
 }

 

