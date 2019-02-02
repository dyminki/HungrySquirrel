// Hungry Squirrel

document.addEventListener("DOMContentLoaded", function() {
    function Squirrel() {
        this.x = 0;
        this.y = 0;
        this.direction = 'right';
    }
    function Walnut() {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    }
    function Game(){
        this.board = document.querySelectorAll('#board div');
        this.squirrel = new Squirrel();
        this.walnut = new Walnut();
        this.score = 0;

        this.index = function(x,y) {
            return x + (y * 10);
        };

        this.showSquirrel = function(){
            this.hideVisibleSquirrel();
            this.board[this.index(this.squirrel.x,this.squirrel.y) ].classList.add('squirrel');
        };

        this.hideVisibleSquirrel = function () {
            document.querySelector('.squirrel')!= null &&document.querySelector('.squirrel').classList.remove('squirrel'); 
        };

        this.showWalnut = function(){
            this.board[this.index(this.walnut.x,this.walnut.y) ].classList.add('walnut');
        };
        
        this.moveSquirrel = function (){
            if(this.squirrel.direction === "right") {
                this.squirrel.x = this.squirrel.x + 1;
            } else if (this.squirrel.direction === "left") {
                this.squirrel.x = this.squirrel.x - 1;
            }else if (this.squirrel.direction === "down") {
                this.squirrel.y = this.squirrel.y + 1;
            }else if (this.squirrel.direction === "up") {
                this.squirrel.y = this.squirrel.y - 1;
            }

            if (this.gameOver() == false) {
                this.showSquirrel();
                this.checkWalnutCollision();
            }
            
        };
        
        this.turnSquirrel = function (e) {
            switch (e.which) {
                case 37:
                    this.squirrel.direction = "left";
                    break;
                case 38:
                    this.squirrel.direction = "up";
                    break;
                case 39:
                    this.squirrel.direction = "right";
                    break;
                case 40:
                    this.squirrel.direction = "down" 
            }
        };

        this.checkWalnutCollision = function () {
            if (this.squirrel.y === this.walnut.y && this.squirrel.x === this.walnut.x) {
                let pos = this.index(this.squirrel.x,this.squirrel.y);
                let counter = document.querySelector('#score strong');
                
                this.board[pos].classList.remove("walnut");
                this.score++;
                counter.innerText = this.score;
                this.walnut = new Walnut();
                this.showWalnut();
            }
        }

       
        this.gameOver = function (){
            if(this.squirrel.x < 0 || this.squirrel.x > 9 || this.squirrel.y < 0 || this.squirrel.y > 9){
                let pos = this.index(this.walnut.x,this.walnut.y);
                let counter = document.querySelector('#score strong');
                clearInterval(this.idsetInteval);
                this.hideVisibleSquirrel();
                this.board[pos].classList.remove("walnut");
                document.getElementsByClassName('bg')[0].classList.add('invisible');
                document.getElementById('over').classList.remove("invisible");
                
                return true;
            }
            return false;
        }
        
        this.startGame = function (){
            this.idsetInteval = setInterval(() => {this.moveSquirrel()}, 250);
        };
    }

    const game = new Game();
    game.showSquirrel();
    game.showWalnut();    
    game.startGame();
    document.addEventListener('keydown', (event) => {game.turnSquirrel(event)});
    
    document.getElementsByClassName('start')[0].addEventListener('click', function () {
        window.location.reload();
    });
});