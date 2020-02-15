class Bullet {
  constructor(direction, x, y) {
    this.direction = direction;
    this.speed = 1;
    this.x = x;
    this.y = y;
    this.move([]);
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(this.x, this.y, 5, 0, (Math.PI / 180) * 360);
    ctx.fill();
    ctx.closePath();
    // ctx.drawImage(this.mario_image, this.x - 15, this.y - 15);
  }
  move(obstacles) {
    // console.log("obstacles : " + obstacles);
    let newX;
    let newY;
    let hitObstacle = false;
    switch (this.direction) {
      case "l":
        // console.log("Move Left");
        newX = this.x - this.speed;
        if (newX < 0 ){
            hitObstacle = true;
        } else {
            hitObstacle = this.checkObstacles(newX, this.y, obstacles);
        }
        if (!hitObstacle) {
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
            hitObstacle = this.checkObstacles(newX, this.y, obstacles);
        }
        if (!hitObstacle) {
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
            hitObstacle = this.checkObstacles(this.x, newY, obstacles);
        }       
        if (!hitObstacle) {
          this.y = newY;
        }else {
            console.log("hit obstacles 3");
          }
        break;
      case "s":
        console.log("bullet move down");
        newY = this.y + this.speed;
        if (newY > 630 ){
            hitObstacle = true;
        } else {
            hitObstacle = this.checkObstacles(this.x, newY, obstacles);
        } 
        if (!hitObstacle) {
          this.y = newY;
        }else {
            console.log("hit obstacles 4");
          }
        break;
    }
    return hitObstacle;
  }
  checkObstacles(x, y, obstacles) {
    // console.log("obstacles : "+obstacles);
    let hitObstacle = false;
    let index = 0;
    obstacles.map(obstacle => {
      // console.log("obstacles0: " + obstacle[0] +" 1: "+ obstacle[1] +" x: "+ x +" y: "+ y);
      if (x >= obstacle[0] && x <= obstacle[0] + 30) {
        if (y >= obstacle[1] && y <= obstacle[1] + 30) {
          console.log("Length of Obstacles array before" + obstacles.length) ;
          obstacles.splice(index, 1);
          console.log("Length of Obstacles array after" + obstacles.length) ;
          hitObstacle = true;
        }
      }
      index++;
    });
    return hitObstacle;
  }
}
