const fs = require('fs');

let input;

try {
    input = fs.readFileSync("./inputs/input3.txt", "utf8").split("\n");
} catch (e) {
    console.error("Error reading in file")
    console.error(e);
    process.exit(1);
}

let o2 = [...input];
let co2 = [...input];

for (let i = 0; i<input[0].length; i++) {
    if (o2.length > 1) {
        let mcc = getMostCommonCharAt(o2, i);
        o2 = o2.filter(e => e.charAt(i) === mcc);
    }
    
    if (co2.length > 1) {
        mcc = getMostCommonCharAt(co2, i);
        co2 = co2.filter(e => e.charAt(i) !== mcc);
    }
    if (o2.length === 1 && co2.length === 1) break;
    
}


console.log("Answer", parseInt(o2[0], 2) * parseInt(co2[0], 2));

function getMostCommonCharAt(a, i) {
    let count = 0;
    a.forEach(x => {
        if (x.charAt(i) === "1") count++
    })
    return count >= a.length/2 ? "1" : "0";
}