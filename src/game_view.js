const Post = require("./goal_post");

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
  x: -1,
  q: 1,
  n: 1
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

GameView.SHOW = {
  l: -1
};

GameView.RESTART = {
  l: -1
};


// setTimeout(function () {
//   this.ctx.putImageData(this.imageData1, 0, 0);
// }, 1000);



GameView.prototype.bindKeyHandlers = function bindKeyHandlers() {
  const ball = this.ball;
  const post = this.post;

  Object.keys(GameView.ADJUST).forEach(function (k) {
    const adj = GameView.ADJUST[k];
    key(k, function () { ball.changeSize(adj); });
    setTimeout(function () {
    post[0].changeShow(); 
    post[1].changeShow();
  }, 1000);
  });

  Object.keys(GameView.GRAVITY).forEach(function (k) {
    key("space", function () { ball.startGravity(); });
    
  });

  Object.keys(GameView.MOVE).forEach(function (k) {
    const adj = GameView.MOVE[k];
    key(k, function () { ball.moveSideways(adj); });
  });  

  Object.keys(GameView.SHOW).forEach(function (k) {
    // const adj = GameView.SHOW[k];
    key("l", function () {
      setTimeout(function () {
        post[0].changeShow();
        post[1].changeShow();
      }, 1); 
    setTimeout(function () {
      post[0].changeShow();
      post[1].changeShow();
    }, 1000);
    });
  }); 

  Object.keys(GameView.RESTART).forEach(function (k) {
    // const adj = GameView.SHOW[k];
    debugger;
    key("p", function () {
      post[0].changePosts(); setTimeout(function () {
        post[0].changeShow();
        post[1].changeShow();
      }, 1000) });
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
