//global variables
let colorElement = document.getElementById("selected-color");
let colorNow = "#333333";
colorElement.addEventListener("change", changeColor)

//sketch setup to set size:
let sketchSize = 15;
let sketchSquareSize = Math.floor(500 / sketchSize);
//console.log(sketchSquareSize);
let sketchContainer = document.getElementById("sketch-container");
let colorMode = "color";

//color setup function for setting the current color colorNow:
//changeColor changes colorNow, the current color that's selected
function changeColor() {
    colorNow = colorElement.value;
}

//setMode function to set cologing mode:
function setMode(e) {
    console.log(e.target.id);
    switch (e.target.id) {
        case "color-mode-button":
            colorMode = "color";
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
    console.log(colorMode);
}

//event listeners on buttons to setMode:
let colorModeButton = document.getElementById("color-mode-button");
let rainbowModeButton = document.getElementById("rainbow-mode-button");
let eraserModeButton = document.getElementById("eraser-mode-button");

colorModeButton.addEventListener("click", setMode);
rainbowModeButton.addEventListener("click", setMode);
eraserModeButton.addEventListener("click", setMode);

//on click function to change square color:
function changeSquareColor(e) {
    if (e.type === "mousemove" && mouseState === "mousedown") {
        this.style["background-color"] = colorNow;
    }
    if (e.type === "mousedown") {
        this.style["background-color"] = colorNow;
    }
}

//event listener for mouse down on sketchContainer:
//this is needed for changeSquareColor to 
//not have colors changing when hovering
//without keeping the mouse clicked while doing so
let mouseState;
function mouseDownToggle(e) {
    mouseState = e.type;
    console.log(mouseState);
}
function mouseUpToggle(e) {
    mouseState = e.type;
    console.log(mouseState);
}
sketchContainer.addEventListener("mousedown", mouseDownToggle);
sketchContainer.addEventListener("mouseup", mouseUpToggle);

//setting up the grid styles:
let gridTemplateColumns = "";
let gridTemplateRows = "";
for (let i = 1; i<= sketchSize; i++) {
    gridTemplateColumns = gridTemplateColumns + " " + sketchSquareSize + "px";
    gridTemplateRows = gridTemplateRows + " " + sketchSquareSize + "px"
}
sketchContainer.style["display"] = "grid";
sketchContainer.style["grid-gap"] = "0px";
sketchContainer.style["grid-template-columns"] = gridTemplateColumns;
sketchContainer.style["grid-template-rows"] = gridTemplateRows;

//generating the squares inside the grid
for (let i = 1; i <= sketchSize; i++) {
    for (let j = 1; j <= sketchSize; j++) {
        let sketchSquare = document.createElement("div");
        sketchSquare.className = "sketch-square";
        sketchContainer.appendChild(sketchSquare);
        sketchSquare.addEventListener("mousedown", changeSquareColor);
        sketchSquare.addEventListener("mousemove", changeSquareColor);
    }
}

