const Ball = require("./ball");
const Floor = require("./floor");
const Post = require("./goal_post");
const Util = require("./util");

function Game(ctx) {
  this.ctx = ctx;
  this.ball = [];
}

Game.BG_COLOR = "#c2b280";
Game.DIM_X = innerWidth;
Game.DIM_Y = innerHeight;

Game.prototype.add = function add(object) {
  this.ball.push(object);
};

Game.prototype.addBall = function addBall() {
  const ball = new Ball({

    pos: [720, 150],
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

    pos: [720, 711],
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

  second_x = first_x + ((200 * Math.random()) + 200)
  third_x = first_x - 20;
  fourth_x = second_x + 20;




  const post1 = new Post({

    pos: [first_x, 500],
    game: this,
    radius: 0,
    show: true,
    ctx: this.ctx

  });

  this.add(post1);

  const post2 = new Post({

    pos: [second_x, 500],
    game: this,
    radius: 0,
    show: true,
    ctx: this.ctx

  });

  this.add(post2);

  const post3 = new Post({

    pos: [third_x, 500],
    game: this,
    radius: 0,
    show: true,
    ctx: this.ctx

  });

  this.add(post3);

  const post4 = new Post({

    pos: [fourth_x, 500],
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

Game.prototype.draw = function draw(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  let img = new Image();
  img.src = 'Desert_Sand_Texture-1203.jpg';

  let img2 = new Image();
  img2.src = "https://media.freestocktextures.com/cache/12/ef/12efb857005f76685eeb8b41d87571f0.jpg";


  let img3 = new Image();
  img3.src = "https://www.tonytextures.com/free-texture-gallery/sky/Sky_Clouds_Photo_Texture_A_P1119218.JPG";

  
  // ctx.drawImage(img, 0, 700);
  // ctx.drawImage(img, 500, 700);
  ctx.drawImage(img, 0, 700, 1440, 200);
  ctx.drawImage(img2, 0, 675, 1440, 25);
  ctx.drawImage(img3, 0, 0, 1440, 675);

  // ctx.drawImage(img2, 500, 500);
  // ctx.drawImage(img2, 1000, 500);

  // debugger

  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "black";
  ctx.fillText("Click and Hold to Inflate Beach Ball Wherever You Click", 50, 105);
  ctx.fillText("Try to Land between Posts. Larger Ball Gives a Bigger Score!", 50, 135);
  // ctx.fillText("left/right (fine tuning) = z/c", 50, 150);
  // ctx.fillText("larger/smaller (fine tuning) = q/x", 50, 200);
  ctx.fillText("Show Poles Again (cheating) = l", 50, 200)
  ctx.fillText("New Poles = p", 50, 230);
  ctx.fillText("Start Timer = t", 50, 260);
  ctx.fillText("Reset Score = r", 50, 290);

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
  return ((900 * Math.random()) + 50)
};



Game.prototype.step = function step(delta) {
  this.moveObjects(delta);
  this.checkCollisions();
};


module.exports = Game;
