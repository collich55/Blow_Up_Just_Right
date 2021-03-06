const Util = require("./util");

function Ball(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
  this.moving = false;
  this.changeImage = false;
}

Ball.prototype.collideWith = function collideWith(otherObject) {

  

};

Ball.prototype.changeSize = function changeSize(adj) {
 
  if (this.radius + adj > 0 || adj > 0) {
    this.radius += adj;
  }
};

Ball.prototype.startGravity = function startGravity() {
  this.game.ball[2].show = true;
  this.game.ball[3].show = true;
  
  this.moving = true;
};




Ball.prototype.moveSideways = function moveSideways(adj) {
  this.pos[0] += adj;
};


let img = new Image();
img.src = "beach-ball-clip-art-beach-ball.png"


Ball.prototype.draw = function draw(ctx) {

  
  if (this.changeImage === true) {
    img.src = "beach-ball-clip-art-beach-ball.png"
  }
  ////img.src = 'https://static.turbosquid.com/Preview/001213/351/EI/3D-beach-ball-model_D.jpg';
  //// img.src = './beach-ball.jpg';

  ctx.save();
  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  );
  ctx.clip();
  ctx.drawImage(img, this.pos[0]-(this.radius) , this.pos[1]-(this.radius), this.radius*2, this.radius*2);
  ctx.restore();

  // plain red ball:
  // ctx.fillStyle = "red"
  // ctx.fillRect(this.pos[0]-this.radius, this.pos[1]-this.radius, this.radius*2, this.radius*2);

};



//probably useless since I use collision on floor and posts for specific messages right now
Ball.prototype.isCollidedWith = function isCollidedWith(otherObject) {
  const centerDist = Util.dist(this.pos, otherObject.pos);
  return centerDist < (this.radius + otherObject.radius);
};


const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

Ball.prototype.gravity = function gravity() {

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
