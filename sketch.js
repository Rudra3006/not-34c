
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world, backG;
var canvas, angle, bunker, blaster, Wmonster, Fmonster;
var balls = [];
var Wmonsters = [];
var Fmonsters = [];
var score = 0;
var WmonsterAnimation = [];
var WmonsterSpritedata, WmonsterSpritesheet;
var FmonsterSpritedata, FmonsterSpritesheet;

var isGameOver = false;

function preload() {
  Wmonster = loadAnimation("walk0.png", "walk1.png", "walk2.png", "walk3.png");
  Fmonster = loadAnimation("fly1.png", "fly2.png", "fly3.png", "fly4.png", "fly5.png");
  bunker = loadImage("dome.png");
  blaster = loadImage("cannon.png");
}

function setup() {
  createCanvas(400, 400);

  Wmonster = createSprite(300,300);
  Fmonster = createSprite()

  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle =

    bunker = Bodies.ellipse(10, 10, 10, 10, { isStatic: true });
  World.add(world, bunker);

  blaster = new blaster(10, 10, 10, 10, angle);

  var WmonsterFrames = WmonsterSpritedata.frames;
  for (var i = 0; i < WmonsterFrames.length; i++) {
    var pos = WmonsterFrames[i].position;
    var img = WmonsterSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    WmonsterAnimation.push(img);
  }

  var FmonsterFrames = FmonsterSpritedata.frames;
  for (var i = 0; i < FmonsterFrames.length; i++) {
    var pos = FmonsterFrames[i].position;
    var img = FmonsterSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    FmonsterAnimation.push(img);
  }

}


function draw() {
  background(51);
  Engine.update(engine);

  push();
  translate(bunker.position.x, bunker.position.y);
  rotate(bunker.angle);
  imageMode(CENTER);
  image(bunkerImage, 10, 10, 10, 10);
  pop();

  showWmonsters();

  for (var i = 0; i < balls.length; i++) {
    showblasterBalls(balls[i], i);
    collisionWithWmonster(i);
  }

  showFmonsters();

  for (var i = 0; i < balls.length; i++) {
    showblasterBalls(balls[i], i);
    collisionWithFmonster(i);
  }

  blaster.display();

  drawSprites()
}

function collisionWithWmonster(index) {
  for (var i = 0; i < Wmonsters.length; i++) {
    if (balls[index] !== undefined && Wmonsters[i] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].body, Wmonsters[i].body);

      if (collision.collided) {

        Wmonsters[i].remove(i);

        Matter.World.remove(world, balls[index].body);
        delete balls[index];
      }
    }
  }
}

function collisionWithFmonster(index) {
  for (var i = 0; i < Fmonsters.length; i++) {
    if (balls[index] !== undefined && Fmonsters[i] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].body, Fmonsters[i].body);

      if (collision.collided) {
        Fmonsters[i].remove(i);


        Matter.World.remove(world, balls[index].body);
        delete balls[index];
      }
    }
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    var BALL = new BALL(blaster.x, blaster.y);
    BALL.trajectory = [];
    Matter.Body.setAngle(BALL.body, blaster.angle);
    balls.push(BALL);
  }
}

function showblasterBalls(ball, index) {
  if (ball) {
    ball.display();
  }
}

function showWmonsters() {
  if (Wmonsters.length > 0) {
    if (
      Wmonsters.length < 4 &&
      Wmonsters[Wmonsters.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var Wmonster = new WMonster(
        width,
        height - 100,
        170,
        170,
        position,
        WmonsterAnimation
      );

      Wmonsters.push(Wmonster);
    }

    for (var i = 0; i < Wmonsters.length; i++) {
      Matter.Body.setVelocity(Wmonsters[i].body, {
        x: -0.9,
        y: 0
      });

      Wmonsters[i].display();
      Wmonsters[i].animate();

    }
  }
}

function showFmonsters() {
  if (Fmonsters.length > 0) {
    if (
      Fmonsters.length < 4 &&
      Fmonsters[Fmonsters.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var Fmonster = new FMonster(
        width,
        height - 100,
        170,
        170,
        position,
        FmonsterAnimation
      );

      Fmonsters.push(Fmonster);
    }

    for (var i = 0; i < Fmonsters.length; i++) {
      Matter.Body.setVelocity(Fmonsters[i].body, {
        x: -0.9,
        y: 0
      });

      Fmonsters[i].display();
      Fmonsters[i].animate();

    }
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW && !isGameOver) {
    cannonsound.play()
    balls[balls.length - 1].shoot();
  }
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      confirmButtonText: "Play Again"
    },
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
