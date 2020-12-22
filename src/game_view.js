const Post = require("./goal_post");

function GameView(game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.ball = this.game.addBall();
  this.floor = this.game.addFloor();
  this.post = this.game.addPost()
  this.timeEl = document.getElementById("timeEl")
  this.secs = 30;
  this.timeEl.innerHTML = this.secs;
  this.tim;
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


// setTimeout(function () {
//   this.message = false;
// }, 3000);




GameView.prototype.bindKeyHandlers = function bindKeyHandlers() {
  const ball = this.ball;
  const post = this.post;
  
  

  Object.keys(GameView.ADJUST).forEach(function (k) {
    const adj = GameView.ADJUST[k];
    key(k, function () { ball.changeSize(adj); });
  });

  setTimeout(function () {
    post[0].show = false;
    post[1].show = false;
  }, 1000);

  const that = this;
  key("space", function () { ball.startGravity(); });
  key("r", function () { that.floor.resetScore(); });
  key("t", function () {
    clearInterval(that.tim);
    that.secs = 30;
    that.tim = setInterval(function () {
      that.secs -= 1;
      that.timeEl.innerHTML = that.secs
      if (that.secs === -1) {
        // that.secs = 50;
        clearInterval(that.tim);
        that.secs = 30
        that.timeEl.innerHTML = that.secs
        return;
      }
    }, 1000);
    });

//------------------------------------------------------------------
//code snippit in dashed lines from https://www.kirupa.com/html5/press_and_hold.htm by Kirupa
  // let item = document.querySelector("#item");

  let timerID;
  let counter = 0;

  let pressHoldEvent = new CustomEvent("pressHold");

  // Increase or decreae value to adjust how long
  // one should keep pressing down before the pressHold
  // event fires
  let pressHoldDuration = 150;

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
    if (e.button == 0) {
      // left click
    
      requestAnimationFrame(timer);

      e.preventDefault();
      ball.pos[0] = e.offsetX

      console.log("Pressing!");
    }
  }

  function notPressingDown(e) {
    if (e.button == 0) {
      // left click
    
      e.preventDefault();
      // Stop the timer
      cancelAnimationFrame(timerID);
      counter = 0;
      ball.startGravity();

      console.log("Not pressing!");
    }
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
      cancelAnimationFrame(timerID);
      counter = 0;
      console.log("Press threshold reached!");
      ball.startGravity();
      // ball.radius += counter / 50
    }
  }

  function doSomething(e) {
    if (e.button == 0) {
      // left click
    
      console.log("pressHold event fired!");
      e.preventDefault();
    }
        
    // ball.inflate();
  }
  //------------------------------------------------------------------------

  
  Object.keys(GameView.MOVE).forEach(function (k) {
    const adj = GameView.MOVE[k];
    key(k, function () { ball.moveSideways(adj); });
  });  

  key("l", function () {
    
  post[0].show = true;
  post[1].show = true;
    
  setTimeout(function () {
    post[0].show = false;
    post[1].show = false;
  }, 1000);

  });

  
  key("p", function () {

    post[0].changePosts(); 

    setTimeout(function () {
      post[0].show = false;
      post[1].show = false;
    }, 1000) 
  });

  // if (this.game.ball[1].message === true) {
  //   setTimeout(function () {
  //     this.game.ball[1].message = false
  //   }, 3000)
  // }

  
 
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
