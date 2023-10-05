var bg,bgImg;
var player, shooterImg, shooter_shooting, zombie, zombiegroup, bulletImg, bulletgroup, gameover, gameoverImg;
var gameState
var PLAY=1 
var END=0
var score=0
gameState=PLAY
function preload(){
  bulletImg =  loadImage("assets/bullet.png")
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  gameoverImg = loadImage("assets/gameover.png")
  bgImg = loadImage("assets/bg.jpeg")
  zombie = loadImage("assets/zombie.png")
}

function setup() {

bulletgroup = new Group()
zombiegroup = new Group()
  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
 
     player.debug = true
   // player.debug = false
    // player.Debug =false
    // Player.debug = true

   //player.Collider("rectagle",0,0,300,300)
   //player.setcollider("rectangle",0,0)
    player.setCollider("rectangle",0,0,300,300)
  // player.Setcollider("rectangle",0,0,300,300)

  gameover = createSprite(width/2,height/2)
  gameover.addImage("gameoverImg",gameoverImg)
  gameover.visible=false
}

function draw() {
  background(0); 
  
  

if (gameState === PLAY ) {
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   player.y = player.y+30
  }
  
  if(keyWentDown("space")){
     player.addImage(shooter_shooting)
     shoot()
  }
    else if(keyDown("space")){
      
     
       player.addImage(shooterImg)
            
   } 
   spawnZombie()  
   zombiegroup.overlap(bulletgroup,removezombie)
   if (zombiegroup.isTouching(player)){
     gameState=END
   }

}
 else if (gameState === END) {
   gameover.visible=true
   zombiegroup.setVelocityXEach(0)
   zombiegroup.setLifetimeEach(-1)
 }


  





//player goes back to original standing image once we stop pressing the space bar

  


drawSprites();

fill("red")
  textSize(25)
  text("SCORE:"+score,40,40)

}


function spawnZombie() {
if (frameCount%60 === 0) {
  

var zombiesprite = createSprite(width,180)
  zombiesprite.y=random(50,height-100)
  zombiesprite.addImage(zombie)
  zombiesprite.velocityX = -5
  zombiesprite.scale = 0.15
  zombiesprite.lifetime = Math.round(width/5)
  zombiegroup.add(zombiesprite)

}
}

 function shoot() {
   
var   bulletsprite = createSprite(player.x,180)
      bulletsprite.y= player.y
      bulletsprite.addImage(bulletImg)
      bulletsprite.velocityX = +4
      bulletsprite.scale = 0.15
      bulletsprite.lifetime = Math.round(width/5)
      bulletgroup.add(bulletsprite)
    
    
 }

function removezombie(zombie1) {
  zombie1.remove()
  score=score+1
}
























