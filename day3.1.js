const fs = require('fs');

let input;

try {
    input = fs.readFileSync("./inputs/input3.txt", "utf8").split("\n");
} catch (e) {
    console.error("Error reading in file")
    console.error(e);
    process.exit(1);
}

let quantity = input.length;
let counts = new Array(input[0].length);
for (let i = 0; i<counts.length; i++) {
    counts[i] = 0;
}

input.forEach(i => {
    let bits = i.split("");
    for (let i = 0; i<bits.length; i++) {
        if (bits[i] === "1") counts[i]++;
    }
})

let gamma = "";
let epsilon = "";
counts.forEach(count => {
    if (count >= (quantity/2)) {
        gamma += "1"
        epsilon += "0"
    } else {
        gamma += "0"
        epsilon += "1"
    }
})
console.log("Answer", parseInt(gamma, 2) * parseInt(epsilon, 2));