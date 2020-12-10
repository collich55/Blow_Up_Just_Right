const Util = require("./util");

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
            ctx.drawImage(img1, this.pos[0] - 20, this.pos[1] - 5, 20, 205);
        } 
        if (this.game.ball[3].pos[0] === this.pos[0]) {
            ctx.drawImage(img1, this.pos[0], this.pos[1] - 5, 20, 205);
        }
        

        // ctx.beginPath();
        // // ctx.moveTo(this.pos[0]-1, 500);
        // // ctx.lineTo(this.pos[0]-1, 700);
        // // ctx.moveTo(this.pos[0] - 2, 500);
        // // ctx.lineTo(this.pos[0] - 2, 700);
        // ctx.moveTo(this.pos[0], 500);
        // ctx.lineTo(this.pos[0], 700);
        // // ctx.lineWidth = 15;
        // ctx.stroke();
    }

    
};

// Post.prototype.drawNew = function drawNew(ctx) {



//     if (this.show) {
//         ctx.beginPath();
//         ctx.moveTo(this.pos[0], 500);
//         ctx.lineTo(this.pos[0], 700);
//         ctx.stroke();
//     }
// };

Post.prototype.changePosts = function changePosts() {
    const first_x = this.randomX();
    let second_x;
    let third_x;
    let fourth_x;

    if (first_x > 1200) {
        second_x = first_x - ((300 * Math.random()) + 30)
        third_x = first_x - 20;
        fourth_x = second_x + 20;

    } else {
        second_x = first_x + ((300 * Math.random()) + 30)
        third_x = first_x - 20;
        fourth_x = second_x + 20;

    }



    this.game.ball[2].pos[0] = first_x;
    this.game.ball[3].pos[0] = second_x;
    this.game.ball[4].pos[0] = third_x;
    this.game.ball[5].pos[0] = fourth_x;

    this.game.ball[2].show = true;
    this.game.ball[3].show = true;
    this.game.ball[4].show = true;
    this.game.ball[5].show = true;
    


    // this.game.draw;



};

Post.prototype.randomX = function randomX() {
    return ((1200 * Math.random()) + 200)
};

Post.prototype.changeShow = function changeShow() {

    debugger

    this.show = !this.show

}

Post.prototype.collideWith = function collideWith(otherObject) {
    alert("You hit the pole!")
    otherObject.moving = false;
    otherObject.vel = [0, 0]
    otherObject.pos = [720, 150]
    this.game.ball[2].show = false;
    this.game.ball[3].show = false;
};

Post.prototype.isCollidedWith = function isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (otherObject.radius);
};

module.exports = Post