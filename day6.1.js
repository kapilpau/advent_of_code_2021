const fs = require('fs');

let input;

try {
    input = fs.readFileSync("./inputs/input6.txt", "utf8").split("\n");
} catch (e) {
    console.error("Error reading in file")
    console.error(e);
    process.exit(1);
}

let days = input[0].split(",").map(i => parseInt(i))
const noDays = 80;

for (let d = 0; d<noDays; d++) {
    const l = days.length;
    for (let f = 0; f<l; f++) {
        if (days[f] === 0) {
            days[f] = 6;
            days.push(8);
        } else days[f]--;
    }
}

console.log(days.length);