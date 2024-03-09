//possible improvements:
// 0 groups reveal all together along a line
// send text to clipboard automatically
// more structured mine distribution
// variable height/width
// css styling

var size = 9;

const cell = {  0:"||` 0`||", 
                1:"||` 1`||", 
                2:"||` 2`||", 
                3:"||` 3`||", 
                4:"||` 4`||", 
                5:"||` 5`||", 
                6:"||` 6`||", 
                7:"||` 7`||", 
                8:"||` 8`||",
                9:"||` x`||"
            }

const rows = [];
const columns = [];
var grid = [];
var printgrid = [];

function gridMaker() {
    for (let i = 0; i < size+2; i++) { // place mines
        // rows
        grid[i] = [];
        let y = 6;
        for (let j = 0; j < size+2; j++) {
            // columns
            let x = Math.round(Math.random() * y);
            if (x == 0) { grid[i][j] = 1; y = 6; }
            else { grid[i][j] = 0; y--; }

            if (i == 0 || i == 10 || j == 0 || j == 10) { grid[i][j] = 0; }
            console.log(cell[x] + " , " + x);
        }
    }

    for (let i = 0; i < size; i++) { // place numbers
        // rows
        printgrid[i] = [];
        for (let j = 0; j < size; j++) {
            // columns
            const f = i+1;
            const g = j+1;
            if (grid[f][g] == 0) {
                const minecheck = 
                    grid[f-1][g-1] +
                    grid[f-1][g] +
                    grid[f-1][g+1] +
                    grid[f][g-1] +
                    grid[f][g] +
                    grid[f][g+1] +
                    grid[f+1][g-1] +
                    grid[f+1][g] +
                    grid[f+1][g+1];
                printgrid[i][j] = cell[minecheck];
                }
            else if (grid[f][g] == 1) {
                printgrid[i][j] = cell[9];
            }
            else {
                printgrid[i][j] = "`E`";
            }
        }
    }
}

function gridPrinter() {
    var discordMessage = "";
    for (let i = 0; i < size; i++) {
        // rows
        for (let j = 0; j < size; j++) {
            // columns
            discordMessage += printgrid[i][j];
        }
        discordMessage += "<br>";
    }
    discordMessage += "https://echoatday.github.io/minesweeper"
    var result = document.getElementById('results')
    result.innerHTML = discordMessage;
}