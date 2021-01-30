//var for the grid
const gridCont = document.querySelector(".container");

//button variables
const clearBtn = document.querySelector(".clear");
const gridsizeBtn = document.querySelector(".grid-size");

//select color options
const colorFilters = document.querySelector(".color-select");

let colorInput = "black";

let colorSelect = "";

//array to hold all the individual cells
var cells = new Array();
createGrid(4, 4);

//Dynamically creates grid based on the amount of pixel dimensions the user would like to add
function createGrid(rows, cols) {
	gridCont.style.setProperty("--grid-row", rows);
	gridCont.style.setProperty("--grid-col", cols);
	for (let i = 0; i < rows * cols; i++) {
		let cell = document.createElement("div");
		gridCont.appendChild(cell);
		cell.className = "cell";
		cell.id = `${i}`;
		cells.push(cell);
	}

	//eventlistener applied to any cell that is hovered over
	//added to inside the function of createGrid because when I reset the cells,
	//the eventListener is reset because it only applied to the old grid cells
	cells.forEach((cell) =>
		cell.addEventListener("mouseover", function (e) {
			paintCell(e.target, colorInput);
		})
	);
}

//resets all cell values back to white
function clear() {
	cells.forEach((cell) => (cell.style.background = "white"));
}

//function that paints a given cell when it is hovered over
function paintCell(cell2paint, paintColor) {
	updateColorInput();
	cell2paint.style.background = colorInput;
}

//function to reset grid values
function resetGrid() {
	//removes all the children node of grid container
	while (gridCont.firstChild) {
		gridCont.removeChild(gridCont.firstChild);
	}

	//resets the cells array
	cells = [];
}

//function to create a new grid with userInput
function changeGrid() {
	//takes user input and assigns it to var
	let sideLength = window.prompt(
		"How many squares would you like per side of the square?"
	);

	///calls resetGrid to make new values
	resetGrid();

	//creates a brand new Grid
	createGrid(sideLength, sideLength);
}

//returns a random number between 0 and 255
function randomRGB() {
	const randomBetween = (min, max) =>
		min + Math.floor(Math.random() * (max - min + 1));
	return randomBetween(0, 255);
}

function filterColor(e) {
	switch (e.target.value) {
		case "black":
			colorSelect = "black";
			break;
		case "Rainbow":
			colorSelect = "rainbow";
			break;
	}
}

function updateColorInput() {
	if (colorSelect === "rainbow") {
		colorInput =
			"rgb(" + randomRGB() + "," + randomRGB() + "," + randomRGB() + ")";
	} else {
		colorInput = "black";
	}
	return;
}

//button event listener to clear board
clearBtn.addEventListener("click", function () {
	clear();
});

//event listener for changing grid size
gridsizeBtn.addEventListener("click", function () {
	changeGrid();
});

colorFilters.addEventListener("click", filterColor);
