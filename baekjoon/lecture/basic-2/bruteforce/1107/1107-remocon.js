"use strict";

const {readFileSync} = require("fs");
const [targetChannelString, _, brokenButtonsString] = readFileSync(process.platform ===
"linux" ? "/dev/stdin" : "input.txt").toString().trim().split("\n");

let answer = 0;

const targetChannel = parseInt(targetChannelString);

let normalButtons = Array.from({
    length: 11
}, (_, k) => k);

const brokenButtons = brokenButtonsString.trim().split(" ").map(n => parseInt(n));
normalButtons = normalButtons.filter(n => !brokenButtons.includes(n));


if (canGo(targetChannel, normalButtons)) {
    answer = targetChannelString.length;
} else {
    let diff = 1;
    while (true) {
        let upperBoundChannel = targetChannel + diff;
        let downsideBoundChannel = targetChannel - diff;
        if (canGo(upperBoundChannel, normalButtons)) {
            answer =
                upperBoundChannel.toString().length + Math.abs(upperBoundChannel - targetChannel);
            break;
        }
        if (downsideBoundChannel >= 0) {
            if (canGo(downsideBoundChannel, normalButtons)) {
                answer = downsideBoundChannel.toString().length +
                    Math.abs(downsideBoundChannel - targetChannel);
                break;
            }
        }
        diff++;
    }

}

console.log(answer);


function canGo(channel, buttons) {
    const eachNumber = channel.toString().split('').map(n => parseInt(n));
    const remainNumber = eachNumber.filter(n => !buttons.includes(n));
    if (remainNumber.length > 0) {
        return false;
    }
    return true;
}