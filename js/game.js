class Game {
    constructor() {
        this.gameBoard = new GameBoard();
        this.player = new Player();
        this.keepers = [];
        this.level = 1;
        this.isObstacleCreated = false;
        this.gameTime = 100;
    }
    start() {
        console.log("this.gameBoard : " + this.gameBoard);
        this.gameBoard.initialise();
        this.gameBoard.createObstacles(this.level);
        this.gameBoard.createSurprises(this.level);

        console.log("obstacles create" + this.gameBoard.obstacles); 
        this.isObstacleCreated = true;
        window.requestAnimationFrame(this.gameLoop.bind(this));
        this.addListeners(this.player, this.gameBoard.obstacles, this.gameBoard.surprises );
        
        let gameRemaningTime = document.getElementById("gameTime");
        setInterval(() => {
            this.gameTime--;
            // console.log("this.gameTime = " + this.gameTime);
            if (this.player.homeRached) {
                gameRemaningTime.innerHTML = `Congratulations !!! you won the game`;
            } else if (this.gameTime > 0) {
                gameRemaningTime.innerHTML = `Remaining Time : ${this.gameTime}`;
            } else {
                gameRemaningTime.innerHTML = `Sorry, Game Over !!! Better luck next time`;
            }  
        }, 1000);
    }
    gameLoop() {
        const ctx = this.gameBoard.ctx;
        ctx.clearRect(0,0, this.gameBoard.width, this.gameBoard.height)
        this.gameBoard.createGameBoard();
        if (!this.isObstacleCreated) {
            this.gameBoard.createObstacles(this.level);
            this.gameBoard.createSurprises(this.level);
            this.isObstacleCreated = true;
        } else {
            this.gameBoard.restoreSurprises();
            this.gameBoard.restoreObstacles();
        }
        this.player.draw(ctx);
        
        for (let i = 0; i < this.player.bullets.length; i++ ){
            // console.log("this.gameBoard.obstacles : "+ this.gameBoard.obstacles);
            if (this.player.bullets[i].move(this.gameBoard.obstacles)) {
                this.player.bullets.splice(i,1);
            } else {
             this.player.bullets[i].draw(ctx);
            }
        }
        
        // this.keepers.forEach((keeper, index) => {
        //     keeper.x -= keeper.speed
            
        //     if(this.checkCollision(keeper, this.player)) {
        //         this.keepers.splice(index, 1)
        //     }
            
        //     keeper.draw(ctx)
        //     if (keeper.x < -80) {
        //         this.keepers.splice(index, 1)
        //     }
        // })
        if(this.gameTime > 0 && this.player.lifeLeft > 0 && !this.player.homeRached) {
            window.requestAnimationFrame(this.gameLoop.bind(this));
        }
    }

    // checkCollision(keeper, player) {
    //     const dx = keeper.x - player.x
    //     const dy = keeper.y - player.y

    //     const distance = Math.sqrt(dx * dx + dy * dy)

    //     if (distance < keeper.radius + player.radius) {
    //         return true;
    //     }

    // }

    addListeners(player, obstacles, surprises) {
        document.addEventListener('keydown', function(e) {
            switch(e.key) {
                case 'ArrowLeft':
                    // console.log("Move Left");
                    player.moveLeft(obstacles,surprises);
                    break;
                case 'ArrowRight':
                    // console.log("Move Right");
                    player.moveRight(obstacles, surprises);
                    break;
                case 'ArrowUp':
                    // console.log("Move Up");
                    player.moveUp(obstacles, surprises);
                    break;
                case 'ArrowDown':
                    // console.log("Move Down");
                    player.moveDown(obstacles, surprises);
                    break;
                case 's':
                    // console.log("obstacles : "+obstacles)
                    player.shoot(obstacles);
                    break;
            }
        })
    }
}

const game = new Game();

game.start();

// $startButton = document.getElementById("start-game-button");
// $startButton.addEventListener('click', game.start.bind(this));

