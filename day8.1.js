const fs = require('fs');

let input;

try {
    input = fs.readFileSync("./inputs/input8.txt", "utf8").split("\n");
} catch (e) {
    console.error("Error reading in file")
    console.error(e);
    process.exit(1);
}

const outStrings = input.map(i => i.split(" | ")[1]);
let count = 0;

outStrings.forEach(s => {
    s.split(" ").forEach(d => {
        if (d.length === 2 || d.length === 4 || d.length === 3 || d.length === 7) count++;
    })

})


console.log("Answer", count)