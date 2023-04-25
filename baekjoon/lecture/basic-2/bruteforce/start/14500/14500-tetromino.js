"use strict";
const {readFileSync} = require("fs");
const [boardDefinition, ...boradsString] = readFileSync(process.platform === "linux" ?
    "/dev/stdin" : "input.txt").toString().trim().split("\n");
const [height, width] = boardDefinition.split(" ").map(n => parseInt(n));
const board = boradsString.map(row => row.trim().split(" ").map(n => parseInt(n)));

function possible(tetromino) {
    for (const cell of tetromino) {
        if (cell[0] > height - 1 || cell[1] > width - 1 || cell[0] < 0 || cell[1] < 0) {
            return false;
        }
    }
    return true;
}

function getValueOfTetromino(tetromino) {
    let value = 0;
    for (const cell of tetromino) {
        value += board[cell[0]][cell[1]];
    }
    return value;
}

const groupOfTetromino = [// 'ㅡ'
    [[0, 0], [0, 1], [0, 2], [0, 3]], [[0, 0], [1, 0], [2, 0], [3, 0]],

    // 'ㅁ'
    [[0, 0], [1, 0], [0, 1], [1, 1]],

    // 'ㄴ'
    [[0, 0], [0, 1], [0, 2], [1, 2]], [[0, 0], [0, 1], [1, 0], [2, 0]],
    [[0, 0], [1, 0], [1, 1], [1, 2]], [[0, 1], [1, 1], [2, 0], [2, 1]],

    // 'ㄴ' 대칭
    [[1, 0], [1, 1], [1, 2], [0, 2]], [[0, 0], [0, 1], [1, 1], [2, 1]],
    [[0, 0], [1, 0], [0, 1], [0, 2]], [[0, 0], [1, 0], [2, 0], [2, 1]],

    // 'ㄹ'
    [[0, 0], [0, 1], [1, 1], [1, 2]], [[0, 1], [1, 0], [1, 1], [2, 0]],

    // 'ㄹ' 대칭
    [[1, 0], [1, 1], [0, 1], [0, 2]], [[0, 0], [1, 0], [1, 1], [2, 1]],

    // 'ㅗ'
    [[0, 0], [1, 0], [1, 1], [2, 0]], [[1, 0], [0, 1], [1, 1], [1, 2]],
    [[1, 0], [0, 1], [1, 1], [2, 1]], [[0, 0], [0, 1], [1, 1], [0, 2]],];

let answer = 0;

function getCurrentPositionOfTetromino(tetromino, x, y) {
    const position = tetromino.map((cell) => {
        return [cell[0] + y, cell[1] + x];
    });
    return position;
}

for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
        for (const tetromino of groupOfTetromino) {
            const currentPositionOfTetromino = getCurrentPositionOfTetromino(tetromino, x, y);
            if (possible(currentPositionOfTetromino)) {
                answer = Math.max(answer, getValueOfTetromino(currentPositionOfTetromino));
                console.log(answer, getValueOfTetromino(currentPositionOfTetromino), currentPositionOfTetromino, tetromino);
            }
        }
    }
}

console.log(answer);
