const fs = require('fs');

let input;

try {
    input = fs.readFileSync("./inputs/input5.txt", "utf8").split("\n");
} catch (e) {
    console.error("Error reading in file")
    console.error(e);
    process.exit(1);
}

const size = 1000;

let grid = new Array(size);

for (let i = 0; i<size; i++) {
    let row = new Array(size);
    for (let j = 0; j<size; j++) {
        row[j] = ".";
    }
    grid[i] = row;
}

input.forEach(line => {
    const [start, end] = line.split(" -> ");
    const [x1, y1] = splitToInts(start);
    const [x2, y2] = splitToInts(end);
    
    if (x1 === x2 || y1 === y2) {
        if (x1 === x2) {

            const [startPos, endPos] = [y1, y2].sort((a, b) => a - b);
            for (let y = startPos; y<=endPos; y++) {
                if (grid[y][x1] === ".") grid[y][x1] = 0;
                grid[y][x1]++
            }

        } else {

            const [startPos, endPos] = [x1, x2].sort((a, b) => a - b);
            for (let x = startPos; x<=endPos; x++) {
                if (grid[y1][x] === ".") grid[y1][x] = 0;
                grid[y1][x]++
            }
        }
    }
})

let count = 0;
grid.forEach(r => {
    r.forEach(e => {
        if (e >= 2) count++
    })
})

console.log("Answer", count)

function splitToInts(s) {
    const [a, b] = s.split(",");

    return [parseInt(a), parseInt(b)]
}