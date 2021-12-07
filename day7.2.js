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
const max_position = Math.max(...positions);
const min_position = Math.min(...positions);
const pos_range = max_position-min_position;
let upper, lower;
if (((pos_range/2) % 1) === 0.5) {
    lowest_fuel = getTotalFuel(positions, min_position + ((pos_range+1)/2), lowest_fuel)
    upper = min_position + ((pos_range+1)/2) + 1
    lower = min_position + ((pos_range+1)/2) - 1
} else {
    upper = min_position + ((pos_range)/2)
    lower = min_position + ((pos_range)/2) - 1
}

while (lower >= 0) {
    lowest_fuel = Math.min(lowest_fuel, getTotalFuel(positions, upper, lowest_fuel), getTotalFuel(positions, lower, lowest_fuel));
    upper++;
    lower--;
}



console.log("Answer", lowest_fuel);

function getTotalFuel(positions, target, lowest) {
    let sum = 0;
    for (let i = 0; i<positions.length; i++) {
        sum += triangular(Math.abs(target - positions[i]));
        if (sum > lowest) return Infinity;
    }
    return sum;
}

function triangular(value) {
    return ((value / 2) * (value + 1));
};