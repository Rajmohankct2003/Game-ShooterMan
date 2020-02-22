// gameboard class
class GameBoard {
  constructor() {
    this.width = 630;
    this.height = 630;
    this.obstacles = [];
    this.surprises = [];
    this.keepersArray = [];
    this.keepers = [];
  }
  initialise() {
    const oldCanvas = document.getElementById("game-canvas");
    const body = document.getElementById("gameBoard");
    if (oldCanvas) {
      body.removeChild(oldCanvas);
      this.obstacles = [];
      this.surprises = [];
      this.keepersArray = [];
      this.keepers = [];
    }
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.id = "game-canvas";

    body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    this.ctx = ctx;
    this.base_image = new Image();
    this.base_image.src = "./brick-wall-icon.png";
    //this.base_image.src = "./soft-wall.png";

    this.keeper_image = new Image();
    this.keeper_image.src = "./Goomba-icon4.png";

    this.gate_image1 = new Image();
    this.gate_image1.src = "./door.png";

    this.gate_image2 = new Image();
    this.gate_image2.src = "./gate2.png";

    this.key_image = new Image();
    this.key_image.src = "./key.png";

    this.bomb_image = new Image();
    this.bomb_image.src = "./bomb.png";

    this.time_image = new Image();
    this.time_image.src = "./time1.png";

    this.bowser_image = new Image();
    this.bowser_image.src = "./bowser.png";
  }
  createGameBoard() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, 630, 630);
    this.ctx.fillStyle = "green";
    this.ctx.fill();
    this.ctx.closePath();

    for (let i = 0; i < 630; ) {
      for (let j = 0; j < 630; ) {
        if ((i / 30) % 2 !== 0 && (j / 30) % 2 !== 0) {
          this.ctx.beginPath();
          this.ctx.rect(i, j, 30, 30);
          this.ctx.fillStyle = "lightgrey";
          this.ctx.fill();
          this.ctx.closePath();
        }
        j = j + 30;
      }
      i = i + 30;
    }
  }

  checkArray(Arr1, xPosition, yPosition) {
    let elementPresent = false;
     Arr1.forEach(arr => {
      if (arr[0] === xPosition && arr[1] === yPosition) {
        elementPresent = true;
      }
    });
    return elementPresent;
  }

  createKeepers(level) {
    const numberOfKeepers = level * 3;
    for (let i = 0; i < numberOfKeepers ; ) {
      let xPosition = Number(Math.floor(Math.random() * 10)) * 60;
      let yPosition = Number(Math.floor(Math.random() * 10)) * 60;
      if (
        !(xPosition === 0 && yPosition === 0) &&
        !this.checkArray(this.obstacles,xPosition, yPosition) &&
        !this.checkArray(this.keepersArray,xPosition, yPosition)
      ) {
        i++;
        let keeper = new Keeper(xPosition + 15, yPosition + 15);
        this.keepers.push(keeper);
        this.keepersArray.push([xPosition + 15, yPosition + 15]);
      }
    }
  }

  createObstacles(level) {
    const numberOfObstacles = level * 50;
    for (let i = 0; i < numberOfObstacles; i++) {
      let xPosition = Number(Math.floor(Math.random() * 10)) * 60;
      let yPosition = Number(Math.floor(Math.random() * 10)) * 60;
      if (
        !(xPosition === 0 && yPosition === 0) &&
        !this.checkArray(this.obstacles,xPosition, yPosition)
      ) {
        // console.log("Value of i : " + i);
        // console.log("[xPosition, yPosition] : " + xPosition + ", " + yPosition);
        this.obstacles.push([xPosition, yPosition]);
      }
    }
  }

  createSurprises(level) {
    for (let i = 0; i < level * 10; i++) {
      let xPosition = this.obstacles[i][0];
      let yPosition = this.obstacles[i][1];
      if (i === 0) {
        this.surprises.push([xPosition, yPosition, "h"]);
      } else if (i === 1) {
        this.surprises.push([xPosition, yPosition, "b"]);
      } else if (i === 2) {
        this.surprises.push([xPosition, yPosition, "k"]);
      } else if (i === 3) {
        this.surprises.push([xPosition, yPosition, "t"]);
      } else if (i === 4) {
        this.surprises.push([xPosition, yPosition, "e"]);
      } else {
        this.surprises.push([xPosition, yPosition, "0"]);
      }
    }
    console.log("this.surprises" + this.surprises);
  }
  restoreObstacles() {
    this.obstacles.forEach(obstacle => {
      this.ctx.drawImage(this.base_image, obstacle[0], obstacle[1]);
    });
  }
  restoreKeepers() {
    this.keepers.forEach(keeper => {
      // console.log("keeper.x" + keeper.x, "y: " + keeper.y);
      this.ctx.drawImage(this.keeper_image, keeper.x-15, keeper.y-15);
    });
  }
  restoreSurprises() {
    this.surprises.forEach(surprise => {
      switch (surprise[2]) {
        case "h":
          this.ctx.drawImage(
            this.gate_image2,
            surprise[0] + 2,
            surprise[1] + 2
          );
          break;
        case "k":
          this.ctx.drawImage(this.key_image, surprise[0] + 2, surprise[1] + 2);
          break;
        case "b":
          this.ctx.drawImage(this.bomb_image, surprise[0] + 2, surprise[1] + 2);
          break;
        case "e":
          this.ctx.drawImage(
            this.bowser_image,
            surprise[0] + 2,
            surprise[1] + 2
          );
          break;
        case "t":
          this.ctx.drawImage(this.time_image, surprise[0] + 2, surprise[1] + 2);
          break;
        default:
          break;
      }
    });
  }
  // checkCollision(x, y) {
  //   return false;
  // }
}
