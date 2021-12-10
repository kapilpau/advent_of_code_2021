const fs = require('fs');

let input;

try {
    input = fs.readFileSync("./inputs/input9.txt", "utf8").split("\n");
} catch (e) {
    console.error("Error reading in file")
    console.error(e);
    process.exit(1);
}


let map = input.map(i => i.split(""))

const height = input.length;
const width = input[0].length;
let sizes = [];

for (let r = 0; r<height; r++) {
    for (let c = 0; c<width; c++) {
        const size = floodFill(r, c, map);
        if (size > 0) sizes.push(size);
    }
}

sizes = sizes.sort((a, b) => a - b)

console.log("Answer", sizes[sizes.length - 1] * sizes[sizes.length - 2] * sizes[sizes.length - 3])

function floodFill(r, c, map) {
    if (parseInt(map[r][c]) === 9) return 0;
    map[r][c] = 9;
    let size = 1;

    if (r > 0) {
        size += floodFill(r-1, c, map);
    }
    if (r < map.length -1) {
        size += floodFill(r+1, c, map)
    }
    if (c > 0) {
        size += floodFill(r, c-1, map);
    }
    if (c < map[r].length -1) {
        size += floodFill(r, c+1, map)
    }

    return size
}