const build = document.querySelector(".build");
const c = build.getContext("2d");

var program = {
    width: 500,
    height: 500,
    gravity: 10,
    shootInterval: 500
};
var entities = [];
var mousePos = [-1, -1];

function init() {
    build.width = build.height = 750;

    ticker();
    draw();
    setInterval(() => {
        shoot();
    }, program.shootInterval);
}
init();
function ticker() {
    setTimeout(() => {
        ticker();
    }, 50);

    let w = program.width;
    let h = program.height;
    let x = build.width/2-(w/2);
    let y = build.height/2-h/2;
    
    entities.forEach((e, i) => {
        e[0]+=e[2][0];
        e[1]+=e[2][1];
        if(e[0]<x || e[0]>x+w) e[2][0]*=-1;
        if(e[1]<y) e[2][1]*=-1;
        if(e[1]>y+h) {
            entities.splice(i, 1);
        }
        e[2][1]+=program.gravity/10;
    });
}
function draw() {
    window.requestAnimationFrame(draw);

    let pw = program.width;
    let ph = program.height;
    let x = build.width/2-(pw/2);
    let y = build.height/2-ph/2;

    c.clearRect(0, 0, build.width, build.height);

    c.strokeStyle = "white";
    c.strokeRect(build.width/2-(pw/2), build.height/2-ph/2, pw, ph);
    c.strokeRect(0, 0, build.width, build.height);

    c.fillStyle = "white";
    entities.forEach((e, i) => {
        c.fillRect(e[0]-25, e[1]-25, 50, 50);
    });
}
function shoot() {
    let mx = mousePos[0];
    let my = mousePos[1];
    let px = build.width/2;
    let py = build.height/2;
    let dx = mx-px;
    let dy = my-py;
    let speed = Math.sqrt(dx*dx+dy*dy)/10;
    if(speed>10) speed = 10;

    let p2x = dx/speed;
    let p2y = dy/speed;

    entities.push([px, py, [p2x, p2y]]);
}

window.onmousemove = (e) => {
    mousePos = [e.clientX, e.clientY];
}