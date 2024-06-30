let canvas = document.querySelector("#flow-canvas");
let ctx = canvas.getContext("2d");
let noise = new SimplexNoise();
let noiseSpeed = 0.0002;
let w, h, cols, rows;
let sliceZ = 0;
let noiseScale = 25, fieldStrength = 1;
let grid = 10;
let particles;
let colorRange = 100, colorBase, opacity = 5000;
let alphaClear = .2;

function setup(){
    reset();
    window.addEventListener("resize", debounce(reset, 100));
}

function reset(){
    colorBase = Math.random() * 360;
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    cols = Math.floor(w/grid) + 1;
    rows = Math.floor(h/grid) + 1;
    drawBackground(1);
    createParticles();
    createField();
}

function createParticles() {
    particles = [];
    let particleCount = w * h / 200;
    for (let i = 0; i < particleCount; i++){
        let particle = new Particle(Math.random() * w, Math.random() * h);
        particles.push(particle);
    }
}

function draw(time){
    drawBackground();
    requestAnimationFrame(draw);
    updateField();
    sliceZ = time * noiseSpeed; // time-dependent noise variation (through z-space)
    drawParticles();
}

function createField(){
    field = new Array(cols);
    for (let i = 0; i < cols; i++){
        field[i] = new Array(cols);
        for (let j = 0; j < rows; j++){
            field[i][j] = new Vector(0,0);
        }
    }
}

function updateField(){
    for (let i = 0; i < cols; i++){
        for (let j = 0; j < rows; j++){
            // Multiply by 2PI for full circular range of angles:
            let angle = noise.noise3D(i / noiseScale / 5, j / noiseScale / 5 , sliceZ) * Math.PI * 2;
            // Divide to scale coordinates, add 50000 to shift noise pattern (prevent overlap with angle noise):
            let length = noise.noise3D(i / 50 + 50000, j / 50 + 50000, sliceZ) * fieldStrength / 20;
            let v = new Vector(0, length);
            v.setAngle(angle);
            field[i][j] = v;
        }
    }
}

function drawParticles(){
    // Map sine wave to color range:
    let hue = Math.sin(sliceZ) * colorRange + colorBase;
    // (hsla: hue, saturation, lightness, alpha)
    let color = `hsla(${hue}, 100%, 50%, ${opacity/500})`;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    particles.forEach(p => {
        p.drawLine();
        let pos = new Vector(0,0);
        pos.x = p.pos.x / grid;
        pos.y = p.pos.y / grid;
        let v;
        if (pos.x >= 0 && pos.x < cols && pos.y >= 0 && pos.y < rows){
            v = field[Math.floor(pos.x)][Math.floor(pos.y)];
        }
        p.move(v)
        p.wrap(w,h);
    })
}

function drawBackground(alpha){
    ctx.fillStyle = `rgba(0,0,0,${alpha || alphaClear})`;
    ctx.fillRect(0,0,w,h);
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

setup();
draw(performance.now());