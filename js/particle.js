class Particle {
    constructor(x, y){
        this.pos = new Vector(x,y);
        this.prevPos = new Vector(x,y);
        // Random direction:
        this.vel = new Vector(Math.random() - 0.5, Math.random() - 0.5);
        this.acc = new Vector(0,0);
    }

    move(acc){
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
        if (acc) {
            this.acc.addTo(acc);
        }
        this.vel.addTo(this.acc)
        this.pos.addTo(this.vel);
        if (this.vel.getLength() > 1){
            this.vel.setLength(1);
        }
        this.acc.setLength(0);
    }

    // Wrap out of bounds particles:
    wrap(w, h){
        if (this.pos.x > w) this.prevPos.x = this.pos.x = 0;
        else if (this.pos.x < -1) this.prevPos.x = this.pos.x = w - 1;
        if (this.pos.y > h) this.prevPos.y = this.pos.y = 0;
        else if (this.pos.y < -1) this.prevPos.y = this.pos.y = h - 1;
    }

    drawLine(){
        ctx.beginPath();
        ctx.moveTo(this.prevPos.x, this.prevPos.y);
        ctx.lineTo(this.pos.x, this.pos.y);
        ctx.stroke();
    }
}