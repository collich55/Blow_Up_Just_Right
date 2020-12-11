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

GameView.HOLD = {
  s: -1
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

  document.addEventListener('keydown', function (event) {
    if (event.key == 'i') {
    // while (key.isPressed("i")) {
      ball.inflate();
    }
    // }
  });

  // let moused = false;

  // document.addEventListener('keyup', function (event) {
    
  //   if (event.key == 'i') {
  //     ball.startGravity();
  //   }
  // });

  

  // window.addEventListener('mousedown', function () {

  //   moused = true;

  //   setTimeout(function () {
  //     if (moused === true) {
  //       ball.inflate();
  //     }
  //   }, 2);
    
    
    
  // });

 

  // window.addEventListener('mouseup', function () {
  //   moused = false
  //   ball.startGravity();
    
  // });


  // let mouseIsDown = false;
  // let idTimeout;

  // window.addEventListener('mousedown', function (event) {
  //   console.log("event:")
  //   console.log(event)
  //   const dimX = event.offsetX
  //   // mouseIsDown = true;
    
  //     // setTimeout(function () {
  //     //   if (mouseIsDown) {
  //         // ball.inflate(dimX);
  //     //   }
  //     // }, 200);

  //   ball.inflate(dimX);


    
  // });
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

  // window.addEventListener("pressHold", ball.inflate(dimX), false);
  //  window.addEventListener("pressHold", function(event) {

  //    const dimX = event.offsetX
  //    // mouseIsDown = true;
  //    // ball.inflate();
  //    // idTimeout = setTimeout(function () {
  //    // if (mouseIsDown) {

  //    ball.inflate(dimX);
    
  //  });

  // window.addEventListener('mouseup', function () {
  //   // clearTimeout(idTimeout);
  //   // mouseIsDown = false;
  //   // ball.startGravity();
  // });

  // if (key.isPressed("o")) {
  //   "o", function () { alert('o key is pressed, can ya believe it!?'); }

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
