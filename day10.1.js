const fs = require('fs');

let input;

try {
    input = fs.readFileSync("./inputs/input10.txt", "utf8").split("\n");
} catch (e) {
    console.error("Error reading in file")
    console.error(e);
    process.exit(1);
}

const points = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
}

const pairs = {
    ")": "(",
    "]": "[",
    "}": "{",
    ">": "<"    
}

class Element {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class Stack {
    constructor() {
        this.top = null;
    }

    peek() {
        return this.top.value;
    }

    pop() {
        const tmp = this.top.value;
        this.top = this.top.next;
        return tmp;
    }

    push(val) {
        this.top = new Element(val, this.top);
    }
}

let sum = 0;

input.forEach(i => {
    let stack = new Stack()
    for (let x = 0; x<i.length; x++) {
        const b = i.charAt(x);
        if (["(", "{", "[", "<"].includes(b)) {
            stack.push(b);
        } else {
            if (stack.peek() !== pairs[b]) {
                sum += points[b]
                return;
            } else {
                stack.pop();
            }
        }
    }
})


console.log("Answer", sum)