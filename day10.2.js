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
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
}

const pairs = {
    ")": "(",
    "]": "[",
    "}": "{",
    ">": "<",
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">"    
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

    hasNext() {
        return this.top !== null;
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

let scores = [];

input.forEach(i => {
    let stack = new Stack();
    let score = 0;
    for (let x = 0; x<i.length; x++) {
        const b = i.charAt(x);
        if (["(", "{", "[", "<"].includes(b)) {
            stack.push(b);
        } else {
            if (stack.peek() !== pairs[b]) {
                return;
            } else {
                stack.pop();
            }
        }
    }
    let completionString = ""
    while(stack.hasNext()) {
        completionString += pairs[stack.pop()];
    }

    completionString.split("").forEach(c => {
        score = (5 * score) + points[c];
    })

    scores.push(score);
})

console.log("Answer", scores.sort((a, b) => a - b)[((scores.length+1)/2)-1])