const fs = require('fs');

let input;

try {
    input = fs.readFileSync("./inputs/input2.txt", "utf8").split("\n");
} catch (e) {
    console.error("Error reading in file")
    console.error(e);
    process.exit(1);
}

let height = 0;
let forward = 0;

input.forEach(i => {
    if (i !== "") {
        const parts = i.split(" ");
        const instruction = parts[0];
        const scale = parseInt(parts[1]);
        switch (instruction) {
            case "forward":
                forward += scale            
                break;
            case "up":
                height -= scale            
                break;
            case "down":
                height += scale            
                break;
            default:
                break;
        }
    }
})

console.log("Answer", height*forward);