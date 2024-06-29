let canvas = document.querySelector("#flow-canvas");
let ctx = canvas.getContext("2d");
let noise;
let noiseSpeed = 0.0002;
let w, h, cols, rows;
let sliceZ = 0;
let noiseScale, fieldStrength;
let grid = 10;
let particles = [];
let colorRange, colorBase, opacity;

function setup(){
    reset();
    window.addEventListener("resize", reset);
}

function reset(){
    noise = new SimplexNoise();
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    cols = Math.floor(w/grid) + 1;
    rows = Math.floor(h/grid) + 1;
    createParticles();
    createField();
}

function createParticles() {
    let particleCount = w * h / 1000;
    for (let i = 0; i < particleCount; i++){
        let particle = new Particle(Math.random() * w, Math.random() * height);
        particles.push(particle);
    }
}

function draw(time){
    requestAnimationFrame(draw);
    updateField();
    sliceZ = time * noiseSpeed; // time-dependent noise variation (through z-space)
    drawParticles
}

function createField(){
    field = new Array(cols);
    for (let i = 0; i < cols; i++){
        field[i] = new Array(rows);
        for (let j = 0; j < rows; j++){
            field[i][j] = new Vector(0,0);
        }
    }
}

function updateField(){
    for (let i = 0; i < cols; i++){
        for (let j = 0; j < rows; j++){
            // Multiply by 2PI for full circular range of angles:
            let angle = noise.noise3D(i / noiseScale / 5, j / noiseScale / 5, sliceZ) * Math.PI * 2;
            // Divide to scale coordinates, add 50000 to shift noise pattern (prevent overlap with angle noise):
            let length = noise.noise3D(i / 50 + 50000, j / 50 + 50000, sliceZ) * fieldStrength / 20;
            field[i][j].setLength(length);
            field[i][j].setAngle(angle);
        }
    }
}

function drawParticles(){
    let pos = new Vector(0,0);
    // Map sine wave to color range:
    let hue = Math.sin(sliceZ) * colorRange + colorBase;
    // (hsla: hue, saturation, lightness, alpha)
    let color = 'hsla(${hue}, 100%, 50%, ${opacity/500})';
}