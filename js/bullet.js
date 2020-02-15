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
        ctx.arc(this.x, this.y, 5, 0, (Math.PI/180) * 360);
        ctx.fill();
        ctx.closePath();
        // ctx.drawImage(this.mario_image, this.x - 15, this.y - 15); 
    }
    move(obstacles) {
    // console.log("obstacles : " + obstacles);
    let newX;
    let newY;
    switch(this.direction) {
        case 'l':
            console.log("Move Left");
            newX = this.x - this.speed;
            if(!this.checkObstacles(newX, this.y, obstacles )){
               this.x = newX;
            } else {
                
              console.log("hit obstacles");
            }
            break;
        case 'r':
            // console.log("Move Right");
            newX = this.x + this.speed;
            if(!this.checkObstacles(this.x, this.y, obstacles)){
                this.x = newX;
            } else {
                console.log("hit obstacles");
            }
            break;
        case 'n':
            // console.log("Move Up");
            newY = this.y - this.speed;
            if(!this.checkObstacles(this.x, newY, obstacles)){
                this.y = newY;
            }
            break;
        case 's':
            // console.log("Shoot");
            newY = this.y + this.speed;
            if(!this.checkObstacles(this.x, newY, obstacles)){
                this.y = newY;
            }
            break;
        } 
  }
  checkObstacles(x,y, obstacles) {
    // console.log("obstacles : "+obstacles);
    let hitObstacle = false;
     obstacles.map(obstacle => {
          // console.log("obstacles0: " + obstacle[0] +" 1: "+ obstacle[1] +" x: "+ x +" y: "+ y);
          if ((x >= obstacle[0]) && (x <= (obstacle[0] + 30))){
              if ( (y >= obstacle[1]) && (y <= (obstacle[1] + 30))){
                  hitObstacle = true;                    
              }
          }
      })  
      return hitObstacle;     
    }
}