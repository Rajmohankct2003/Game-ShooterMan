// gameboard class
class GameBoard {
  constructor() {
    this.width = 630;
    this.height = 630;
    this.obstacles = [];
    this.surprise = [];
    this.keepers = [];
  }
  initialise() {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.id = "game-canvas";

    const body = document.getElementById("gameBoard");
    body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    this.ctx = ctx;
    this.base_image = new Image();
    this.base_image.src = './brick-wall-icon.png';

    this.keeper_image = new Image();
    this.keeper_image.src = './Goomba-icon.png'; 

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

  createObstacles(level) {
    const numberOfObstacles = level * 30;
    for (let i = 0; i < numberOfObstacles; i++) {
      let xPosition = Number(Math.floor(Math.random() * 12)) * 60;
      let yPosition = Number(Math.floor(Math.random() * 12)) * 60;
      this.obstacles.push([xPosition, yPosition]);
      this.ctx.beginPath();
      this.ctx.rect(xPosition, yPosition, 30, 30);
      this.ctx.fillStyle = "lightblue";
      this.ctx.fill();
      this.ctx.closePath();
    }
  }
  restoreObstacles(){
      this.obstacles.forEach(obstacle =>{
        this.ctx.drawImage(this.base_image, obstacle[0], obstacle[1]);  
      })
  }
  checkCollision(x,y) {
    return false;
  }
}

// let gameBoard = new GameBoard;
// gameBoard.initialise();
// gameBoard.createGameBoard();
