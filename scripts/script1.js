let sketchSize = 15;
let sketchSquareSize = Math.floor(500 / sketchSize);
console.log(sketchSquareSize);
let sketchContainer = document.getElementById("sketch-container");

//setting grid style:
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

for (let i = 1; i <= sketchSize; i++) {
    for (let j = 1; j <= sketchSize; j++) {
    //sketchContainer.appendChild("div");
        //console.log(sketchContainer);
        let sketchSquare = document.createElement("div");
        sketchSquare.className = "sketch-square";
        sketchContainer.appendChild(sketchSquare);
    }
}




