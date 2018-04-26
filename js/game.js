var	Furry = require("./furry.js");
var Coin = require("./coin.js");


function Game () {
    var self = this;
    this.board = document.querySelectorAll("section#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function(x,y) {
        return x + (y * 10);
    };
    this.showFurry = function () {
        if (document.querySelector('.furry') != null) {
            this.hideVisibleFurry();
        }
        this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
    };
    this.hideVisibleFurry = function() {
        var furryToHide = document.querySelector('.furry');
        furryToHide.classList.remove('furry');
    };
    this.showCoin = function () {
        this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
    };
    this.moveFurry = function() {

        if(this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y + 1;
        } else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y - 1;
        }
        if ( this.gameOver() ) {
            this.showFurry();
            this.checkCoinCollision();
        }
    };
    this.turnFurry = function(event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
    };

    document.addEventListener('keydown', function(event){
        self.turnFurry(event);
    });

    this.checkCoinCollision = function() {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            this.board[ this.index(this.coin.x,this.coin.y) ].classList.remove('coin');
            this.score++;
            var scoreVal = document.querySelector("#score strong");
            scoreVal.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };

    this.gameOver = function() {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            var score = document.querySelector(".invisible strong");
            score.innerText = this.score;
            var overScreen = document.querySelector(".invisible");
            overScreen.style.display = "block";
            return false;
        } return true;
    };

    this.startGame = function () {
        this.idSetInterval = setInterval (function () {
            self.moveFurry();
        },250);
    }
}



var game = new Game ();
game.showFurry();
game.showCoin();
game.startGame();


module.exports = Game;