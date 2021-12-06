const fs = require('fs');

let input;

try {
    input = fs.readFileSync("./inputs/input4.txt", "utf8").split("\n");
} catch (e) {
    console.error("Error reading in file")
    console.error(e);
    process.exit(1);
}

let boards = [];
let winning_board = [];
let final_draw = 0;
const drawn = input.shift().split(",");
// clear empty row
input.shift();
while (input.length > 0) {
    let new_board = [];
    for (let i = 1; i<=5; i++) {
        if (input.length === 0 || input[0].length === 0) {
            break
        }
        new_board.push(input.shift().trim().split(/[^\S\r\n]+/));
    }

    if (new_board.length === 5) {
        boards.push(new_board);
    }

    if (input.length > 0) {
        input.shift();
    }

}

draw_loop:
while (drawn.length !== 0) {
    final_draw = drawn.shift();
    for (let b = 0; b<boards.length; b++) {
        const board = boards[b];
        current_board:
        for (let r = 0; r<board.length; r++) {
            const row = board[r];
            for (let c = 0; c<row.length; c++) {
                if (row[c] === final_draw) {
                    boards[b][r][c] = "X";
                    break current_board;
                }
            }
        }
        if (isWinner(boards[b])) {
            winning_board = boards[b];
            break draw_loop;
        }
    }
    
}

let sum = 0;

winning_board.forEach(r => {
    r.forEach(n => {
        if (n !== "X")
            sum += parseInt(n)
    })
})
console.log("Answer", sum*final_draw);

function isWinner(board) {
    // check rows
    for (let r = 0; r<board.length; r++) {
        const row = board[r];

        let winner = true;
        row.forEach(e => {
            if (e !== "X") {
                winner = false;
            }
        })
        if (winner) {
            return true;
        }
    }

    // check columns
    for (let c = 0; c<board[0].length; c++) {
        let winner = true;

        for (let r = 0; r<board.length; r++) {
            if (board[r][c] !== "X") {
                winner = false;
                break;
            }
        }

        if (winner) {
            return true;
        }
    }

    return false
}