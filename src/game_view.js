const Post = require("./goal_post");

function GameView(game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.ball = this.game.addBall();
  this.floor = this.game.addFloor();
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




GameView.prototype.bindKeyHandlers = function bindKeyHandlers() {
  const ball = this.ball;
  const post = this.post;

  Object.keys(GameView.ADJUST).forEach(function (k) {
    const adj = GameView.ADJUST[k];
    key(k, function () { ball.changeSize(adj); });
  });

  setTimeout(function () {
    post[0].changeShow();
    post[1].changeShow();
  }, 1000);


  key("space", function () { ball.startGravity(); });
  
//------------------------------------------------------------------
//code snippit in dashed lines from https://www.kirupa.com/html5/press_and_hold.htm by Kirupa
  // let item = document.querySelector("#item");

  let timerID;
  let counter = 0;

  let pressHoldEvent = new CustomEvent("pressHold");

  // Increase or decreae value to adjust how long
  // one should keep pressing down before the pressHold
  // event fires
  let pressHoldDuration = 1000;

  // Listening for the mouse and touch events    
  window.addEventListener("mousedown", pressingDown, false);
  window.addEventListener("mouseup", notPressingDown, false);
  window.addEventListener("mouseleave", notPressingDown, false);

  window.addEventListener("touchstart", pressingDown, false);
  window.addEventListener("touchend", notPressingDown, false);

  // Listening for our custom pressHold event
  window.addEventListener("pressHold", doSomething, false);

  function pressingDown(e) {
    // Start the timer
    requestAnimationFrame(timer);

    e.preventDefault();
    ball.pos[0] = e.offsetX

    console.log("Pressing!");
  }

  function notPressingDown(e) {
    // Stop the timer
    cancelAnimationFrame(timerID);
    counter = 0;
    ball.startGravity();

    console.log("Not pressing!");
  }

  //
  // Runs at 60fps when you are pressing down
  //
  function timer() {
    console.log("Timer tick!");

    if (counter < pressHoldDuration) {
      timerID = requestAnimationFrame(timer);
      counter++;
      ball.radius += counter / 50
    } else {
      console.log("Press threshold reached!");
      // ball.radius += counter / 50
    }
  }

  function doSomething(e) {
    console.log("pressHold event fired!");
    // ball.inflate();
  }
  //------------------------------------------------------------------------

  
  Object.keys(GameView.MOVE).forEach(function (k) {
    const adj = GameView.MOVE[k];
    key(k, function () { ball.moveSideways(adj); });
  });  

  key("l", function () {
    
  post[0].changeShow();
  post[1].changeShow();
    
  setTimeout(function () {
    post[0].changeShow();
    post[1].changeShow();
  }, 1000);

  });

  
  key("p", function () {

    post[0].changePosts(); 

    setTimeout(function () {
      post[0].changeShow();
      post[1].changeShow();
    }, 1000) 
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
