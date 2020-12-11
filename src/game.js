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
  let third_x;
  let fourth_x;

  if (first_x > 1200) {
    second_x = first_x - ((300 * Math.random()) + 30)
    third_x = first_x - 20;
    fourth_x = second_x + 20;

  } else {
    second_x = first_x + ((300 * Math.random()) + 30)
    third_x = first_x - 20;
    fourth_x = second_x + 20;

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

  const post3 = new Post({

    pos: [third_x, 500],
    game: this,
    radius: 0,
    show: true

  });

  this.add(post3);

  const post4 = new Post({

    pos: [fourth_x, 500],
    game: this,
    radius: 0,
    show: true

  });

  this.add(post4);

  return [post1, post2, post3, post4];
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

      if (obj1.isCollidedWith(obj2) && obj2 instanceof Ball && (!(obj1 instanceof Ball)) ) {
        debugger
        // allObjects[2].show = true;
        // allObjects[3].show = true;
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
  img.src = 'https://img.freepik.com/free-photo/sand_74190-171.jpg?size=626&ext=jpg';
  
  ctx.drawImage(img, 0, 700);
  ctx.drawImage(img, 500, 700);
  ctx.drawImage(img, 1000, 700);
    // ctx.beginPath();
    // ctx.moveTo(30, 96);
    // ctx.lineTo(70, 66);
    // ctx.lineTo(103, 76);
    // ctx.lineTo(170, 15);
    // ctx.stroke();

  
  
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "black";
  ctx.fillText("Click and Hold to Inflate Beach Ball Wherever You Click", 50, 50);
  ctx.fillText("Try to Land between Posts. Larger Ball Gives a Bigger Score!", 50, 100);
  // ctx.fillText("left/right (fine tuning) = z/c", 50, 150);
  // ctx.fillText("larger/smaller (fine tuning) = q/x", 50, 200);
  // ctx.fillText("show poles again (cheating) = l", 50, 250);
  // ctx.fillText("new poles = p", 50, 300);
  

  // ctx.font = "30px Verdana";
  // // Create gradient
  // var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
  // gradient.addColorStop("0", " magenta");
  // gradient.addColorStop("0.5", "blue");
  // gradient.addColorStop("1.0", "red");
  // // Fill with gradient
  // ctx.fillStyle = gradient;
  // ctx.fillText("Big smile!", 10, 90);

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
