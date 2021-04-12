const Util = require("./util");

const scoreEl = document.getElementById("scoreEl")
const oneScoreEl = document.getElementById("oneScoreEl")



function Floor(options) {
    this.pos = options.pos;
    this.game = options.game;
    // this.ctx = this.game.ctx;
    this.message = false;
    this.score = 0;
    this.one_score = 0;
    scoreEl.innerHTML = this.score;
    oneScoreEl.innerHTML = this.one_score;
    
}



Floor.prototype.draw = function draw(ctx) {
    
    if (this.message) {
        // let num = ((100 - (((score) / total) * 100)))
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.fillText("Will this work????", 500, 500);
    }

    // setTimeout(function () {
    //     this.message = false;
    // }, 3000)
    
};

Floor.prototype.resetScore = function resetScore() {
    this.score = 0;
    this.one_score = 0;
    scoreEl.innerHTML = this.score;
    oneScoreEl.innerHTML = this.one_score;
}

Floor.prototype.collideWith = function collideWith(otherObject) {



    let lower_pole_position = this.game.ball[2].pos[0];
    let higher_pole_position = this.game.ball[3].pos[0];
    let ball_diameter = this.game.ball[0].radius * 2;
    let that = this;

    let total = higher_pole_position - lower_pole_position
    let score = 100 - Math.floor((((total - ball_diameter)/total) * 100))
    score = score.toString();

    if (otherObject.moving == true) {
        if (otherObject.pos[0] < lower_pole_position || otherObject.pos[0] > higher_pole_position) {
            oneScoreEl.innerHTML = `Missed`
            that.game.ball[2].changePosts();
            setTimeout(function () {
                that.game.ball[2].show = false;
                that.game.ball[3].show = false;
            }, 1000)
            that.game.onDrop = false;
        } else {
            this.score += parseInt(score);
            
            this.one_score = score;
            scoreEl.innerHTML = `${this.score}`
            oneScoreEl.innerHTML = `${this.one_score}`
            that.game.ball[2].changePosts();
            setTimeout(function () {
                that.game.ball[2].show = false;
                that.game.ball[3].show = false;
            }, 1000)
            that.game.onDrop = false;
        }
    }

    otherObject.moving = false;
    otherObject.vel = [0, 0];
    otherObject.pos = [innerWidth / 2, innerHeight * .18];
    otherObject.radius = 10;

    this.game.ball[2].show = true;
    this.game.ball[3].show = true;
};


Floor.prototype.isCollidedWith = function isCollidedWith(otherObject) {
    const centerDist = (otherObject.pos[1] + otherObject.radius) >= this.pos[1];
    return centerDist;
};

// Floor.prototype.flashyText() = function flashyText() {
//     var count = 10,
//         timer = setInterval(function () {
//             count--;
//             if (count % 2 == 1) {

//                 ctx.font = "30px Comic Sans MS";
//                 ctx.fillStyle = "black";
//                 ctx.fillText("right/left = a/d", 50, 50);
                
//             }
//             else {
//                 // don't draw it (ie. clear it off)
//             }
//             if (count == 0) clearInterval(timer);
//         }, 1000);
// }

module.exports = Floor;