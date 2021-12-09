const fs = require('fs');

let input;

try {
    input = fs.readFileSync("./inputs/input8.txt", "utf8").split("\n");
} catch (e) {
    console.error("Error reading in file")
    console.error(e);
    process.exit(1);
}

let sum = 0;

input.forEach(s => {
    const [inStrings, outStrings] = s.split(" | ");
    let strings = {}
    const digits = inStrings.split(" ")
    let one, two, three, four, five, six, seven, eight, nine, zero;
    let l5s = [];
    let l6s = [];
    digits.forEach(d => {
        if (d.length === 2) {
            strings[d.split("").sort().join("")] = 1;
            one = d;
        } else if (d.length === 3) {
            strings[d.split("").sort().join("")] = 7;
            seven = d;
        } else if (d.length === 4) {
            strings[d.split("").sort().join("")] = 4;
            four = d;
        } else if (d.length === 7) {
            strings[d.split("").sort().join("")] = 8;
            eight = d;
        } else if (d.length === 5) {
            l5s.push(d);
        } else if (d.length === 6) {
            l6s.push(d);
        }
    });

    const a = seven.split("").filter(x => !four.split("").includes(x))[0];
    const aOn4 = [...four, a];
    three = l5s.filter(x => x.includes(one[0]) && x.includes(one[1]))[0];
    strings[three.split("").sort().join("")] = 3;
    const g = three.split("").filter(x => !aOn4.includes(x))[0];
    const agOn4 = [...aOn4, g];
    const e = eight.split("").filter(x => !agOn4.includes(x))[0];
    two = l5s.filter(x => x.includes(e) && x !== three)[0];
    strings[two.split("").sort().join("")] = 2;
    five = l5s.filter(x => !x.includes(e) && x !== three)[0];
    strings[five.split("").sort().join("")] = 5;
    six = [...five, e].sort().join("");
    strings[six] = 6;
    nine = l6s.filter(x => !x.includes(e))[0];
    strings[nine.split("").sort().join("")] = 9;
    zero = l6s.filter(x => x.split("").sort().join("") !== six && x !== nine)[0];
    strings[zero.split("").sort().join("")] = 0;
    const joined = parseInt(outStrings.split(" ").map(a => {
        const x = strings[a.split("").sort().join("")];
        return x || 0
    }).join(""))
    sum += joined;
})


console.log("Answer", sum)