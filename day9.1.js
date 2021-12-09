const fs = require('fs');

let input;

try {
    input = fs.readFileSync("./inputs/input9.txt", "utf8").split("\n");
} catch (e) {
    console.error("Error reading in file")
    console.error(e);
    process.exit(1);
}

let count = 0;

for (let x = 0; x<input.length; x++) {
    const line = input[x];
    const heights = line.split("");

    for (let i = 0; i<heights.length; i++) {
        if (i > 0 && parseInt(heights[i]) >= parseInt(heights[i-1])) {
            continue;
        } else if (i < heights.length - 1 && parseInt(heights[i]) >= parseInt(heights[i+1])) {
            continue;
        } else if (x > 0 && parseInt(heights[i]) >= parseInt(input[x-1].charAt(i))) {
            continue
        } else if (x < input.length - 1 && parseInt(heights[i]) >= parseInt(input[x+1].charAt(i))) {
            continue
        } else {
            count += parseInt(heights[i]) + 1;
        }
    }
}

console.log("Answer", count)