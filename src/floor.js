const Util = require("./util");

function Floor(options) {
    this.pos = options.pos;
    this.game = options.game;
}

Floor.prototype.draw = function draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(0, 700);
    ctx.lineTo(1440, 700);
    ctx.stroke();
};


// ((Math.abs(this.game.ball[2].pos[0] - this.game.ball[3].pos[0])) - this.game.ball[0].radius)
Floor.prototype.collideWith = function collideWith(otherObject) {
    let lower;
    let higher;
    let message;
    if (this.game.ball[2].pos[0] < this.game.ball[3].pos[0]) {
        lower = this.game.ball[2].pos[0];
        higher = this.game.ball[3].pos[0];
    } else {
        lower = this.game.ball[3].pos[0];
        higher = this.game.ball[2].pos[0];
    }
    if (this.game.ball[0].pos[0] < lower) {
        message = "You landed outside of the goal!"
    }
    let total = Math.abs(this.game.ball[2].pos[0] - this.game.ball[3].pos[0])
    let score = ((Math.abs(this.game.ball[2].pos[0] - this.game.ball[3].pos[0])) - (this.game.ball[0].radius*2));
    score = score.toString();
    if (otherObject.moving !== false) {
        if (this.game.ball[0].pos[0] < lower || this.game.ball[0].pos[0] > higher) {
            alert("You landed outside of the goal!")
        } else {
            alert("You filled " + (100-(((score)/total)*100)) + "% of the space")
        }
    }
    otherObject.moving = false;
    otherObject.vel = [0,0]
    otherObject.pos = [720, 150]

};

Floor.prototype.isCollidedWith = function isCollidedWith(otherObject) {
    const centerDist = (otherObject.pos[1] + otherObject.radius) >= this.pos[1];
    console.log(centerDist)
    return centerDist;
};

module.exports = Floor;