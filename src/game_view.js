const Post = require("./goal_post");

function GameView(game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.ball = this.game.addBall();
  this.floor = this.game.addFloor();
  this.post = this.game.addPost()
  this.timeEl = document.getElementById("timeEl")
  this.highScoreEl = document.getElementById("highScoreEl")
  this.scoreEl = document.getElementById("scoreEl")
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
  let isHold = false;
  
  

  Object.keys(GameView.ADJUST).forEach(function (k) {
    const adj = GameView.ADJUST[k];
    key(k, function () { ball.changeSize(adj); });
  });

  setTimeout(function () {
    post[0].show = false;
    post[1].show = false;
  }, 1000);

  const that = this;
  key("t", function () { ball.startGravity(); });
  key("r", function () { that.floor.resetScore(); });
  key("space", function () {
    that.secs = 30;
    that.timeEl.innerHTML = that.secs
    post[0].changePosts();
    setTimeout(function () {
      post[0].show = false;
      post[1].show = false;
    }, 1000) 
    that.floor.resetScore();
    clearInterval(that.tim);
    that.tim = setInterval(function () {
      that.secs -= 1;
      that.timeEl.innerHTML = that.secs
      if (that.secs === 0) {
        // that.secs = 50;
        clearInterval(that.tim);
        that.timeEl.innerHTML = that.secs
        cancelAnimationFrame(timerID);
        counter = 0;
        ball.startGravity();
        isHold = false;
        that.game.onDrop = true;
        // ball.changeImage = true;
        that.game.timeUp = true;
        // setTimeout(function () {
        //   ball.changeImage = false;
        // }, 2000)
        setTimeout(function () {
          that.game.timeUp = false;
          that.game.onDrop = false;
        }, 3000)
        setTimeout(function () {
          that.timeEl.innerHTML = that.secs
        }, 1000)

        

        setTimeout(function () {
          if (that.highScoreEl.innerHTML === that.scoreEl.innerHTML) {
            that.game.tie = true;
          }
          if (that.highScoreEl.innerHTML < that.floor.score) {
            that.highScoreEl.innerHTML = that.scoreEl.innerHTML;
            that.game.newRecord = true;
          }
        }, 1000)


        setTimeout(function () {
          that.floor.score = 0;
          that.scoreEl.innerHTML = 0;
        }, 3000)

        setTimeout(function () {
          that.game.newRecord = false;
          that.game.tie = false;
        }, 3000)



        
        
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
  let pressHoldDuration = 210;

  // Listening for the mouse and touch events    
  window.addEventListener("mousedown", pressingDown, false);
  // window.addEventListener("click", pressingDown, false); trying to get safari to work
  window.addEventListener("mouseup", notPressingDown, false);
  window.addEventListener("mouseleave", notPressingDown, false);
  window.addEventListener("touchstart", pressingDown, false);
  window.addEventListener("touchend", notPressingDown, false);
 

  

  // Listening for our custom pressHold event
  window.addEventListener("pressHold", doSomething, false);

  function pressingDown(e) {
    cancelAnimationFrame(timerID)
    e.preventDefault();
    // Start the timer
    ///console.log()()(isHold);
    if (that.game.onDrop === false && that.game.timeUp === false && e.button === 0 && e.path[0].alt !== "icon" && !e.path[0].firstElementChild && counter === 0 && isHold === false) {
      // left click

      isHold = true;
    
      requestAnimationFrame(timer);

      ball.pos[0] = e.offsetX

      ///console.log()()("Pressing!");
    }
  }

  function notPressingDown(e) {
    e.preventDefault();

    if (that.game.onDrop === false && that.game.timeUp === false && e.button === 0 && e.path[0].alt !== "icon" && !e.path[0].firstElementChild) {
    
     debugger

      
      isHold = false;
      // Stop the timer
      cancelAnimationFrame(timerID);
      counter = 0;
      ball.startGravity();
      that.game.onDrop = true;

      ///console.log()()("Not pressing!");
    }
    
  }

  //
  // Runs at 60fps when you are pressing down
  //
  function timer() {
    ///console.log()()("Timer tick!");
    if (that.game.onDrop === false && that.game.timeUp === false && counter < pressHoldDuration && isHold === true) {
      timerID = requestAnimationFrame(timer);
      counter++;
      ball.radius += counter / 50
    } else {
      cancelAnimationFrame(timerID);
      isHold = false;
      counter = 0;
      ///console.log()()("Press threshold reached!");
      ball.startGravity();
      that.game.onDrop = true;
      
      // ball.radius += counter / 50
    }
  }

  function doSomething(e) {
    e.preventDefault();
    if (e.button == 0) {
      // left click
      
    
      ///console.log()()("pressHold event fired!");
      e.preventDefault();
    }
        
    // ball.inflate();
  }
  //------------------------------------------------------------------------
  

  //--------------------------------------------------------------------------

  
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

  key("k", function () {

    post[0].show = true;
    post[1].show = true;

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
