"use strict";

const {readFileSync} = require("fs");
const groupOfDwarfHeights = readFileSync(process.platform === "linux" ? "/dev/stdin" :
    "input.txt").toString().trim().split("\n").map(n => parseInt(n));

// 난쟁이들의 키의 합
const sumOfAllDwarfHeights = groupOfDwarfHeights.reduce((prev, current) => prev + current, 0);

// 제외할 두 난쟁이를 구하는 함수
function getExcludedDwarfs(heights) {
    // 제외할 난쟁이 A 선정
    for (let excludedDwarfA = 0; excludedDwarfA < heights.length - 1; excludedDwarfA++) {
        // 제외할 난쟁이 B 선정 ( A 이후로 나오는 난쟁이 )
        for (let excludedDwarfB = excludedDwarfA + 1; excludedDwarfB <
        heights.length; excludedDwarfB++) {
            // 선정한 난쟁이들을 제외한 난쟁이들의 키의 합이 100이 되는 경우 제외할 난쟁이 확정하여 반환
            if (sumOfAllDwarfHeights - (heights[excludedDwarfA] + heights[excludedDwarfB]) ===
                100) {
                return [heights[excludedDwarfA], heights[excludedDwarfB]];
            }
        }
    }
}

const twoExcludedDwarfs = getExcludedDwarfs(groupOfDwarfHeights);
const correctDwarfs = groupOfDwarfHeights.filter((height) => !twoExcludedDwarfs.includes(height));
const answer = correctDwarfs.sort((a, b) => a - b);

console.log(answer.join("\n"));