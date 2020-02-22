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
    console.log("this.gameBoard : " + this);
    this.player.initialise();
    this.gameTime = 100;
    this.gameBoard.initialise();
    this.gameBoard.createObstacles(this.level);
    this.gameBoard.createSurprises(this.level);
    this.gameBoard.createKeepers(this.level);
    clearInterval(this.gameInterval);
    clearInterval(this.keeperInterval);

    console.log("obstacles create" + this.gameBoard.obstacles);
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
        // console.log("timefound"); 
       this.gameTime += 20;
       this.player.timeFound = false;
     }
      // console.log("this.gameTime = " + this.gameTime);
      if (this.player.lifeLeft === 0 ){
        gameRemaningTime.innerHTML = `Sorry, Game Over !!! Better luck next time`;
      } else if (this.player.homeRached) {
        gameRemaningTime.innerHTML = `Congratulations !!! you won the game`;
      } else if (this.gameTime > 0) {
        gameRemaningTime.innerHTML = `Remaining Time : ${this.gameTime}`;
      } else {
        gameRemaningTime.innerHTML = `Sorry, Game Over !!! Better luck next time`;
      }
      // });
    }, 1000);
    this.keeperInterval = setInterval(() => {

    //   var keeperCount = 0;
      this.gameBoard.keepers.forEach(keeper => {
        // keeperCount++;
        // console.log("Keeper : " + keeperCount);
        // console.log("keeper.direction[1] :"+keeper.direction[1]);
        if (keeper.direction[1] >= 60) {
          keeper.direction[1] = 0;
          let randomNumber = Number(Math.floor(Math.random() * 4));
        //    console.log("randomNumber :" + randomNumber)
          
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
        // console.log("keeper.direction[0]" + keeper.direction[0]);
        switch (keeper.direction[0]) {
          case "l":
            if (keeper.direction[1] <= 60) {
            //   console.log("Move left");
              keeper.moveLeft(
                this.gameBoard.obstacles,
                this.gameBoard.surprises
              );
            }
            break;
          case "r":
            if (keeper.direction[1] <= 60) {
            //   console.log("Move Right");
              keeper.moveRight(
                this.gameBoard.obstacles,
                this.gameBoard.surprises
              );
            }
            break;
          case "s":
            if (keeper.direction[1] <= 60) {
            //   console.log("Move Down");
              keeper.moveDown(
                this.gameBoard.obstacles,
                this.gameBoard.surprises
              );
            }
            break;
          case "n":
            if (keeper.direction[1] <= 60) {
            //   console.log("Move Up");
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
        // console.log('keeper.x:' + keeper.x +" x: "+ this.player.x +" keeper.y : "+ keeper.y +" y: "+ this.player.y);
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
    // console.log("keepers"+ this.gameBoard.keepers);
    
    if(this.checkCollision()){
       this.player.lifeLeft--;
       this.player.speed = 0;
    }

    //console.log("this.isObstacleCreated :"+this.isObstacleCreated);
    this.player.draw(ctx);
    // console.log("this.keepers.length" + this.gameBoard.keepers.length);

    for (let i = 0; i < this.player.bullets.length; i++) {
      // console.log("this.gameBoard.obstacles : "+ this.gameBoard.obstacles);
    //   console.log("keepers"+ this.gameBoard.keepers);
      if (this.player.bullets[i].move(this.gameBoard.obstacles, this.gameBoard.keepers)) {
        this.player.bullets.splice(i, 1);
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
    if (
      this.gameTime > 0 &&
      this.player.lifeLeft > 0 &&
      !this.player.homeRached 
    ) {
      window.requestAnimationFrame(this.gameLoop.bind(this));
    }
  }
 
  keyFunction(e, player, obstacles, surprises) {
        switch (e.key) {
          case "ArrowLeft":
            // console.log("Move Left");
            player.moveLeft(obstacles, surprises);
            break;
          case "ArrowRight":
            // console.log("Move Right");
            player.moveRight(obstacles, surprises);
            break;
          case "ArrowUp":
            // console.log("Move Up");
            player.moveUp(obstacles, surprises);
            break;
          case "ArrowDown":
            // console.log("Move Down");
            player.moveDown(obstacles, surprises);
            break;
          case "s":
            // console.log("obstacles : "+obstacles)
            player.shoot(obstacles);
            break;
        }
        if (player.timeFound){
            this.gameTime += 20;
            player.timeFound = false;
        }
  }
  addListeners(player, obstacles, surprises) {
    
    // document.removeEventListener("keydown", this.keyFunction(event, player, obstacles, surprises));
    // document.addEventListener("keydown", this.keyFunction(event, player, obstacles, surprises));
    document.addEventListener("keydown", function(e) {
      switch (e.key) {
        case "ArrowLeft":
          // console.log("Move Left");
          player.moveLeft(obstacles, surprises);
          break;
        case "ArrowRight":
          // console.log("Move Right");
          player.moveRight(obstacles, surprises);
          break;
        case "ArrowUp":
          // console.log("Move Up");
          player.moveUp(obstacles, surprises);
          break;
        case "ArrowDown":
          // console.log("Move Down");
          player.moveDown(obstacles, surprises);
          break;
        case "s":
          // console.log("obstacles : "+obstacles)
          player.shoot(obstacles);
          break;
      }
    });
  }
}

const game = new Game();

// game.start();



