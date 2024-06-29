let canvas = document.querySelector("#flow-canvas");
let ctx = canvas.getContext("2d");
let noise;
let noiseSpeed = 0.0002;
let w, h, cols, rows;
let noiseZ = 0;
let grid = 10;
let particles = [];

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
    initParticles();
    initField();
}

function initParticles() {
    let particleCount = w * h / 1000;
    for (let i = 0; i < particleCount; i++){
        let particle = new Particle(Math.random() * w, Math.random() * height);
        particles.push(particle);
    }
}

function draw(time){
    requestAnimationFrame(draw);
    calculateField();
    noiseZ = time * noiseSpeed;
    drawParticles
}

function initField(){
    field = new Array(cols);
    for (let i = 0; i < cols; i++){
        field[i] = new Array(rows);
        for (let j = 0; j < rows; j++){
            field[i][j] = new Vector(0,0);
        }
    }
}

function calculateField(){

}

function drawParticles(){

}