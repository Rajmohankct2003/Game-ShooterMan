class Keeper {
    constructor() {
        this.x = 580;
        this.y = Math.random() * 500;
        this.radius = (Math.random() * 50) + 20;
        this.speed = Math.random() * 20;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(this.x, this.y, this.radius, 0, (Math.PI/180) * 360);
        ctx.fill();
    }
}