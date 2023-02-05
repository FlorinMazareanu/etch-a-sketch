//global variables
let colorElement = document.getElementById("selected-color");
let colorNow = "#333333";
colorElement.addEventListener("change", changeColor)


//color setup function for setting the current color colorNow:
//changeColor changes colorNow, the current color that's selected
function changeColor() {
    colorNow = colorElement.value;
}

//event listener for mouse down:
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
window.addEventListener("mousedown", mouseDownToggle);
window.addEventListener("mouseup", mouseUpToggle);

//on click function to change square color:
function changeSquareColor(e) {
    if (e.type === "mousemove" && mouseState === "mousedown") {
        this.style["background-color"] = colorNow;
    }
    if (e.type === "mousedown") {
        this.style["background-color"] = colorNow;
    }
}

//sketch setup to set size:
let sketchSize = 15;
let sketchSquareSize = Math.floor(500 / sketchSize);
//console.log(sketchSquareSize);
let sketchContainer = document.getElementById("sketch-container");

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

