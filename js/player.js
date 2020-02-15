class Player {
    constructor() {
        this.speed = 5;
        this.shootingPower = false;
        this.health = 100;
        this.lifeLeft = 3;
        this.points = 0;
        this.radius = 10;
        this.x = 15;
        this.y = 15;
        this.mario_image = new Image();
        this.mario_image.src = './Paper-Mario-icon.png';
        this.direction = 'r';
        this.bullets = [];
    }

    draw(ctx) {
        // ctx.beginPath()
        // ctx.fillStyle = "red"
        // ctx.arc(this.x, this.y, this.radius, 0, (Math.PI/180) * 360)
        // ctx.fill()
        // ctx.closePath()
         ctx.drawImage(this.mario_image, this.x - 15, this.y - 15); 
    }

    shoot(obstacles) {
        console.log("Inside Shoot obstacles : "+obstacles);
        let bullet = new Bullet(this.direction, this.x, this.y);
        this.bullets.push(bullet);
    }

    moveLeft(obstacles) {
        this.direction = 'l';
        let newXPosition;
        let yPosition = Number(Math.floor(this.y/ 30));
        if (yPosition % 2 !== 1){
            if( this.y % 30 < this.radius ) {
                yPosition--;
            } else if (this.y % 30 > (30 - this.radius)) {
                yPosition++;
            }
        }
        if (this.x > this.radius) {
            if (yPosition % 2 === 1 ){
                let distance = this.x % 30;
                if (distance > this.radius){
                this.x -= distance - this.radius;
               }
            } else{
                newXPosition = this.x - this.speed;
                if (!this.checkObstacles((newXPosition - this.radius), this.y, obstacles)){
                 this.x = newXPosition;
                } 
            }
        } 
    }

    moveRight(obstacles) {
        this.direction = 'r';
        let newXPosition;
        let yPosition = Number(Math.floor(this.y / 30));
        if (yPosition % 2 !== 1){
            if( this.y % 30 < this.radius ) {
                yPosition--;
            } else if (this.y % 30 > (30 - this.radius)) {
                yPosition++;1
            }
        }

        if (this.x < ( 630 - this.radius)) {
            if (yPosition % 2 === 1) {
                let distance = (30 - (this.x % 30));
                if (distance > this.radius){
                this.x += distance - this.radius;
               }
            } else{
               newXPosition = this.x + this.speed;
               if (!this.checkObstacles((newXPosition + this.radius), this.y, obstacles)){
                this.x = newXPosition;
               } 
            }
         }
    }

    moveUp(obstacles) {
        this.direction = 'n';
        let newYPosition;
        let xPosition = Number(Math.floor(this.x / 30));
        if (xPosition % 2 !== 1) {
            if( this.x % 30 < this.radius ) {
                xPosition--;
            } else if (this.x % 30 > (30 - this.radius)) {
                xPosition++;
            }
        }

        if (this.y > this.radius ) {
            if (xPosition % 2 === 1) {
                let distance = this.y % 30;
                if (distance > this.radius){
                this.y -= distance - this.radius;
               }
            } else{
               newYPosition = this.y - this.speed;
               if (!this.checkObstacles(this.x, (newYPosition - this.radius) , obstacles)){
                  this.y = newYPosition;
               }               
            }
         }
    }

    moveDown(obstacles) {
        this.direction = 's';
        // console.log("obstacles" + obstacles);
        let newYPosition;
        let xPosition = Number(Math.floor(this.x / 30));
        if (xPosition % 2 !== 1) {
            if( this.x % 30 < this.radius ) {
                xPosition--;
            } else if (this.x % 30 > (30 - this.radius)) {
                xPosition++;
            }
        }
        
        if (this.y < (630 - this.radius) ) {
            if (xPosition % 2 === 1) {
                let distance = (30 - (this.y % 30));
                if (distance > this.radius){
                this.y += distance - this.radius;
               }
            } else{
                newYPosition = this.y + this.speed;
                if (!this.checkObstacles(this.x, (newYPosition + this.radius), obstacles)){
                   this.y = newYPosition;
                }   
            }
         }
    }
    checkObstacles(x,y, obstacles) {
      console.log("Inside check obstacles : "+obstacles);
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