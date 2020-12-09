const Util = require("./util");

function Post(options) {
    this.pos = options.pos;
    this.game = options.game;
    this.show = options.show;
}

Post.prototype.draw = function draw(ctx) {

    

    if (this.show) {
        ctx.beginPath();
        ctx.moveTo(this.pos[0], 500);
        ctx.lineTo(this.pos[0], 700);
        ctx.stroke();
    }
};

Post.prototype.collideWith = function collideWith(otherObject) {
    alert("You hit the pole!")
    otherObject.moving = false;
    otherObject.vel = [0, 0]
    otherObject.pos = [720, 150]
};

Post.prototype.isCollidedWith = function isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (otherObject.radius);
};

module.exports = Post