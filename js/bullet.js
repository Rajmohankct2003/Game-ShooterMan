class Bullet {
  constructor(direction, x, y) {
    this.direction = direction;
    this.speed = 1;
    this.x = x;
    this.y = y;
    this.move([],[]);
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(this.x, this.y, 5, 0, (Math.PI / 180) * 360);
    ctx.fill();
    ctx.closePath();
    // ctx.drawImage(this.mario_image, this.x - 15, this.y - 15);
  }
  move(obstacles, keepers) {
    // console.log("keepers[0] : " + keepers[0]);
    let newX;
    let newY;
    let hitObstacle = false;
    let hitKeeper = false;
    switch (this.direction) {
      case "l":
        // console.log("Move Left");
        newX = this.x - this.speed;
        if (newX < 0 ){
            hitObstacle = true;
        } else {
            if(obstacles.length > 0) {
              hitObstacle = this.checkObstacles(newX, this.y, obstacles);
            } 
            if(keepers.length > 0 ){
              hitKeeper = this.checkKeeperCollision(newX, this.y, keepers);
            }
        }
        if (!hitObstacle && !hitKeeper) {
          this.x = newX;
        } else {
          console.log("hit obstacles 1");
        }
        break;
      case "r":
        // console.log("Move Right");
        newX = this.x + this.speed;
        if (newX > 630 ){
            hitObstacle = true;
        } else {
          if(obstacles.length > 0) {
            hitObstacle = this.checkObstacles(newX, this.y, obstacles);
          } 
          if(keepers.length > 0 ){
            hitKeeper = this.checkKeeperCollision(newX, this.y, keepers);
          }
        }
        if (!hitObstacle && !hitKeeper) {
          this.x = newX;
        } else {
          console.log("hit obstacles 2");
        }
        break;
      case "n":
        // console.log("Move Up");
        newY = this.y - this.speed;
        if (newY < 0 ){
            hitObstacle = true;
        } else {
          if(obstacles.length > 0) {
            hitObstacle = this.checkObstacles(this.x, newY, obstacles);
          } 
          if(keepers.length > 0 ){
            hitKeeper = this.checkKeeperCollision(this.x, newY, keepers);
          }
        }       
        if (!hitObstacle && !hitKeeper) {
          this.y = newY;
        }else {
            console.log("hit obstacles 3");
          }
        break;
      case "s":
        // console.log("bullet move down");
        newY = this.y + this.speed;
        if (newY > 630 ){
            hitObstacle = true;
        } else {
          if(obstacles.length > 0) {
            hitObstacle = this.checkObstacles(this.x, newY, obstacles);
          } 
          if(keepers.length > 0 ){
            hitKeeper = this.checkKeeperCollision(this.x, newY, keepers);
          }
        } 
        if (!hitObstacle && !hitKeeper) {
            this.y = newY;
          }
        else {
            console.log("hit obstacles 4");
          }
        break;
    }
    return (hitObstacle || hitKeeper);
  }
  checkObstacles(x, y, obstacles) {
    // console.log("obstacles : "+obstacles);
    let hitObstacle = false;
    let index = 0;
    obstacles.map(obstacle => {
      // console.log("obstacles0: " + obstacle[0] +" 1: "+ obstacle[1] +" x: "+ x +" y: "+ y);
      if (x >= obstacle[0] && x <= obstacle[0] + 30) {
        if (y >= obstacle[1] && y <= obstacle[1] + 30) {
          obstacles.splice(index, 1);
          hitObstacle = true;
        }
      }
      index++;
    });
    return hitObstacle;
  }

  checkKeeperCollision(x, y, keepers){
    let hitKeeper = false;
    let index = 0;
    keepers.map(keeper => {      
      if (x >= (keeper.x - 15) && x <= (keeper.x + 15)) {
        if (y >= (keeper.y - 15) && y <= (keeper.y + 15)) {
          keeper.health--;
          if(keeper.health === 0 ){
            keepers.splice(index, 1);
          }         
          hitKeeper = true;
        }
      }
      index++;
    });
    return hitKeeper;    
  }
}
