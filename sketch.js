const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,rope2,rope3, fruit, ground;
var link,link2,link3;

var bg_img;
var food;
var rabbit;

var button,button2,button3;
var bunny;

var eat
var blink
var sad

var air_sound
var cutting_sound
var eating_sound
var sad_sound
var background_sound

var balloon_btn
var mute_btn

var isSad = false

var canW
var canH

function preload() {
  bg_img = loadImage('./assets/background.png');
  food = loadImage('./assets/melon.png');
  rabbit = loadImage('./assets/Rabbit-01.png');
  eat = loadAnimation("./assets/eat_0.png", "./assets/eat_1.png", "./assets/eat_2.png", "./assets/eat_3.png", "./assets/eat_4.png")
  sad = loadAnimation("./assets/sad_1.png", "./assets/sad_2.png", "./assets/sad_3.png")
  blink = loadAnimation("./assets/blink_1.png", "./assets/blink_2.png", "./assets/blink_3.png")

  air_sound = loadSound("./assets/sounds/air.wav")
  cutting_sound = loadSound("./assets/sounds/rope_cut.mp3")
  eating_sound = loadSound("./assets/sounds/eating_sound.mp3")
  sad_sound = loadSound("./assets/sounds/sad.wav")
  background_sound = loadSound("./assets/sounds/sound1.mp3")

  blink.playing = true
  sad.playing = true
  eat.playing = true

  sad.looping = false
  eat.looping = false
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (isMobile) {
    canW = displayWidth
    canH = displayHeight
    createCanvas(canW+80,canH);
  } else {
    canW = windowWidth
    canH = windowHeight
    createCanvas(canW,canH)
  }
  
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg("./assets/cut_btn.png")
  button.size(50, 50)
  button.position(20, 30)
  button.mouseClicked(drop)

  //btn2
  button2 = createImg("./assets/cut_btn.png")
  button2.size(50,50)
  button2.position(330,35)
  button2.mouseClicked(drop2)

  //btn3
  button3 = createImg("./assets/cut_btn.png")
  button3.size(50,50)
  button3.position(360,200)
  button3.mouseClicked(drop3)

  balloon_btn = createImg("./assets/balloon.png")
  balloon_btn.size(150,100)
  balloon_btn.position(10,250)
  balloon_btn.mouseClicked(air_balloon)

  mute_btn = createImg("./assets/mute.png")
  mute_btn.size(50,50)
  mute_btn.position(10,10)
  mute_btn.mouseClicked(mute)

  rope = new Rope(8, { x: 40, y: 30 });
  rope2 = new Rope(8, { x: 350, y: 35 });
  rope3 = new Rope(6, { x: 390, y: 210 });
  ground = new Ground(200, canH, 600, 20);
  blink.frameDelay = 20
  sad.frameDelay = 20
  eat.frameDelay = 20
  bunny = createSprite(170, canH-80, 100, 100)
  bunny.addAnimation("blink", blink)
  bunny.addAnimation("sad", sad)
  bunny.addAnimation("eat", eat)
  bunny.scale = 0.2

  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fruit);

  link = new Link(rope, fruit);
  link2 = new Link(rope2, fruit);
  link3 = new Link(rope3, fruit);


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

}

function draw() {
  background(51);
  imageMode(CENTER)
  image(bg_img, width / 2, height / 2, width, height)
  //background_sound.play()
  //background_sound.setVolume(0.1)

  if (fruit !== null) {
    image(food, fruit.position.x, fruit.position.y, 60, 60)
  }

  if (collide(fruit,bunny)) {
    bunny.changeAnimation("eat")
    eating_sound.play()
  }
  
  if ((fruit != null) && fruit.position.y >600 ) {
    bunny.changeAnimation("sad")
    
    if (!isSad){
      sad_sound.play()
      isSad = true
    }
  }

  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  ground.show();

  drawSprites()
}

function drop() {
  rope.break();
  link.detach();
  link = null;
  cutting_sound.play()
}

function drop2() {
  rope2.break();
  link2.detach();
  link2 = null;
  cutting_sound.play()
}

function drop3() {
  rope3.break();
  link3.detach();
  link3 = null;
  cutting_sound.play()
}

function collide(body,sprite){
  if (body !== null){
    var D = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)

    if (D <= 80) {
      World.remove(world,fruit)
      fruit = null
      return true
    } else {
      return false
    }
  }
  
}

function air_balloon(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
  air_sound.play()
}

function mute(){
  if (background_sound.isPlaying()) {
    background_sound.stop()
  } else {
    background_sound.play()
  }
}
