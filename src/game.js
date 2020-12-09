const Ball = require("./ball");
const Floor = require("./floor");
const Post = require("./goal_post");
const Util = require("./util");

function Game() {
  this.ball = [];
}

Game.BG_COLOR = "lightblue";
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
    radius: 0

  });

  this.add(floor);

  return floor;
};

Game.prototype.addPost = function addPost() {

  const first_x = this.randomX();
  let second_x;

  if (first_x > 1200) {
    second_x = first_x - ((300 * Math.random()) + 5)
  } else {
    second_x = first_x + ((300 * Math.random()) + 5)
  }


  const post1 = new Post({

    pos: [first_x, 500],
    game: this,
    radius: 0,
    show: true

  });

  this.add(post1);

  const post2 = new Post({

    pos: [second_x, 500],
    game: this,
    radius: 0,
    show: true

  });

  this.add(post2);

  return post1;
};







Game.prototype.allObjects = function allObjects() {
  return [].concat(this.ball);
};

Game.prototype.checkCollisions = function checkCollisions() {
  let allObjects = this.allObjects();
  // allObjects = allObjects.filter(obj => obj instanceof Ball)


  for (let i = 0; i < allObjects.length; i++) {
    for (let j = 0; j < allObjects.length; j++) {
      const obj1 = allObjects[i];
      const obj2 = allObjects[j];

      if (obj1.isCollidedWith(obj2) && obj2 instanceof Ball) {
        const collision = obj1.collideWith(obj2);
        if (collision) return;
      }
    }
  }
};

Game.prototype.draw = function draw(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

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

Game.prototype.randomX = function randomPosition() {
  return ((1200 * Math.random()) + 200)
};



Game.prototype.step = function step(delta) {
  this.moveObjects(delta);
  this.checkCollisions();
};


module.exports = Game;
