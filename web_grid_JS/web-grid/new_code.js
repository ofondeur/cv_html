document.addEventListener("DOMContentLoaded", () => {
    // Initial clean up. DO NOT REMOVE.
    initialCleanup();

    // Adding event listener to the "Add a line" button
    const addButton = document.getElementById("btn-add-line");
    const newButton = document.getElementById("btn-remove-line");
    addButton.addEventListener("click", addLine);
    newButton.addEventListener("click", removeLine);
});

function initialCleanup() {
    const grid = document.getElementById("grid");
    const squares = grid.querySelectorAll(".square"); // Select all squares
    squares.forEach(square => {
        square.addEventListener("mouseover", turnBlue); // Add event listener for mouseover
        square.addEventListener("mouseleave", revertColor); // Add event listener for mouseleave
        square.addEventListener("click", changeSquareColor); // Add event listener for click
    });
}

function removeLine() {
    const grid = document.getElementById("grid");
    const rows = grid.querySelectorAll(".square");
    const numRows = rows.length;
    const numbCol = 10;

    if (numRows >= numbCol) {
        for (let i = 0; i < numbCol; i++) {
            grid.removeChild(rows[numRows - 1 - i]);
        }
    }

    updateCounts(); // Update counts after removing squares
}

function addLine() {
    const grid = document.getElementById("grid");
    const numbCol = 10;

    for (let i = 0; i < numbCol; i++) {
        const newdiv = document.createElement("div");
        newdiv.classList.add("square"); // Add class for styling
        newdiv.addEventListener("mouseover", turnBlue); // Add event listener for mouseover
        newdiv.addEventListener("mouseleave", revertColor); // Add event listener for mouseleave
        newdiv.addEventListener("click", changeSquareColor); // Add event listener for click
        grid.appendChild(newdiv);
    }

    updateCounts(); // Update counts after adding squares
}

function turnBlue(event) {
    const square = event.target;
    square.classList.add("blue"); // Add class to turn square blue
    updateCounts(); // Update counts when a square turns blue
}

function revertColor(event) {
    const square = event.target;
    square.classList.remove("blue"); // Remove class to revert square color
    updateCounts(); // Update counts when a square reverts to its original color
}

function getRandomColor() {
    // Generate random RGB color values
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}


function changeSquareColor(event) {
    const square = event.target;
    square.classList.add("clicked"); // Add class to keep square color after click
    square.style.backgroundColor = getRandomColor();
    updateCounts(); // Update counts when a square is clicked
}

function updateCounts() {
    const totalCount = document.querySelectorAll(".square").length;
    const clickedCount = document.querySelectorAll(".clicked").length;
    const blueCount = document.querySelectorAll(".blue").length;
    const originalCount = 30 + totalCount - blueCount - clickedCount;

    document.getElementById("original-count").textContent = `Original squares: ${originalCount}`;
    document.getElementById("clicked-count").textContent = `Clicked squares: ${clickedCount}`;
    document.getElementById("blue-count").textContent = `Blue squares: ${blueCount}`;
    document.getElementById("total-count").textContent = `Total squares: ${totalCount}`;
}
