const Util = require("./util");

function Ball(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
  this.moving = false;
}

Ball.prototype.collideWith = function collideWith(otherObject) {
  
};

Ball.prototype.changeSize = function changeSize(adj) {
  // this.moving = true;
  this.radius += adj;
};

Ball.prototype.startGravity = function startGravity() {
  this.moving = true;
};


Ball.prototype.moveSideways = function moveSideways(adj) {
  this.pos[0] += adj;
};





Ball.prototype.draw = function draw(ctx) {


  // var img = new Image();
  // var div = document.getElementById('foo');

  // img.onload = function () {
  //   div.appendChild(img);
  // };

  // img.src = '../beach-ball.jpg'  


  // var pat = ctx.createPattern(img, "repeat" );
  ctx.fillStyle = "red"


  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  );
  ctx.fill();
};

Ball.prototype.isCollidedWith = function isCollidedWith(otherObject) {
  const centerDist = Util.dist(this.pos, otherObject.pos);
  return centerDist < (this.radius + otherObject.radius);
};


const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

Ball.prototype.gravity = function gravity(timeDelta) {

    this.vel[1] = this.vel[1] + 0.5;

}


Ball.prototype.move = function move(timeDelta) {
  if (this.moving) {
    this.gravity();
  }
  
  const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel[0] * velocityScale,
      offsetY = this.vel[1] * velocityScale;

  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

  
};


module.exports = Ball;
