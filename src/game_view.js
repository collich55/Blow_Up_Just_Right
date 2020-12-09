function GameView(game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.ball = this.game.addBall();
  this.floor = this.game.addFloor();
  // this.imageData1 = ctx.getImageData(0, 0, canvas.width, canvas.height);
  this.post = this.game.addPost();
}

GameView.ADJUST = {
  w: 5,
  s: -5,
  x: -1
};

GameView.MOVE = {
  a: -20,
  d: 20,
  c: 1,
  z: -1
};


GameView.GRAVITY = {
  s: -1
};



// setTimeout(function () {
//   this.ctx.putImageData(this.imageData1, 0, 0);
// }, 1000);



GameView.prototype.bindKeyHandlers = function bindKeyHandlers() {
  const ball = this.ball;

  Object.keys(GameView.ADJUST).forEach(function (k) {
    const adj = GameView.ADJUST[k];
    key(k, function () { ball.changeSize(adj); });
  });

  Object.keys(GameView.GRAVITY).forEach(function (k) {
    key("space", function () { ball.startGravity(); });
  });

  Object.keys(GameView.MOVE).forEach(function (k) {
    const adj = GameView.MOVE[k];
    key(k, function () { ball.moveSideways(adj); });
  });  

};



GameView.prototype.start = function start() {
  this.bindKeyHandlers();
  this.lastTime = 0;
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function animate(time) {
  const timeDelta = time - this.lastTime;

  this.game.step(timeDelta);
  this.game.draw(this.ctx);
  this.lastTime = time;

  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;
