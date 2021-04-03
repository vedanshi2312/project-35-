var bgimg;
var balloon,balloonImg;
var database;
var position;

function preload(){
  bgimg = loadImage("Hot Air Ballon-01.png");
  balloonImg = loadAnimation("Hot Air Ballon-02.png" , "Hot Air Ballon-03.png" , "Hot Air Ballon-04.png");
}
function setup() {
  createCanvas(1535,650);
  balloon  = createSprite(160, 400, 50, 50);
  balloon.addAnimation("balloonFlying",balloonImg);

  database = firebase.database();
  var balloonPosRef = database.ref("balloon/position");
  balloonPosRef.on("value",readB);
}

function draw() {
  background(bgimg);
  textSize(20);
  text("**Use Arrow Keys To Move the Hot Air Balloon",40,50);
  if (keyDown(UP_ARROW)){
    balloon.y = balloon.y - 5;
    balloon.scale = balloon.scale - 0.01;
    updatePosition(0,-5);
  }

  if (keyDown(DOWN_ARROW) && balloon.y<400){
    balloon.y = balloon.y + 5;
    balloon.scale = balloon.scale + 0.01;
    updatePosition(0,5);
  }

  if (keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x + 5;
    updatePosition(5,0);
      }

  if (keyDown(LEFT_ARROW)){
    balloon.x = balloon.x - 5;
    updatePosition(-5,0);
    
  }
  drawSprites();
  
}
function updatePosition(x,y){
  database.ref("balloon/position").update({'x': position.x+x, 'y': position.y+y});
}
function readB(data){

  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;

}
