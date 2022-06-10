let canvas;
let ctx;
let backgroundImage = new Image();
let backgroundImageRotated = new Image(); 
var playerSelected = false;
var figures = [ //Figuren von oben links nach unten rechts (Klein: Schwarz, Groß: weiß)
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0'],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']];
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
var zeitanzeigeCom; //Computer
var zeitanzeigePl; //Player
var timeCom = 300;
var timePl = 300;
var timePlStart;
var timeComStart;
var currentTimeCom;
var currentTimePl;
var Jetzt;

//aktueller Spieler
var playerTurn = true; //Spieler ist zu Beginn am Zug
var titleCom;
var titlePl;

//Feld drehen
var boolNewGame = true; //neue Partie
var fieldRotated = false; //Brett gedreht

//Zugspeicherung
var zugCounter = 0;
var halbZugCounter = 0; //um die 50 Züge Remisregel zu überwachen
var blackZugCounter = 1;
var moves = []; //Arraylist mit allen Spielzügen
var arrZugHistorie = [];
var figurBeaten = false;

//Zughistorie
var check = false; //Schach
var checkmate = false; //Schachmatt
var promotion = false; //Bauer wird in andere Figur umgewandelt
var smallCastling = false; //kleine Rochade
var bigCastling = false; //große Rochade
var enPassant = false; //Schlagen en Passant
var remis = false; //Remisangebot der Spieler

//FEN-String
var whiteSmallCastling = true;
var whiteBigCastling = true;
var blackSmallCastling = true;
var blackBigCastling = true;
var enPassantPossible = false;

//Wins
var playerPoints = 0;
var computerPoints = 0;
var playerWon = false;
var boolTimeOver = true;


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

    if(playerSelected == false) {  //Spieler wird ausgewählt
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
            if(!fieldRotated)
            {
                if((isWhite() == playerTurn))
                {
                    console.log("fieldX: " + window.event.offsetX + " fieldY: " + window.event.offsetY);
                    console.log("NumberX: " + fieldNumberX + " NumberY: " + fieldNumberY);
                    console.log("Figur: " + currentFigur);
                    playerSelected = true;
                }
            }
            else
            {
                if((isWhite() != playerTurn))
                {
                    console.log("fieldX: " + window.event.offsetX + " fieldY: " + window.event.offsetY);
                    console.log("NumberX: " + fieldNumberX + " NumberY: " + fieldNumberY);
                    console.log("Figur: " + currentFigur);
                    playerSelected = true;
                }
            }
            
        }
    }
    else  //Zielfeld wird ausgewählt
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
            if((figures[fieldNumberY][fieldNumberX] == 'P') || (figures[fieldNumberY][fieldNumberX] == 'p')) //Halbzugcounter für 50-Zug-Remisregel
            {
                halbZugCounter = 0;
            }
            else
            {
                halbZugCounter++;
            }
            
            if((figures[targetNumberY][targetNumberX]) != '0') // Figur geschlagen
            {
                figurBeaten = true;
                halbZugCounter = 0;
            }
            else
            {
                figurBeaten = false;
            }
            if(boolNewGame)
            {
                boolNewGame = false;
            }

            console.log("TargetX: " + targetNumberX + " TargetY: " + targetNumberY);
            playerSelected = false;
            playerTurn = !playerTurn;

            if(playerTurn) //Spielerzeit läuft weiter
            {
                Jetzt = new Date();  //neues Datumsobjekt mit aktuellem Zeitpunkt
                currentTimePl = (Jetzt.getTime()); //Millies
                timePlStart = timePl;
                blackZugCounter++;
            }
            else
            {
                Jetzt = new Date();  //neues Datumsobjekt mit aktuellem Zeitpunkt
                currentTimeCom = (Jetzt.getTime()); //Millies
                timeComStart = timeCom;
            }

            //Aktualisierung der Figurenposition im Array
            figures[targetNumberY][targetNumberX] = currentFigur;
            figures[fieldNumberY][fieldNumberX] = '0';

            var move = new Object(); //Fügt den aktuellen Zug zu der Liste hinzu
            move.startX = fieldNumberX;
            move.startY = fieldNumberY;
            move.targetX = targetNumberX;
            move.targetY = targetNumberY;
            moves.push(move);
            zugCounter++;
            zugfolge();
            fenString();
        }
        
    }
}

function isWhite() //überprüft ob die Figur weiß ist
{
    switch(currentFigur)
    {
        case 'R': return true;
        case 'N': return true;
        case 'B': return true;
        case 'Q': return true;
        case 'K': return true;
        case 'P': return true;
        default: return false;
    }
}

function startGame() {
    document.getElementById("canvas").addEventListener("click", mouseListener); //Mouse Listener
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    zeitanzeigeCom = document.getElementById('AnzeigefeldCom');
    zeitanzeigePl = document.getElementById('AnzeigefeldPl');
    titleCom = document.getElementById('titleCom');
    titlePl = document.getElementById('titlePl');
    
    console.log("Start Game erfolgreich");
    loadImages();
    console.log("Load Images erfolgreich");
    draw();
    fenString();
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
            ctx.drawImage(selected2.img, getCoordinates(moves[zugCounter -1].targetX), getCoordinates(moves[zugCounter -1].targetY),  figur.width, figur.height);
            ctx.drawImage(selected2.img, getCoordinates(moves[zugCounter -1].startX), getCoordinates(moves[zugCounter -1].startY),  figur.width, figur.height);
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

        if(playerTurn)
        {
            titlePl.style.color = "#00ff84";
            titleCom.style.color = "white";
        }
        else
        {
            titlePl.style.color = "white";
            titleCom.style.color = "#00ff84";
        }
   
    
    requestAnimationFrame(draw);
}

function undoMove() //macht den letzten Zug rückgängig
{
    if(zugCounter > 0)
    {
        currentFigur = figures[moves[zugCounter -1].targetY][moves[zugCounter -1].targetX];
        if(currentFigur != '0')
        {
            figures[moves[zugCounter -1].targetY][moves[zugCounter -1].targetX] = '0';
            figures[moves[zugCounter -1].startY][moves[zugCounter -1].startX] = currentFigur;
            console.log("Zug " + zugCounter + " zurück")
            zugCounter--;
            playerTurn = !playerTurn;
            
            moves.pop();
            arrZugHistorie.pop(); //letztes Element wird aus Moves gelöscht
            zugfolgeAnzeigen(); //neue Ausgabe wird berechnet
        }
    }
}

function newGame() //setzt alle Werte zurück und startet ein neues Spiel
{
    playerSelected = false;
    if(fieldRotated)
    {
        figures = [
        ['R', 'N', 'B', 'K', 'Q', 'B', 'N', 'R'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['r', 'n', 'b', 'k', 'q', 'b', 'n', 'r']];
    }
    else
    {
    figures = [ 
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']];
    }
    boolNewGame = true;
    playerTurn = true;
    for(let i = moves.length; i > 0; i--)
    {
        moves.pop();
        arrZugHistorie.pop();
    }
    zugCounter = 0;
    document.getElementById("zug").innerHTML = "";
    boolTimeOver = true;
}

function turnField() //dreht das Spielfeld
{
    fieldRotated = !fieldRotated;
    newGame();
    if(fieldRotated)
    {
        playerTurn = false;
    }
    else
    {
        playerTurn = true;
    }
}

function getImageSrc(c) { //gibt das passende Bild zu der Figur zurück
    var src;
    switch(c) {
        case 'r': src = turm_black.img; break;
        case 'n': src = pferd_black.img; break;
        case 'b': src = laeufer_black.img; break;
        case 'q': src = dame_black.img; break;
        case 'k': src = koenig_black.img; break;
        case 'p': src = bauer_black.img; break;
        case 'R': src = turm_weiss.img; break;
        case 'N': src = pferd_weiss.img; break;
        case 'B': src = laeufer_weiss.img; break;
        case 'Q': src = dame_weiss.img; break;
        case 'K': src = koenig_weiss.img; break;
        case 'P': src = bauer_weiss.img; break;
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
    if(boolNewGame)
    {
        timeCom = 300;
        return(300);
    }
    if(timeCom > 0)
    {
        if(!playerTurn) //Computer ist dran
        {
            var t = new Date();
            timeCom = timeComStart - ((t.getTime()) - currentTimeCom)/1000;  //timePl = aktueller Zeitpunkt - Zeitpunkt wo Spieler dran ist
        }
        
        if(timeCom < 60)
        {
            zeitanzeigeCom.style.color = "#B40404"; //Zeit wird rot
        }
        return(timeCom);
    }
    else
    {
        playerWon = true;
        timeOver();
        return(0);
    }
}

function ZeitBerechnenPl()
{ 
    if(boolNewGame)
    {
        timePl = 300;
        return(300);
    }
    if(timePl > 0)
    {
        if(playerTurn) //Spieler ist dran
        {
            var t = new Date();
            timePl = timePlStart - ((t.getTime()) - currentTimePl)/1000;  //timePl = aktueller Zeitpunkt - Zeitpunkt wo Spieler dran ist
        }
        
        if(timePl < 60)
        {
            zeitanzeigePl.style.color = "#B40404"; //Zeit wird rot
        }
        return(timePl);
    }
    else
    {
        playerWon = false;
        timeOver();
        return(0);
    }
}

function timeOver()
{
    if(boolTimeOver)
    {
        if(playerWon)
        {
            playerPoints++;
            wins.innerHTML = computerPoints + " : " + playerPoints;
        }
        else
        {
            computerPoints++;
            wins.innerHTML = computerPoints + " : " + playerPoints;
        }
        boolTimeOver = false;
    }
    
}


var id = null;
function myMove() {  //Bewertungsfunktion Animation
  var elem = document.getElementById("blackBar");
  var elem2 = document.getElementById("whiteBar");
  clearInterval(id);
  id = setInterval(frame, 1000);
  function frame() {
      elem.style.height = "" + (Math.floor(Math.random() * 500)) + "px";  //Code to change Element Style
      if(fieldRotated)
      {
        elem.style.background = "white";
        elem2.style.background = "black";
      }
      else
      {
        elem.style.background = "black";
        elem2.style.background = "white";
      }
      
  }
}


function zugfolge() //Zeigt die vollständige Zughistorie an
{
    var currentMove = '';
        switch(currentFigur) //Figur
        {
            case 'R': currentMove = currentMove + 'T'; break;
            case 'N': currentMove = currentMove + 'S'; break;
            case 'B': currentMove = currentMove + 'L'; break;
            case 'Q': currentMove = currentMove + 'D'; break;
            case 'K': currentMove = currentMove + 'K'; break;
            case 'P': break; //Bauern werden weggelassen
            case 'r': currentMove = currentMove + 'T'; break;
            case 'n': currentMove = currentMove + 'S'; break;
            case 'b': currentMove = currentMove + 'L'; break;
            case 'q': currentMove = currentMove + 'D'; break;
            case 'k': currentMove = currentMove + 'K'; break;
            case 'p': break; //Bauern werden weggelassen
        }

        switch(moves[zugCounter -1].startX) //x Koordinate Startfeld
        {
            case 0: currentMove = currentMove + 'a'; break;
            case 1: currentMove = currentMove + 'b'; break;
            case 2: currentMove = currentMove + 'c'; break;
            case 3: currentMove = currentMove + 'd'; break;
            case 4: currentMove = currentMove + 'e'; break;
            case 5: currentMove = currentMove + 'f'; break;
            case 6: currentMove = currentMove + 'g'; break;
            case 7: currentMove = currentMove + 'h'; break;
        }
        currentMove = currentMove +  (8 - (moves[zugCounter -1].startY)); //y Koordinate Startfeld

        if(!figurBeaten)
        {
            currentMove = currentMove + '-'; //keine Figur geschlagen
        }
        else
        {
            currentMove = currentMove + 'x'; //Figur geschalgen
        }
        switch(moves[zugCounter -1].targetX) //x Koordinate Zielfeld
        {
            case 0: currentMove = currentMove + 'a'; break;
            case 1: currentMove = currentMove + 'b'; break;
            case 2: currentMove = currentMove + 'c'; break;
            case 3: currentMove = currentMove + 'd'; break;
            case 4: currentMove = currentMove + 'e'; break;
            case 5: currentMove = currentMove + 'f'; break;
            case 6: currentMove = currentMove + 'g'; break;
            case 7: currentMove = currentMove + 'h'; break;
        }
        currentMove = currentMove + (8 - (moves[zugCounter -1].targetY)); //y Koordinate Zielfeld

        //new
        if(check) {
            currentMove = currentMove + '+';
        }

        if (checkmate) {
            currentMove = currentMove + '#';
        }

        if(enPassant) {
            currentMove = currentMove + " e.P.";
        }

        if (smallCastling || bigCastling) {
            if(smallCastling){
                arrZugHistorie.push("0-0");
            }
            if(bigCastling){
                arrZugHistorie.push("0-0-0");
            }
        }
        else
        {
            arrZugHistorie.push(currentMove);
        }

        if(remis) //Remisangebot
        {
            arrZugHistorie.push("=");
        }

        zugfolgeAnzeigen();
    }

function zugfolgeAnzeigen()
{
    document.getElementById("zug").innerHTML = "";
    for (var i = 0; i < zugCounter; i++)
    {
        var ausgabe = document.querySelector("#zug").value + arrZugHistorie[i] + "\n";
        document.getElementById("zug").innerHTML = ausgabe;

        document.getElementById("zug").scrollTop = document.getElementById("zug").scrollHeight; //Scrollt Textfeld automatisch
    }   
}

function fenString()  //berechnet aus der aktuellen Spielfeldsituation einen FEN String
{
    var fen = '';
    var counter = 0;
    for (var i = 0; i < 8; i++)  //1.Figurenstellung
    {
        for (var j = 0; j < 8; j++) 
        {
            if((figures[i][j]) == '0')
            {
                counter++;
            }
            else
            {
                if(counter > 0)
                {
                    fen = fen + ((String)(counter));
                }
                fen = fen + (figures[i][j]);
                counter = 0;
            }
        }
        if(counter > 0)
        {
            fen = fen + ((String)(counter));
        }
        counter = 0;

        if(i < 7)
        {
            fen = fen + '/';
        }
    }

    if(playerTurn) //2. Zugrecht
    {
        if(!fieldRotated)
        {
            fen = fen + " w ";
        }
        else
        {
            fen = fen + " b ";
        }
        
    }
    else
    {
        if(!fieldRotated)
        {
            fen = fen + " b ";
        }
        else
        {
            fen = fen + " w ";
        }
    }

    
    if(!whiteSmallCastling && !whiteBigCastling && !blackSmallCastling && !blackBigCastling) // 3.Rochaderechte
    {
        fen = fen + "-";
    }
    else
    {
        if(whiteSmallCastling)
        {
            fen = fen + "K";
        }
        if(whiteBigCastling)
        {
            fen = fen + "Q";
        }
        if(blackSmallCastling)
        {
            fen = fen + "k";
        }
        if(blackBigCastling)
        {
            fen = fen + "q";
        }
    }

    if(!enPassantPossible) // 4.Möglicher En-passant-Schlag
    {
        fen = fen + " -";
    }
    else
    {
        var field;
        //Muss von Backend kommen
        fen = fen + ((String)(field));
    }

    fen = fen + " " + (halbZugCounter); // 5.Gespielte Halbzüge seit dem letzten Bauernzug oder dem Schlagen einer Figur

    fen = fen + " " + (blackZugCounter); // 6.Nummer des nächsten Zuges

    console.log(fen);
}


