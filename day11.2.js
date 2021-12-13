const fs = require('fs');

let input;

try {
    input = fs.readFileSync("./inputs/input11.txt", "utf8").split("\n");
} catch (e) {
    console.error("Error reading in file")
    console.error(e);
    process.exit(1);
}

const steps = 1000;

let octopuses = input.map(i => i.split("").map(x => parseInt(x)));
const h = octopuses.length - 1;
const w = octopuses[0].length - 1;

for (let step = 0; step<steps; step++) {
    let flashes = [];

    for (let row = 0; row < octopuses.length; row++) {
        for (let col = 0; col < octopuses[row].length; col++) {
            if (octopuses[row][col] === 9) {
                octopuses[row][col] = 0
                flashes.push([row, col])
            } else {
                octopuses[row][col]++;
            }
        }
    }

    if (allSame(octopuses)) {
        console.log("Answer", step)
        process.exit(0)
    }

    flashes.forEach(flash => {
        ripple(...flash, octopuses, h, w)
    })
}

console.log("No answer")
process.exit(1)

function ripple(y, x, grid, h, w) {
    const left = x - 1;
    const right = x + 1;
    const up = y - 1;
    const down = y + 1;

    if (left !== -1 && grid[y][left] !== 0 && ++grid[y][left] === 10) {
        grid[y][left] = 0;
        ripple(y, left, grid, h, w)
    }

    if (up !== -1 && grid[up][x] !== 0 && ++grid[up][x] === 10) {
        grid[up][x] = 0;
        ripple(up, x, grid, h, w)
    }

    if (right <= w && grid[y][right] !== 0 && ++grid[y][right] === 10) {
        grid[y][right] = 0;
        ripple(y, right, grid, h, w)
    }

    if (down <= h && grid[down][x] !== 0 && ++grid[down][x] === 10) {
        grid[down][x] = 0;
        ripple(down, x, grid, h, w)
    }

    if ((down <= h) && (right <= w) && grid[down][right] !== 0 && ++grid[down][right] === 10) {
        grid[down][right] = 0;
        ripple(down, right, grid, h, w)
    }

    if ((up !== -1) && (left !== -1) && grid[up][left] !== 0 && ++grid[up][left] === 10) {
        grid[up][left] = 0;
        ripple(up, left, grid, h, w)
    }

    if ((up !== -1) && (right <= w) && grid[up][right] !== 0 && ++grid[up][right] === 10) {
        grid[up][right] = 0;
        ripple(up, right, grid, h, w)
    }

    if ((down <= h) && (left !== -1) && grid[down][left] !== 0 && ++grid[down][left] === 10) {
        grid[down][left] = 0;
        ripple(down, left, grid, h, w)
    }
}

function allSame(octs) {
    const base = octs[0][0];
    for (let i = 0; i<octs.length; i++) {
        for (let j = 0; j<octs[i].length; j++) {
            if (octs[i][j] !== base) return false
        }
    }
    return true
}