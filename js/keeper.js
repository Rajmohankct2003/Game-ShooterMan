class Keeper {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.speed = 30;
        this.shootingPower = false;
        this.health = 3;
        this.points = 0;
        this.radius = 15;
        this.direction = ['r',1];
        this.bullets = [];
        this.bulletPower = true;
        this.keyFound = false;
        this.homeRached = false; 
    }

    moveLeft(obstacles, surprises) {
        this.direction[0] = "l";
        this.direction[1]++;
        let newXPosition;
        let yPosition = Number(Math.floor(this.y / 30));
        if (yPosition % 2 !== 1) {
          if (this.y % 30 < this.radius) {
            yPosition--;
          } else if (this.y % 30 > 30 - this.radius) {
            yPosition++;
          }
        }
        if (this.x > this.radius) {
          if (yPosition % 2 === 1) {
            this.direction[1] = 60;
            let distance = this.x % 30;
            if (distance > this.radius) {
              this.bulletPower = false;
              this.x -= distance - this.radius;
            }
          } else {
            this.bulletPower = true;
            newXPosition = this.x - this.speed;
            if (
              !this.checkObstacles(newXPosition - this.radius, this.y, obstacles)
            ) {
              this.x = newXPosition;
            } else {
              this.direction[1] = 60;
            }
          }
        } else {
          this.direction[1] = 60;
        }
      }
    
      moveRight(obstacles, surprises) {
        this.direction[0] = "r";
        this.direction[1]++;
        let newXPosition;
        let yPosition = Number(Math.floor(this.y / 30));
        if (yPosition % 2 !== 1) {
          
          if (this.y % 30 < this.radius) {
            yPosition--;
          } else if (this.y % 30 > 30 - this.radius) {
            yPosition++;
          }
        }
    
        if (this.x < 630 - this.radius) {
          if (yPosition % 2 === 1) {
            this.direction[1] = 60;
            this.bulletPower = false;
            let distance = 30 - (this.x % 30);
            if (distance > this.radius) {
              this.x += distance - this.radius;
            }
          } else {
            this.bulletPower = true;
            newXPosition = this.x + this.speed;
            if (
              !this.checkObstacles(newXPosition + this.radius, this.y, obstacles)
            ) {
              this.x = newXPosition;
            } else {
              this.direction[1] = 60;
            }
          }
        } else {
          this.direction[1] = 60;
        }
      }
    
      moveUp(obstacles, surprises) {
        this.direction[0] = "n";
        this.direction[1]++;
        let newYPosition;
        let xPosition = Number(Math.floor(this.x / 30));
        if (xPosition % 2 !== 1) {
          if (this.x % 30 < this.radius) {
            xPosition--;
          } else if (this.x % 30 > 30 - this.radius) {
            xPosition++;
          }
        }
    
        if (this.y > this.radius) {
          if (xPosition % 2 === 1) {
            this.direction[1] = 60;
            this.bulletPower = false;
            let distance = this.y % 30;
            if (distance > this.radius) {
              this.y -= distance - this.radius;
            }
          } else {
            this.bulletPower = true;
            newYPosition = this.y - this.speed;
            if (
              !this.checkObstacles(this.x, newYPosition - this.radius, obstacles)
            ) {
              this.y = newYPosition;
            } else {
                this.direction[1] = 60;
            }
          }
        } else {
          this.direction[1] = 60;
        }
      }
    
      moveDown(obstacles, surprises) {
        this.direction[0] = "s";
        this.direction[1]++;
        // console.log("this.x " +this.x + "this.y " + this.y);
        // console.log("obstacles" + obstacles);
        let newYPosition;
        let xPosition = Number(Math.floor(this.x / 30));
        if (xPosition % 2 !== 1) {
          if (this.x % 30 < this.radius) {
            xPosition--;
          } else if (this.x % 30 > 30 - this.radius) {
            xPosition++;
          }
        }
    
        if (this.y < 630 - this.radius) {
          if (xPosition % 2 === 1) {
            this.direction[1] = 60;
            this.bulletPower = false;
            let distance = 30 - (this.y % 30);
            if (distance > this.radius) {
              this.y += distance - this.radius;
            }
          } else {
            this.bulletPower = true;
            newYPosition = this.y + this.speed;
            if (
              !this.checkObstacles(this.x, newYPosition + this.radius, obstacles)
            ) {
              this.y = newYPosition;
            } else {
                this.direction[1] = 60;
            }
          }
        } else {
          this.direction[1] = 60;
        }
      }
      checkObstacles(x, y, obstacles) {
        // console.log("Inside check obstacles : " + obstacles);
        let hitObstacle = false;
        obstacles.map(obstacle => {
          // console.log("obstacles0: " + obstacle[0] +" 1: "+ obstacle[1] +" x: "+ x +" y: "+ y);
          if (x >= obstacle[0] && x <= obstacle[0] + 30) {
            if (y >= obstacle[1] && y <= obstacle[1] + 30) {
              // console.log("obstacles0: " + obstacle[0] +" 1: "+ obstacle[1] +" x: "+ x +" y: "+ y);
              hitObstacle = true;
            }
          }
        });
        return hitObstacle;
      } 

}