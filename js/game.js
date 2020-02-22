class Game {
  constructor() {
    this.gameBoard = new GameBoard();
    this.player = new Player();
    this.level = 1;
    this.isObstacleCreated = false;
    this.gameTime = 100;
    this.startButton = document.getElementById("start-game-button");
    this.addEvent();
    this.keyFunction = this.keyFunction.bind(this);
  }
  addEvent() {
    this.startButton.addEventListener("click", () => this.start());
  }
  start() {

    this.player.initialise();
    this.gameTime = 100;
    this.gameBoard.initialise();
    this.gameBoard.createObstacles(this.level);
    this.gameBoard.createSurprises(this.level);
    this.gameBoard.createKeepers(this.level);
    clearInterval(this.gameInterval);
    clearInterval(this.keeperInterval);

    this.isObstacleCreated = true;

    window.requestAnimationFrame(this.gameLoop.bind(this));

    this.addListeners(
      this.player,
      this.gameBoard.obstacles,
      this.gameBoard.surprises
    );

    let gameRemaningTime = document.getElementById("gameTime");
    this.gameInterval = setInterval(() => {
      this.gameTime--;
      if(this.player.timeFound){
       this.gameTime += 20;
       this.player.timeFound = false;
     }
      if (this.player.lifeLeft === 0 ){
        gameRemaningTime.innerHTML = `Sorry, Game Over !!! Better luck next time`;
      } else if (this.player.homeReached) {
        gameRemaningTime.innerHTML = `Congratulations !!! you won the game`;
      } else if (this.gameTime > 0) {
        gameRemaningTime.innerHTML = `Remaining Time : ${this.gameTime}`;
      } else {
        gameRemaningTime.innerHTML = `Sorry, Game Over !!! Better luck next time`;
      }
    }, 1000);
    this.keeperInterval = setInterval(() => {
      this.gameBoard.keepers.forEach(keeper => {
        if (keeper.direction[1] >= 60) {
          keeper.direction[1] = 0;
          let randomNumber = Number(Math.floor(Math.random() * 4));
          if (randomNumber === 0) {
            keeper.direction[0] = "l";
          }
          if (randomNumber === 1) {
            keeper.direction[0] = "r";
          }
          if (randomNumber === 2) {
            keeper.direction[0] = "n";
          }
          if (randomNumber === 3) {
            keeper.direction[0] = "s";
          }
        }
        switch (keeper.direction[0]) {
          case "l":
            if (keeper.direction[1] <= 60) {
              keeper.moveLeft(
                this.gameBoard.obstacles,
                this.gameBoard.surprises
              );
            }
            break;
          case "r":
            if (keeper.direction[1] <= 60) {
              keeper.moveRight(
                this.gameBoard.obstacles,
                this.gameBoard.surprises
              );
            }
            break;
          case "s":
            if (keeper.direction[1] <= 60) {
              keeper.moveDown(
                this.gameBoard.obstacles,
                this.gameBoard.surprises
              );
            }
            break;
          case "n":
            if (keeper.direction[1] <= 60) {
              keeper.moveUp(this.gameBoard.obstacles, this.gameBoard.surprises);
            }
            break;
        }
      });
    }, 500);
  }

  checkCollision() {
      let hitKeeper = false;
      this.gameBoard.keepers.map(keeper => {
        if (this.player.x > (keeper.x - 15) && this.player.x < (keeper.x + 15)) {
          if (this.player.y > (keeper.y - 15) && this.player.y < (keeper.y + 15)) {
            
            hitKeeper = true;
          }
        }
      });
      return hitKeeper;
  }
  gameLoop() {
    const ctx = this.gameBoard.ctx;
    ctx.clearRect(0, 0, this.gameBoard.width, this.gameBoard.height);
    this.gameBoard.createGameBoard();
    this.gameBoard.restoreSurprises();
    this.gameBoard.restoreObstacles();
    this.gameBoard.restoreKeepers();
    
    if(this.checkCollision()){
       this.player.lifeLeft--;
       this.player.speed = 0;
    }

    this.player.draw(ctx);

    for (let i = 0; i < this.player.bullets.length; i++) {
      if (this.player.bullets[i].move(this.gameBoard.obstacles, this.gameBoard.keepers)) {
        this.player.bullets.splice(i, 1);
      } else {
        this.player.bullets[i].draw(ctx);
      }
    }

    if (this.gameTime > 0 &&
        this.player.lifeLeft > 0 &&
       !this.player.homeReached ) {
      window.requestAnimationFrame(this.gameLoop.bind(this));
    }
  }
 
  keyFunction(e) {
        switch (e.key) {
          case "ArrowLeft":
            this.player.moveLeft(this.gameBoard.obstacles, this.gameBoard.surprises);
            break;
          case "ArrowRight":
            this.player.moveRight(this.gameBoard.obstacles, this.gameBoard.surprises);
            break;
          case "ArrowUp":
            this.player.moveUp(this.gameBoard.obstacles, this.gameBoard.surprises);
            break;
          case "ArrowDown":
            this.player.moveDown(this.gameBoard.obstacles, this.gameBoard.surprises);
            break;
          case "s":
            this.player.shoot(this.gameBoard.obstacles);
            break;
        }
        if (this.player.timeFound){
            this.gameTime += 20;
            this.player.timeFound = false;
        }
  }
  addListeners() {   
    document.removeEventListener("keydown", this.keyFunction.bind(this));
    document.addEventListener("keydown", this.keyFunction.bind(this));
  }
}

const game = new Game();



