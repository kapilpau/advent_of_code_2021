const fs = require('fs');

let input;

try {
    input = fs.readFileSync("./inputs/input6.txt", "utf8").split("\n");
} catch (e) {
    console.error("Error reading in file")
    console.error(e);
    process.exit(1);
}

let days = {}
for (let i = 0; i<=8; i++) {
    days[i] = 0;
}

input[0].split(",").map(i => parseInt(i)).forEach(fish => {
    days[fish]++;
})

const noDays = 256;

for (let d = 0; d<noDays; d++) {
    let newFish = days[0];
    for (let f  = 1; f<Object.keys(days).length; f++) {
        const c = days[f];
        days[f-1] = days[f];
    }
    days[8] = newFish;
    days[6] += newFish;
}

let noFish = 0;

for (key in days) {
    noFish += days[key];
}

console.log(noFish);