let canvas;
let ctx;
let backgroundImage = new Image();
let backgroundImageRotated = new Image(); 
var playerSelected = false;
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
var currentFigur = '0'; //aktuelle Figur Array
var currentFigurDraw = '0'; //aktuelle Figur Zeichnung

//Zeitanzeige
Jetzt = new Date();  //neues Datumsobjekt mit aktuellem Zeitpunkt
var Start = (Jetzt.getTime()) + 300000; //getTime(): absolute Zahl in Millisekunden + 5 Minuten
var zeitanzeigeCom; //Computer
var zeitanzeigePl; //Player

var playerTurn = true; //Spieler ist zu Beginn am Zug

//Zug zurück
var lastMove = ['0', '0', '0', '0']; //X & Y Pos Startfeld, X & Y Pos Zielfeld
var zugCounter = 0;
//Variablen für farbige Markierung des letzten Zuges
var x1, x2;
var y1, y2;

var boolNewGame = true; //neue Partie
var fieldRotated = false; //Brett gedreht
var figurBeaten = false;

let figur = {
    width: 100,
    height: 100,
};

let selected = {
    width: 100,
    height: 100,
    src: 'img/selected.png'
};

let selected2 = {
    width: 100,
    height: 100,
    src: 'img/selected2.png'
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

        if(currentFigur != '0')
        {
            console.log("fieldX: " + window.event.offsetX + " fieldY: " + window.event.offsetY);
            console.log("NumberX: " + fieldNumberX + " NumberY: " + fieldNumberY);
            console.log("Figur: " + currentFigur);
            lastMove[0] = fieldNumberX;
            lastMove[1] = fieldNumberY;
            playerSelected = true;
        }
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
        if((fieldNumberX == targetNumberX) && (fieldNumberY == targetNumberY))
        {
            playerSelected = false;
        }
        else
        {
            if((figures[targetNumberY][targetNumberX]) != '0') // Figur geschlagen
            {
                figurBeaten = true;
            }
            else
            {
                figurBeaten = false;
            }
            if(boolNewGame)
            {
                boolNewGame = false;
                Jetzt = new Date();  //neues Datumsobjekt mit aktuellem Zeitpunkt
                Start = (Jetzt.getTime()) + 300000; //getTime(): absolute Zahl in Millisekunden + 5 Minuten
            }
            console.log("TargetX: " + targetNumberX + " TargetY: " + targetNumberY);
            playerSelected = false;

            //Aktualisierung der Figurenposition im Array
            figures[targetNumberY][targetNumberX] = currentFigur;
            figures[fieldNumberY][fieldNumberX] = '0';

            lastMove[2] = targetNumberX;
            lastMove[3] = targetNumberY;
            zugCounter++;
            zugfolge();
            //Speichert Koordinaten für den zuletzt getätigten Zug
            x1 = getCoordinates(lastMove[0]);
            y1 = getCoordinates(lastMove[1]);
            x2 = getCoordinates(lastMove[2]);
            y2 = getCoordinates(lastMove[3]);
        }
        
    }
}

function startGame() {
    document.getElementById("canvas").addEventListener("click", mouseListener); //Mouse Listener
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    zeitanzeigeCom = document.getElementById('AnzeigefeldCom');
    zeitanzeigePl = document.getElementById('AnzeigefeldPl');
    
    console.log("Start Game erfolgreich");
    loadImages();
    console.log("Load Images erfolgreich");
    draw();
    //setInterval(update, 1000 / 25); //update wird 25 Mal in der Sekunde aufgerufen
}

function loadImages() {
    backgroundImage.src = 'img/chessFieldWithRand.png';
    backgroundImageRotated.src = 'img/chessFieldRotated.png';

    selected.img = new Image();
    selected.img.src = selected.src;

    selected2.img = new Image();
    selected2.img.src = selected2.src;

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

function draw() {  //Zeichnet die Bilder auf das Canvas
    if(fieldRotated)
    {
        ctx.drawImage(backgroundImageRotated, 0, 0, 850, 850);
    }
    else
    {
        ctx.drawImage(backgroundImage, 0, 0, 850, 850);
    }
    if(playerSelected == true) //markiert den aktuell ausgewählten Spieler grün
    {
        ctx.drawImage(selected.img, x, y,  figur.width, figur.height);
    }
    else //markiert den zuletzt getätigten Zug gelb
    {
        if(zugCounter > 0)
        {
            ctx.drawImage(selected2.img, x2, y2,  figur.width, figur.height);
            ctx.drawImage(selected2.img, x1, y1,  figur.width, figur.height);
        } 
    }

    for (var i = 0; i < 8; i++) 
    {
        for (var j = 0; j < 8; j++) 
        {
            currentFigurDraw = (figures[j][i]);
            if(getImageSrc(currentFigurDraw) == 'empty') // leeres Feld
            {
            }
            else
            {
                ctx.drawImage(getImageSrc(currentFigurDraw), getCoordinates(i), getCoordinates(j),  figur.width, figur.height);
            }
            
        }
    }
    requestAnimationFrame(draw);
}

function undoMove() //macht den letzten Zug rückgängig
{
    currentFigur = figures[lastMove[3]][lastMove[2]];
    if(currentFigur != '0')
    {
        figures[lastMove[3]][lastMove[2]] = '0';
        figures[lastMove[1]][lastMove[0]] = currentFigur;
        console.log("Zug " + zugCounter + " zurück")
        zugCounter--;
    }
}

function newGame() //setzt alle Werte zurück und startet ein neues Spiel
{
    playerSelected = false;
    if(fieldRotated)
    {
        figures = [
        ['r', 'n', 'b', 'k', 'q', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'K', 'Q', 'B', 'N', 'R']];
    }
    else
    {
        figures = [
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']];
    }
    Jetzt = new Date();
    boolNewGame = true;
    Start = (Jetzt.getTime()) + 300000;
    playerTurn = true;
    lastMove = ['0', '0', '0', '0']; //X & Y Pos Startfeld, X & Y Pos Zielfeld
    zugCounter = 0;
    document.getElementById("zug").innerHTML = "";
}

function turnField() //dreht das Spielfeld
{
    fieldRotated = !fieldRotated;
    newGame();
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

function ZeitAnzeigenCom() //Zeitanzeige Computer
{ 
    var absSekunden = Math.round(ZeitBerechnenCom()); //Bruchwert wird auf Ganzzahl gerundet
    var relSekunden = absSekunden % 60;
    var absMinuten = Math.round((absSekunden-30)/60);
    var anzSekunden ="" + ((relSekunden > 9) ? relSekunden : "0" + relSekunden);
    var anzMinuten ="" + ((absMinuten > 9) ? absMinuten : "0" + absMinuten);
    window.document.AnzeigeCom.Zeit.value = anzMinuten + ":" + anzSekunden; //Anzeige wird beschrieben
    window.setTimeout('ZeitAnzeigenCom()',1000); //Zeitanzeige wird rekursiv jede Sekunde aufgerufen
}

function ZeitAnzeigenPl() //Zeitanzeige Spieler
{ 
    var absSekunden = Math.round(ZeitBerechnenPl()); //Bruchwert wird auf Ganzzahl gerundet
    var relSekunden = absSekunden % 60;
    var absMinuten = Math.round((absSekunden-30)/60);
    var anzSekunden ="" + ((relSekunden > 9) ? relSekunden : "0" + relSekunden);
    var anzMinuten ="" + ((absMinuten > 9) ? absMinuten : "0" + absMinuten);
    window.document.AnzeigePl.Zeit.value = anzMinuten + ":" + anzSekunden; //Anzeige wird beschrieben
    window.setTimeout('ZeitAnzeigenPl()',1000); //Zeitanzeige wird rekursiv jede Sekunde aufgerufen
}
   
function ZeitBerechnenCom() // Erzeugt beim Aufruf ein neues Datumsobjekt mit aktueller Zeit
{ 
    var Immernoch = new Date(); 
    if(((Start - Immernoch.getTime())/1000) > 0)
    {
        if(boolNewGame)
        {
            return(300);
        }
        if(((Start - Immernoch.getTime())/1000) < 280)
        {
            zeitanzeigeCom.style.backgroundColor = "red";
        }
        return((Start - Immernoch.getTime())/1000); //Gibt Differenz zu Startzeitpunkt zurück

    }
    else
    {
        timeOver();
        return(0);
    }
    
}

function ZeitBerechnenPl()
{ 
    var Immernoch = new Date(); 
    if(((Start - Immernoch.getTime())/1000) > 0)
    {
        if(boolNewGame)
        {
            return(300);
        }
        if(((Start - Immernoch.getTime())/1000) < 280)
        {
            zeitanzeigePl.style.backgroundColor = "red";
        }
        return((Start - Immernoch.getTime())/1000); //Gibt Differenz zu Startzeitpunkt zurück
    }
    else
    {
        timeOver();
        return(0);
    }
    
}

function timeOver()
{
    //console.log("Zeit vorbei");
}


var id = null;

function myMove() {  //Bewertungsfunktion Animation
  var elem = document.getElementById("myAnimation");
  var pos = 800;
  clearInterval(id);
  id = setInterval(frame, 10);
  function frame() {
    if (pos == 0) {
      clearInterval(id);
    } else {
      pos--;
      elem.style.top = pos + 'px';
    }
  }
}



function zugfolge() //Zeigt die vollständige Zughistorie an
{
    var z1, z2, z3, z4, z5, z6;
    switch(currentFigur) //Figur
    {
        case 'R': z1 = 'T'; break;
        case 'N': z1 = 'S'; break;
        case 'B': z1 = 'L'; break;
        case 'Q': z1 = 'D'; break;
        case 'K': z1 = 'K'; break;
        case 'P': z1 = ''; break; //Bauern werden weggelassen
        case 'r': z1 = 'T'; break;
        case 'n': z1 = 'S'; break;
        case 'b': z1 = 'L'; break;
        case 'q': z1 = 'D'; break;
        case 'k': z1 = 'K'; break;
        case 'p': z1 = ''; break; //Bauern werden weggelassen
    }
    switch(fieldNumberX) //x Koordinate Startfeld
    {
        case 0: z2 = 'a'; break;
        case 1: z2 = 'b'; break;
        case 2: z2 = 'c'; break;
        case 3: z2 = 'd'; break;
        case 4: z2 = 'e'; break;
        case 5: z2 = 'f'; break;
        case 6: z2 = 'g'; break;
        case 7: z2 = 'h'; break;
    }
    z3 = 8 - (fieldNumberY); //y Koordinate Startfeld

    if(!figurBeaten)
    {
        z4 = '-'; //keine Figur geschlagen
    }
    else
    {
        z4 = 'x'; //Figur geschalgen
    }
    switch(targetNumberX) //x Koordinate Zielfeld
    {
        case 0: z5 = 'a'; break;
        case 1: z5 = 'b'; break;
        case 2: z5 = 'c'; break;
        case 3: z5 = 'd'; break;
        case 4: z5 = 'e'; break;
        case 5: z5 = 'f'; break;
        case 6: z5 = 'g'; break;
        case 7: z5 = 'h'; break;
    }
    z6 = 8 - (targetNumberY); //y Koordinate Zielfeld

    //Es fehlt die Kennzeichung des Schachgebots '+', Matt '#', die kleine Rochade '0-0'
    // die große Rochade '0-0-0'. das Schlagen en passant 'e.p.' und das Remisangebot '='

    console.log(z1 + z2 + z3 + z4 + z5 + z6);
    var ausgabe = "" + (document.querySelector("#zug").value) + z1 + z2 + z3 + z4 + z5 + z6 + "\n";
    document.getElementById("zug").innerHTML = ausgabe;
    document.getElementById("zug").scrollTop = document.getElementById("zug").scrollHeight; //Scrollt Textfeld automatisch
}