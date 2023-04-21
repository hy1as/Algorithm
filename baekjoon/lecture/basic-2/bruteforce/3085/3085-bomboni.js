"use strict";

const {readFileSync} = require("fs");
const [N, ...boardRowsString] = readFileSync(process.platform === "linux" ? "/dev/stdin" :
    "input.txt").toString().trim().split("\n");

const horizontalVerticalLengthOfBoard = parseInt(N);
const board = boardRowsString.map(row => row.trim().replace("\r", " ").split(""));
board.unshift([]);
board.forEach(r => r.unshift([]));

function scan() {
    let maxCount = 0;
    for (let i = 1; i <= horizontalVerticalLengthOfBoard; i++) {
        let verticalCurrentColor = null;
        let verticalCurrentLength = 0;
        let horizontalCurrentColor = null;
        let horizontalCurrentLength = 0;
        for (let j = 1; j <= horizontalVerticalLengthOfBoard; j++) {
            // 순회 시작
            if (verticalCurrentColor === board[i][j]) {
                verticalCurrentLength += 1;
                maxCount = Math.max(maxCount, verticalCurrentLength);
            } else {
                verticalCurrentColor = board[i][j];
                verticalCurrentLength = 1;
            }
            if (horizontalCurrentColor === board[j][i]) {
                horizontalCurrentLength += 1;
                maxCount = Math.max(maxCount, horizontalCurrentLength);
            } else {
                horizontalCurrentColor = board[j][i];
                horizontalCurrentLength = 1;
            }
        }
    }
    return maxCount;
}

let answer = scan();

for (let i = 1; i <= horizontalVerticalLengthOfBoard; i++) {
    for (let j = 1; j <= horizontalVerticalLengthOfBoard - 1; j++) {
        // 세로로의 교환
        [board[i][j], board[i][j + 1]] = [board[i][j + 1], board[i][j]];
        // 교환 후 현재 보드 상태 체크
        answer = Math.max(answer, scan());
        // 원복
        [board[i][j], board[i][j + 1]] = [board[i][j + 1], board[i][j]];
        // 가로로의 교환
        [board[j][i], board[j + 1][i]] = [board[j + 1][i], board[j][i]];
        // 교환 후 현재 보드 상태 체크
        answer = Math.max(answer, scan());
        // 원복
        [board[j][i], board[j + 1][i]] = [board[j + 1][i], board[j][i]];
    }
}

console.log(answer);