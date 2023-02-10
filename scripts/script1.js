//variable for the color picker:

let colorElement = document.getElementById("selected-color");

//colorNow is only used for "color mode", not for "rainbow or eraser"

let colorNow = "#333333";
colorElement.addEventListener("change", changeColor)
let pointerState;

//sketch setup to set size:

let sketchSize = 15;
let sketchSquareSize = Math.floor(500 / sketchSize);

let hAndSketchContainer = document.getElementById("h1-and-sketch-container");
let sketchContainer = document.getElementById("sketch-container");
let colorMode = "color";

//sketch size slider and event listener that triggers generateSketch():

let sketchSlider = document.getElementById("slider");
sketchSlider.addEventListener("change", generateSketch);

//var element = document.getElementById('just_an_example');
let event = new Event('change');
sketchSlider.dispatchEvent(event);

//event listeners on buttons to setMode - color - rainbow - eraser:

let colorModeButton = document.getElementById("color-mode-button");
let rainbowModeButton = document.getElementById("rainbow-mode-button");
let eraserModeButton = document.getElementById("eraser-mode-button");
let clearButton = document.getElementById("clear-button");

colorModeButton.addEventListener("click", setMode);
rainbowModeButton.addEventListener("click", setMode);
eraserModeButton.addEventListener("click", setMode);
clearButton.addEventListener("click", clearSketch);

//function to generate and style the sketch
//this one executes on page load and on slider changes

function generateSketch(e) {

    sketchSize = e.target.value;
    //removing the current sketch to not generate duplicates:

    sketchContainer.remove();
    
    //generating the new sketch container and sketch squares:

    sketchContainer = document.createElement("div");
    sketchContainer.id = "sketch-container";
    hAndSketchContainer.appendChild(sketchContainer);
    for (let i = 1; i <= sketchSize; i++) {
        for (let j = 1; j <= sketchSize; j++) {
            let sketchSquare = document.createElement("div");
            sketchSquare.className = "sketch-square";
            sketchContainer.appendChild(sketchSquare);
            sketchSquare.addEventListener("pointerdown", changeSquareColor);
            sketchSquare.addEventListener("pointermove", changeSquareColor);
        }
    }

    //setting up the grid styles:

    let gridTemplateColumns = "";
    let gridTemplateRows = "";
    sketchSquareSize = Math.floor(500 / sketchSize);
    for (let i = 1; i<= sketchSize; i++) {
        gridTemplateColumns = gridTemplateColumns + " " + sketchSquareSize + "px";
        gridTemplateRows = gridTemplateRows + " " + sketchSquareSize + "px"
    }
    sketchContainer.style["display"] = "grid";
    sketchContainer.style["grid-gap"] = "0px";
    sketchContainer.style["grid-template-columns"] = gridTemplateColumns;
    sketchContainer.style["grid-template-rows"] = gridTemplateRows;

    //event listener for pointer down on sketchContainer:
    //this is needed for changeSquareColor to 
    //not have colors changing when hovering
    //without keeping the pointer clicked while doing so

    function pointerDownToggle(e) {
        pointerState = e.type;
    }
    function pointerUpToggle(e) {
        pointerState = e.type;
    }
    sketchContainer.addEventListener("pointerdown", pointerDownToggle);
    sketchContainer.addEventListener("pointerup", pointerUpToggle);
}

//color setup function for setting the current color colorNow:
//changeColor changes colorNow, the current color that's selected
function changeColor() {
    colorNow = colorElement.value;
}

//setMode function to set coloring mode:
function setMode(e) {
    switch (e.target.id) {
        case "color-mode-button":
            colorMode = "color";
            console.log(this);
            break;
        case "rainbow-mode-button":
            colorMode = "rainbow";
            break;
        case "eraser-mode-button":
            colorMode = "eraser";
            break;
        default:
            console.log("default");
    }
}

//this function clears the sketch colors:
function clearSketch(e) {
    for (let i = 0; i < sketchSize*sketchSize; i++) {
        sketchContainer.children[i].style["background-color"] = "white";
    }  
}

//function for random colors randomColorGenerator

let randomColor = "";
function randomColorGenerator() {
    let red = Math.floor(Math.random() * 255).toString();
    let green = Math.floor(Math.random() * 255).toString();
    let blue = Math.floor(Math.random() * 255).toString();
    randomColor = "rgb(" + red + ", " + green + ", " + blue + ")";   
}

//on click function to change square color:
//this function will do different things, depending on the mode

function changeSquareColor(e) {
    switch (colorMode) {
        case "color":
            if (e.type === "pointermove" && pointerState === "pointerdown") {
                this.style["background-color"] = colorNow;
            }
            if (e.type === "pointerdown") {
                this.style["background-color"] = colorNow;
            }
            break;
        case "rainbow":
            randomColorGenerator();
            if (e.type === "pointermove" && pointerState === "pointerdown") {
                this.style["background-color"] = randomColor;
            }
            if (e.type === "pointerdown") {
                this.style["background-color"] = randomColor;
            }
            break;
        case "eraser":
            if (e.type === "pointermove" && pointerState === "pointerdown") {
                this.style["background-color"] = "white";
            }
            if (e.type === "pointerdown") {
                this.style["background-color"] = "white";
            }
            break;
        default:
            console.log("default");
    }
}

