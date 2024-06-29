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
        if (this.vel.getLength() > 1){
            this.vel.setLength(1);
        }
        this.acc.setLength(0);
    }
}