let canvas;
let ctx;
let backgroundImage = new Image(); 
var playerSelected = new Boolean(false);
var figures = [ //Figuren von oben links nach unten rechts (Groß: Schwarz, Klein: weiß)
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']];

var fieldX = 0; //Mouseclick Koordinaten
var fieldY = 0; //Mouseclick Koordinaten
var x; //Eckkoordinaten oben links des Feldes
var y; //Eckkoordinaten oben links des Feldes
var fieldNumberX = 0; //Feldzahl des ausgewählten Spielers
var fieldNumberY = 0; //Feldzahl des ausgewählten Spielers
var targetNumberX = 0; //Zielfeld
var targetNumberY = 0; //Zielfeld
var currentFigur = '0'; //aktuelle Figur


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

let bauer_black = {
    x: 25,
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

let bauer_weiss = {
    x: 25,
    y: 625,
    src: 'img/bauer_weiss.png'
};


// MOUSE EVENTS
function mouseListener() {
    
    fieldX = window.event.offsetX;
    fieldY = window.event.offsetY;

    if(playerSelected == false) {
        switch(true) {
            case (fieldX >= 725): x = 725; fieldNumberX = 7; break;
            case (fieldX >= 625): x = 625; fieldNumberX = 6; break;
            case (fieldX >= 525): x = 525; fieldNumberX = 5; break;
            case (fieldX >= 425): x = 425; fieldNumberX = 4; break;
            case (fieldX >= 325): x = 325; fieldNumberX = 3; break;
            case (fieldX >= 225): x = 225; fieldNumberX = 2; break;
            case (fieldX >= 125): x = 125; fieldNumberX = 1; break;
            case (fieldX >= 25): x = 25; fieldNumberX = 0; break;
            default: break;
        }
        switch(true) {
            case (fieldY >= 725): y = 725; fieldNumberY = 7; break;
            case (fieldY >= 625): y = 625; fieldNumberY = 6; break;
            case (fieldY >= 525): y = 525; fieldNumberY = 5; break;
            case (fieldY >= 425): y = 425; fieldNumberY = 4; break;
            case (fieldY >= 325): y = 325; fieldNumberY = 3; break;
            case (fieldY >= 225): y = 225; fieldNumberY = 2; break;
            case (fieldY >= 125): y = 125; fieldNumberY = 1; break;
            case (fieldY >= 25): y = 25; fieldNumberY = 0; break;
            default: break;
        }
        currentFigur = (figures[fieldNumberY][fieldNumberX]);
        console.log("fieldX: " + window.event.offsetX + " fieldY: " + window.event.offsetY);
        console.log("NumberX: " + fieldNumberX + " NumberY: " + fieldNumberY);
        console.log("Figur: " + currentFigur);
        playerSelected = true;
    }
    else 
    {
        switch(true) {
            case (fieldX >= 725): x = 725; targetNumberX = 7; break;
            case (fieldX >= 625): x = 625; targetNumberX = 6; break;
            case (fieldX >= 525): x = 525; targetNumberX = 5; break;
            case (fieldX >= 425): x = 425; targetNumberX = 4; break;
            case (fieldX >= 325): x = 325; targetNumberX = 3; break;
            case (fieldX >= 225): x = 225; targetNumberX = 2; break;
            case (fieldX >= 125): x = 125; targetNumberX = 1; break;
            case (fieldX >= 25): x = 25; targetNumberX = 0; break;
            default: break;
        }
        switch(true) {
            case (fieldY >= 725): y = 725; targetNumberY = 7; break;
            case (fieldY >= 625): y = 625; targetNumberY = 6; break;
            case (fieldY >= 525): y = 525; targetNumberY = 5; break;
            case (fieldY >= 425): y = 425; targetNumberY = 4; break;
            case (fieldY >= 325): y = 325; targetNumberY = 3; break;
            case (fieldY >= 225): y = 225; targetNumberY = 2; break;
            case (fieldY >= 125): y = 125; targetNumberY = 1; break;
            case (fieldY >= 25): y = 25; targetNumberY = 0; break;
            default: break;
        }
        console.log("TargetX: " + targetNumberX + " TargetY: " + targetNumberY);
        playerSelected = false;
    }

}

function startGame() {
    document.getElementById("canvas").addEventListener("click", mouseListener); //Mouse Listener
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    console.log("Start Game erfolgreich");
    loadImages();
    console.log("Load Images erfolgreich");
    initialDraw();
    console.log("Initial Draw erfolgreich");
    draw();
    //setInterval(update, 1000 / 25); //update wird 25 Mal in der Sekunde aufgerufen
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

    bauer_black.img = new Image();
    bauer_black.img.src = bauer_black.src;

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

    bauer_weiss.img = new Image();
    bauer_weiss.img.src = bauer_weiss.src;
}

function initialDraw() {

}

function draw() {
    ctx.drawImage(backgroundImage, 0, 0, 850, 850);
    if(playerSelected == true)
    {
        ctx.drawImage(selected.img, x, y,  figur.width, figur.height);
    }
    
    for (var i = 0; i < 8; i++) 
    {
        for (var j = 0; j < 8; j++) 
        {
            currentFigur = (figures[j][i]);
            if(getImageSrc(currentFigur) == 'empty') // leeres Feld
            {
            }
            else
            {
                ctx.drawImage(getImageSrc(currentFigur), getCoordinates(i), getCoordinates(j),  figur.width, figur.height);
            }
            
        }
    }
    requestAnimationFrame(draw);
}

function getImageSrc(c) { //gibt das passende Bild zu der Figur zurück
    var src;
    switch(c) {
        case 'R': src = turm_black.img; break;
        case 'N': src = pferd_black.img; break;
        case 'B': src = laeufer_black.img; break;
        case 'Q': src = dame_black.img; break;
        case 'K': src = koenig_black.img; break;
        case 'P': src = bauer_black.img; break;
        case 'r': src = turm_weiss.img; break;
        case 'n': src = pferd_weiss.img; break;
        case 'b': src = laeufer_weiss.img; break;
        case 'q': src = dame_weiss.img; break;
        case 'k': src = koenig_weiss.img; break;
        case 'p': src = bauer_weiss.img; break;
        default: src = 'empty';
    }
    return src;
}

function getCoordinates(i) {
    var coord;
    switch (i) {
        case 0: coord = 25; break;
        case 1: coord = 125; break;
        case 2: coord = 225; break;
        case 3: coord = 325; break;
        case 4: coord = 425; break;
        case 5: coord = 525; break;
        case 6: coord = 625; break;
        case 7: coord = 725; break;
    }
    return coord;
}

function update() {
    


}