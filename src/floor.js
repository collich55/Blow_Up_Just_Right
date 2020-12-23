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


// ((Math.abs(this.game.ball[2].pos[0] - this.game.ball[3].pos[0])) - this.game.ball[0].radius)
Floor.prototype.collideWith = function collideWith(otherObject) {

    
    let lower;
    let higher;
    let that = this;
    
    // setTimeout(function () {
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
        let score = ((Math.abs(this.game.ball[2].pos[0] - this.game.ball[3].pos[0])) - (this.game.ball[0].radius * 2));
        score = score.toString();
        
        if (otherObject.moving !== false) {
            if (this.game.ball[0].pos[0] < lower || this.game.ball[0].pos[0] > higher) {
                this.one_score = 0;
                oneScoreEl.innerHTML = `Missed`
                that.game.ball[2].changePosts();
                setTimeout(function () {
                    that.game.ball[2].show = false;
                    that.game.ball[3].show = false;
                }, 1000)
                // Floor.flashyText();
            } else {
                
                let num = ((100 - (((score) / total) * 100)))
                this.score += Math.ceil(num);
                this.one_score = Math.ceil(num);
                scoreEl.innerHTML = `${this.score}`
                oneScoreEl.innerHTML = `${this.one_score}`
                that.game.ball[2].changePosts();
                setTimeout(function () {
                    that.game.ball[2].show = false;
                    that.game.ball[3].show = false;
                }, 1000)
                
                
                
                // ///console.log()()(this.game);
                
            }
        }
        
    otherObject.moving = false;
    otherObject.vel = [0,0];
    otherObject.pos = [720, 150];
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