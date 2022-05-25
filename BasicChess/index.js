let canvas;
let ctx;
let backgroundImage = new Image(); 

let figur = {
    width: 100,
    height: 100,
};

let selected = {
    width: 100,
    height: 100,
    src: 'img/selected.png'
};

//--------------------Schwarze Figuren --------------------------------------
let turm_black = {
    x: 25,
    y: 25,
    src: 'img/turm_black.png'
};

let pferd_black = {
    x: 125,
    y: 25,
    src: 'img/pferd_black.png'
};

let laeufer_black = {
    x: 225,
    y: 25,
    src: 'img/laeufer_black.png'
};

let dame_black = {
    x: 325,
    y: 25,
    src: 'img/dame_black.png'
};

let koenig_black = {
    x: 425,
    y: 25,
    src: 'img/koenig_black.png'
};

let laeufer_black_2 = {
    x: 525,
    y: 25,
    src: 'img/laeufer_black.png'
};

let pferd_black_2 = {
    x: 625,
    y: 25,
    src: 'img/pferd_black.png'
};

let turm_black_2 = {
    x: 725,
    y: 25,
    src: 'img/turm_black.png'
};

let bauer_black_1 = {
    x: 25,
    y: 125,
    src: 'img/bauer_black.png'
};

let bauer_black_2 = {
    x: 125,
    y: 125,
    src: 'img/bauer_black.png'
};

let bauer_black_3 = {
    x: 225,
    y: 125,
    src: 'img/bauer_black.png'
};

let bauer_black_4 = {
    x: 325,
    y: 125,
    src: 'img/bauer_black.png'
};

let bauer_black_5 = {
    x: 425,
    y: 125,
    src: 'img/bauer_black.png'
};

let bauer_black_6 = {
    x: 525,
    y: 125,
    src: 'img/bauer_black.png'
};

let bauer_black_7 = {
    x: 625,
    y: 125,
    src: 'img/bauer_black.png'
};

let bauer_black_8 = {
    x: 725,
    y: 125,
    src: 'img/bauer_black.png'
};

//--------------------Weisse Figuren --------------------------------------

let turm_weiss = {
    x: 25,
    y: 725,
    src: 'img/turm_weiss.png'
};

let pferd_weiss = {
    x: 125,
    y: 725,
    src: 'img/pferd_weiss.png'
};

let laeufer_weiss = {
    x: 225,
    y: 725,
    src: 'img/laeufer_weiss.png'
};

let dame_weiss = {
    x: 325,
    y: 725,
    src: 'img/dame_weiss.png'
};

let koenig_weiss = {
    x: 425,
    y: 725,
    src: 'img/koenig_weiss.png'
};

let laeufer_weiss_2 = {
    x: 525,
    y: 725,
    src: 'img/laeufer_weiss.png'
};

let pferd_weiss_2 = {
    x: 625,
    y: 725,
    src: 'img/pferd_weiss.png'
};

let turm_weiss_2 = {
    x: 725,
    y: 725,
    src: 'img/turm_weiss.png'
};

let bauer_weiss_1 = {
    x: 25,
    y: 625,
    src: 'img/bauer_weiss.png'
};

let bauer_weiss_2 = {
    x: 125,
    y: 625,
    src: 'img/bauer_weiss.png'
};

let bauer_weiss_3 = {
    x: 225,
    y: 625,
    src: 'img/bauer_weiss.png'
};

let bauer_weiss_4 = {
    x: 325,
    y: 625,
    src: 'img/bauer_weiss.png'
};

let bauer_weiss_5 = {
    x: 425,
    y: 625,
    src: 'img/bauer_weiss.png'
};

let bauer_weiss_6 = {
    x: 525,
    y: 625,
    src: 'img/bauer_weiss.png'
};

let bauer_weiss_7 = {
    x: 625,
    y: 625,
    src: 'img/bauer_weiss.png'
};

let bauer_weiss_8 = {
    x: 725,
    y: 625,
    src: 'img/bauer_weiss.png'
};



// MOUSE EVENTS
function mouseListener() {
    console.log("X: " + window.event.offsetX + " Y: "
    + window.event.offsetY);
}

function startGame() {
    document.getElementById("canvas").addEventListener("click", mouseListener); //Mouse Listener
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    console.log("Start Game erfolgreich");
    loadImages();
    console.log("Load Images erfolgreich");
    draw();
    console.log("Draw erfolgreich");
}

function update() {

}

function loadImages() {
    backgroundImage.src = 'img/chessFieldWithRand.png';

    selected.img = new Image();
    selected.img.src = selected.src;

    //Schwarze Figuren
    turm_black.img = new Image();
    turm_black.img.src = turm_black.src;

    pferd_black.img = new Image();
    pferd_black.img.src = pferd_black.src;

    laeufer_black.img = new Image();
    laeufer_black.img.src = laeufer_black.src;

    dame_black.img = new Image();
    dame_black.img.src = dame_black.src;

    koenig_black.img = new Image();
    koenig_black.img.src = koenig_black.src;

    laeufer_black_2.img = new Image();
    laeufer_black_2.img.src = laeufer_black_2.src;

    pferd_black_2.img = new Image();
    pferd_black_2.img.src = pferd_black_2.src;

    turm_black_2.img = new Image();
    turm_black_2.img.src = turm_black_2.src;

    bauer_black_1.img = new Image();
    bauer_black_1.img.src = bauer_black_1.src;

    bauer_black_2.img = new Image();
    bauer_black_2.img.src = bauer_black_2.src;

    bauer_black_3.img = new Image();
    bauer_black_3.img.src = bauer_black_3.src;

    bauer_black_4.img = new Image();
    bauer_black_4.img.src = bauer_black_4.src;

    bauer_black_5.img = new Image();
    bauer_black_5.img.src = bauer_black_5.src;

    bauer_black_6.img = new Image();
    bauer_black_6.img.src = bauer_black_6.src;

    bauer_black_7.img = new Image();
    bauer_black_7.img.src = bauer_black_7.src;

    bauer_black_8.img = new Image();
    bauer_black_8.img.src = bauer_black_8.src;

    //Weisse Figuren
    turm_weiss.img = new Image();
    turm_weiss.img.src = turm_weiss.src;

    pferd_weiss.img = new Image();
    pferd_weiss.img.src = pferd_weiss.src;

    laeufer_weiss.img = new Image();
    laeufer_weiss.img.src = laeufer_weiss.src;

    dame_weiss.img = new Image();
    dame_weiss.img.src = dame_weiss.src;

    koenig_weiss.img = new Image();
    koenig_weiss.img.src = koenig_weiss.src;

    laeufer_weiss_2.img = new Image();
    laeufer_weiss_2.img.src = laeufer_weiss_2.src;

    pferd_weiss_2.img = new Image();
    pferd_weiss_2.img.src = pferd_weiss_2.src;

    turm_weiss_2.img = new Image();
    turm_weiss_2.img.src = turm_weiss_2.src;

    bauer_weiss_1.img = new Image();
    bauer_weiss_1.img.src = bauer_weiss_1.src;

    bauer_weiss_2.img = new Image();
    bauer_weiss_2.img.src = bauer_weiss_2.src;

    bauer_weiss_3.img = new Image();
    bauer_weiss_3.img.src = bauer_weiss_3.src;

    bauer_weiss_4.img = new Image();
    bauer_weiss_4.img.src = bauer_weiss_4.src;

    bauer_weiss_5.img = new Image();
    bauer_weiss_5.img.src = bauer_weiss_5.src;

    bauer_weiss_6.img = new Image();
    bauer_weiss_6.img.src = bauer_weiss_6.src;

    bauer_weiss_7.img = new Image();
    bauer_weiss_7.img.src = bauer_weiss_7.src;

    bauer_weiss_8.img = new Image();
    bauer_weiss_8.img.src = bauer_weiss_8.src;
}

function draw() {
    ctx.drawImage(backgroundImage, 0, 0, 850, 850);

    ctx.drawImage(selected.img, 125, 125,  figur.width, figur.height);

    //Schwarze Figuren
    ctx.drawImage(turm_black.img, turm_black.x, turm_black.y,  figur.width, figur.height);
    ctx.drawImage(pferd_black.img, pferd_black.x, pferd_black.y,  figur.width, figur.height);
    ctx.drawImage(laeufer_black.img, laeufer_black.x, laeufer_black.y,  figur.width, figur.height);
    ctx.drawImage(dame_black.img, dame_black.x, dame_black.y,  figur.width, figur.height);
    ctx.drawImage(koenig_black.img, koenig_black.x, koenig_black.y,  figur.width, figur.height);
    ctx.drawImage(laeufer_black_2.img, laeufer_black_2.x, laeufer_black_2.y,  figur.width, figur.height);
    ctx.drawImage(pferd_black_2.img, pferd_black_2.x, pferd_black_2.y,  figur.width, figur.height);
    ctx.drawImage(turm_black_2.img, turm_black_2.x, turm_black_2.y,  figur.width, figur.height);
    ctx.drawImage(bauer_black_1.img, bauer_black_1.x, bauer_black_1.y,  figur.width, figur.height);
    ctx.drawImage(bauer_black_2.img, bauer_black_2.x, bauer_black_2.y,  figur.width, figur.height);
    ctx.drawImage(bauer_black_3.img, bauer_black_3.x, bauer_black_3.y,  figur.width, figur.height);
    ctx.drawImage(bauer_black_4.img, bauer_black_4.x, bauer_black_4.y,  figur.width, figur.height);
    ctx.drawImage(bauer_black_5.img, bauer_black_5.x, bauer_black_5.y,  figur.width, figur.height);
    ctx.drawImage(bauer_black_6.img, bauer_black_6.x, bauer_black_6.y,  figur.width, figur.height);
    ctx.drawImage(bauer_black_7.img, bauer_black_7.x, bauer_black_7.y,  figur.width, figur.height);
    ctx.drawImage(bauer_black_8.img, bauer_black_8.x, bauer_black_8.y,  figur.width, figur.height);

    //Weisse Figuren
    ctx.drawImage(turm_weiss.img, turm_weiss.x, turm_weiss.y,  figur.width, figur.height);
    ctx.drawImage(pferd_weiss.img, pferd_weiss.x, pferd_weiss.y,  figur.width, figur.height);
    ctx.drawImage(laeufer_weiss.img, laeufer_weiss.x, laeufer_weiss.y,  figur.width, figur.height);
    ctx.drawImage(dame_weiss.img, dame_weiss.x, dame_weiss.y,  figur.width, figur.height);
    ctx.drawImage(koenig_weiss.img, koenig_weiss.x, koenig_weiss.y,  figur.width, figur.height);
    ctx.drawImage(laeufer_weiss_2.img, laeufer_weiss_2.x, laeufer_weiss_2.y,  figur.width, figur.height);
    ctx.drawImage(pferd_weiss_2.img, pferd_weiss_2.x, pferd_weiss_2.y,  figur.width, figur.height);
    ctx.drawImage(turm_weiss_2.img, turm_weiss_2.x, turm_weiss_2.y,  figur.width, figur.height);
    ctx.drawImage(bauer_weiss_1.img, bauer_weiss_1.x, bauer_weiss_1.y,  figur.width, figur.height);
    ctx.drawImage(bauer_weiss_2.img, bauer_weiss_2.x, bauer_weiss_2.y,  figur.width, figur.height);
    ctx.drawImage(bauer_weiss_3.img, bauer_weiss_3.x, bauer_weiss_3.y,  figur.width, figur.height);
    ctx.drawImage(bauer_weiss_4.img, bauer_weiss_4.x, bauer_weiss_4.y,  figur.width, figur.height);
    ctx.drawImage(bauer_weiss_5.img, bauer_weiss_5.x, bauer_weiss_5.y,  figur.width, figur.height);
    ctx.drawImage(bauer_weiss_6.img, bauer_weiss_6.x, bauer_weiss_6.y,  figur.width, figur.height);
    ctx.drawImage(bauer_weiss_7.img, bauer_weiss_7.x, bauer_weiss_7.y,  figur.width, figur.height);
    ctx.drawImage(bauer_weiss_8.img, bauer_weiss_8.x, bauer_weiss_8.y,  figur.width, figur.height);
    requestAnimationFrame(draw);
}