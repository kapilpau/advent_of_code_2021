const fs = require('fs');

let input;

try {
    input = fs.readFileSync("./inputs/input1.txt", "utf8").split("\n");
} catch (e) {
    console.error("Error reading in file")
    console.error(e);
    process.exit(1);
}

let prev = parseInt(input[0])
let count = 0;

for (let i = 1; i<input.length; i++) {
    const curr = parseInt(input[i])
    if (curr > prev)
        count++;
    prev = curr
}

console.log("Answer:", count)