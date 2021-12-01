const fs = require('fs');

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class Sum {

    constructor() {
        this.sum = 0;
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    push(val) {
        const newNode = new Node(val);
        if (this.size === 3) {
            this.last.next = newNode;
            this.last = this.last.next;
            this.sum = this.sum + val - this.first.val;
            this.first = this.first.next;
        } else {
            if (this.size === 0) {
                this.sum = val;
                this.first = newNode;
                this.size++;
            } else if (this.size === 1) {
                this.sum += val;
                this.first.next = newNode;
                this.size++;
            } else {
                this.sum += val;
                this.first.next.next = newNode;
                this.last = this.first.next.next;
                this.size++;
            }
        }

        return this;
    }

}

let input;

try {
    input = fs.readFileSync("./inputs/input1.txt", "utf8").split("\n");
} catch (e) {
    console.error("Error reading in file")
    console.error(e);
    process.exit(1);
}

let sum = new Sum();
sum.push(parseInt(input[0]))
sum.push(parseInt(input[1]))
sum.push(parseInt(input[2]))
let count = 0;

for (let i = 3; i<input.length; i++) {
    if (sum.sum < sum.push(parseInt(input[i])).sum)
        count++;
}

console.log("Answer:", count)