const Ball = require("./ball");
const Floor = require("./floor");
const Post = require("./goal_post");
const Util = require("./util");

function Game(ctx) {
  this.ctx = ctx;
  this.ball = [];
  this.timeUp = false;
  this.onDrop = false;
  this.newRecord = false;
  this.tie = false;
}

Game.BG_COLOR = "#c2b280";
Game.DIM_X = innerWidth;
Game.DIM_Y = innerHeight;

Game.prototype.add = function add(object) {
  this.ball.push(object);
};

Game.prototype.addBall = function addBall() {
  const ball = new Ball({

    pos: [(Game.DIM_X * (720 / 1440)), (Game.DIM_Y * (150 / 821))],
    game: this,
    vel: [0,0],
    radius: 10,
    color: "red"
  });

  this.add(ball);

  return ball;
};

Game.prototype.addFloor = function addFloor() {
  const floor = new Floor({

    pos: [(Game.DIM_X * (720 / 1440)), (Game.DIM_Y * (711 / 821))],
    game: this,
    radius: 0,
    ctx: this.ctx


  });

  this.add(floor);

  return floor;
};

Game.prototype.addPost = function addPost() {

  const first_x = this.randomX();
  let second_x;
  let third_x;
  let fourth_x;

  second_x = first_x + ((innerWidth * .10 * Math.random()) + innerWidth * .15)
  third_x = first_x - 20;
  fourth_x = second_x + 20;




  const post1 = new Post({

    pos: [first_x, (Game.DIM_Y * (500 / 821))],
    game: this,
    radius: 0,
    show: true,
    ctx: this.ctx

  });

  this.add(post1);

  const post2 = new Post({

    pos: [second_x, (Game.DIM_Y * (500 / 821))],
    game: this,
    radius: 0,
    show: true,
    ctx: this.ctx

  });

  this.add(post2);

  const post3 = new Post({

    pos: [third_x, (Game.DIM_Y * (500 / 821))],
    game: this,
    radius: 0,
    show: true,
    ctx: this.ctx

  });

  this.add(post3);

  const post4 = new Post({

    pos: [fourth_x, (Game.DIM_Y * (500 / 821))],
    game: this,
    radius: 0,
    show: true,
    ctx: this.ctx

  });

  this.add(post4);

  return [post1, post2, post3, post4];
};







Game.prototype.allObjects = function allObjects() {
  return [].concat(this.ball);
};

Game.prototype.checkCollisions = function checkCollisions() {
  let allObjects = this.allObjects();

  for (let i = 0; i < allObjects.length; i++) {
    for (let j = 0; j < allObjects.length; j++) {

      const obj1 = allObjects[i];
      const obj2 = allObjects[j];

      if (obj1.isCollidedWith(obj2) && obj2 instanceof Ball && (!(obj1 instanceof Ball)) ) {
        const collision = obj1.collideWith(obj2);
        if (collision) {
          return;
        } 
      }
    }
  }
};

let img = new Image();
img.src = 'Desert_Sand_Texture-1203.jpg';

let img2 = new Image();
img2.src = "https://media.freestocktextures.com/cache/12/ef/12efb857005f76685eeb8b41d87571f0.jpg";


let img3 = new Image();
img3.src = "https://www.tonytextures.com/free-texture-gallery/sky/Sky_Clouds_Photo_Texture_A_P1119218.JPG";

Game.prototype.draw = function draw(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  

  
  // ctx.drawImage(img, 0, 700);
  // ctx.drawImage(img, 500, 700);
  
  // ctx.drawImage(img, 0, Math.floor((700/1440)*Game.DIM_X), Game.DIM_X, Math.floor((200/789)*Game.DIM_Y));
  // ctx.drawImage(img2, 0, Math.floor((675 / 1440) * Game.DIM_X), Game.DIM_X, Math.floor((25/789) * Game.DIM_Y));
  // ctx.drawImage(img3, 0, 0, Game.DIM_X, Math.floor((675/789) * Game.DIM_Y));

  ctx.drawImage(img, 0, (Game.DIM_Y * (700/821)), Game.DIM_X, (Game.DIM_Y*(200/821)));
  // ctx.drawImage(img2, 0, 675, 1440, 25);
  ctx.drawImage(img2, 0, (Game.DIM_Y * (675 / 821)), Game.DIM_X, (Game.DIM_Y * (25 / 821)));
  // ctx.drawImage(img3, 0, 0, 1440, 675);
  ctx.drawImage(img3, 0, 0, Game.DIM_X, (Game.DIM_Y * (675 / 821)));

  // ctx.drawImage(img2, 500, 500);
  // ctx.drawImage(img2, 1000, 500);

  // debugger

  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "black";
  ctx.fillText("Click and Hold to Inflate the Beach Ball Wherever You Click.", (Game.DIM_X * (50 / 1440)), (Game.DIM_Y * (105 / 821)));
  ctx.fillText("Land between the Posts for Points. The Bigger the Beach Ball the More Points You Get!", (Game.DIM_X * (50 / 1440)), (Game.DIM_Y * (135 / 821)));
  ctx.fillText("Press the spacebar to start a timed round", (Game.DIM_X * (50 / 1440)), (Game.DIM_Y * (200 / 821)));
  ctx.fillStyle = "blue";
  ctx.fillRect((Game.DIM_X * (50 / 1440)), (Game.DIM_Y * (200 / 821)), 587, 1);
  ctx.fillStyle = "black";
  // ctx.fillText("left/right (fine tuning) = z/c", 50, 150);
  // ctx.fillText("larger/smaller (fine tuning) = q/x", 50, 200);
  ctx.fillText("Free Play:", (Game.DIM_X * (50 / 1440)), (Game.DIM_Y * (300 / 821)))
  ctx.fillText("Show Poles Again = l", (Game.DIM_X * (50 / 1440)), (Game.DIM_Y * (340 / 821)))
  ctx.fillText("New Poles = p", (Game.DIM_X * (50 / 1440)), (Game.DIM_Y * (370 / 821)));
  ctx.fillText("Reset Score = r", (Game.DIM_X * (50 / 1440)), (Game.DIM_Y * (400 / 821)));
  // ctx.fillStyle = "yellow";
  // ctx.fillRect(1300, 200, 591, 2);
  if (this.timeUp === true) {
    ctx.font = "100px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Time is up!", Game.DIM_X/2, Game.DIM_Y/2)
  }

  if (this.newRecord === true) {
    ctx.font = "100px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("New Record!", Game.DIM_X / 2, Game.DIM_Y / 1.5)
  }

  if (this.tie === true) {
    ctx.font = "100px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText("Tied for record!", Game.DIM_X / 2, Game.DIM_Y / 1.5)
  }



  this.allObjects().forEach(function(object) {
    object.draw(ctx);
  });
};


Game.prototype.moveObjects = function moveObjects(delta) {
  this.allObjects().forEach(function(object) {
    if (object instanceof Ball) {
      object.move(delta);
    }
  });
};

Game.prototype.randomX = function randomX() {
  return ((innerWidth * .7 * Math.random()) + (innerWidth * .04))
};



Game.prototype.step = function step(delta) {
  this.moveObjects(delta);
  this.checkCollisions();
};


module.exports = Game;
