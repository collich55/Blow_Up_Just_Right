// import "./canvas_w_h.js";
// import "./ball.js";
// import "./styles/index.scss";

const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function () {
    const canvasEl = document.getElementById("canvas");
    canvasEl.width = Game.DIM_X;
    canvasEl.height = Game.DIM_Y;

    const ctx = canvasEl.getContext("2d");
    const game = new Game(ctx);
    new GameView(game, ctx).start();
});
