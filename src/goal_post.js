const { DIM_X } = require("./game");
const Util = require("./util");

const oneScoreEl = document.getElementById("oneScoreEl")

function Post(options) {
    this.pos = options.pos;
    this.game = options.game;
    this.show = options.show;
}

Post.prototype.draw = function draw(ctx) {

    

    if (this.show) {
        let img1 = new Image();
        img1.src = 'https://i.pinimg.com/originals/5e/e7/5f/5ee75f45dfc654b7c86b20b7e4589593.jpg';

        if (this.game.ball[2].pos[0] === this.pos[0]) {
            ctx.drawImage(img1, this.pos[0] - 20, this.pos[1] - 5, 20, (innerHeight * (205 / 821)));
        }

        if (this.game.ball[3].pos[0] === this.pos[0]) {
            ctx.drawImage(img1, this.pos[0], this.pos[1] - 5, 20, (innerHeight * (205 / 821)));
        }
    }

    
}

Post.prototype.randomX = function randomX() {
    return ((innerWidth * .65 * Math.random())+ (innerWidth*.04))
};


Post.prototype.changePosts = function changePosts() {
    const first_x = this.randomX();
    let second_x;
    let third_x;
    let fourth_x;
    let that = this;

    second_x = first_x + ((innerWidth * .12 * Math.random()) + innerWidth * .15)
    third_x = first_x - 20;
    fourth_x = second_x + 20;

    this.game.objects["post1"].pos[0] = first_x;
    this.game.objects["post2"].pos[0] = second_x;
    this.game.objects["post3"].pos[0] = third_x;
    this.game.objects["post4"].pos[0] = fourth_x;

    this.game.objects["post1"].show = true;
    this.game.objects["post2"].show = true;

    setTimeout(function () {
        that.game.objects["post1"].show = false;
        that.game.objects["post2"].show = false;
    }, 1000) 
};



Post.prototype.changeShow = function changeShow() {
    this.show = !this.show
}

Post.prototype.collideWith = function collideWith(otherObject) {
    let that = this;
    oneScoreEl.innerHTML = `Hit Pole`
    otherObject.moving = false;
    otherObject.vel = [0, 0];
    otherObject.pos = [innerWidth/2, (innerHeight * (150 / 821))];
    otherObject.radius = 10;
    this.changePosts();
    setTimeout(function () {
        that.game.ball[2].show = false;
        that.game.ball[3].show = false;
    }, 1000) 
    that.game.onDrop = false;
    
};

Post.prototype.isCollidedWith = function isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (otherObject.radius);
};

module.exports = Post