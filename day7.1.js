const fs = require('fs');

let input;

try {
    input = fs.readFileSync("./inputs/input7.txt", "utf8").split("\n");
} catch (e) {
    console.error("Error reading in file")
    console.error(e);
    process.exit(1);
}

let lowest_fuel = Infinity;
const positions = input[0].split(",").sort((a, b) => a - b);
let upper, lower;
if (((positions.length/2) % 1) === 0.5) {
    lowest_fuel = getTotalFuel(positions, (positions.length+1)/2, lowest_fuel)
    upper = ((positions.length+1)/2) + 1
    lower = ((positions.length+1)/2) - 1
} else {
    upper = positions.length/2
    lower = (positions.length/2) - 1
}

while (lower >= 0) {
    lowest_fuel = Math.min(lowest_fuel, getTotalFuel(positions, positions[upper], lowest_fuel), getTotalFuel(positions, positions[lower], lowest_fuel));
    upper++;
    lower--;
}



console.log("Answer", lowest_fuel);

function getTotalFuel(positions, target, lowest) {
    let sum = 0;
    for (let i = 0; i<positions.length; i++) {
        sum += Math.abs(target - positions[i]);
        if (sum > lowest) return Infinity;
    }

    return sum;
}