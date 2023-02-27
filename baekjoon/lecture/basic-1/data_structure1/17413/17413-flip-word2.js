const fs = require('fs');
const os = require('os');
const sentence = fs.readFileSync(os.platform() ===
                                 'linux' ? '/dev/stdin' : 'input.txt')
                   .toString().trim();
// => 메모리 초과
// const answer = [];
// const stack = [];
// let parenthesisFlag = false;
// for (let i = 0; i < sentence.length; i++) {
//     const groupOfChars = [...sentence];
//     const char = groupOfChars[i]
//     if (char === '<') {
//         if(stack.length > 0) {
//             while (stack.length !== 0) {
//                 answer.push(stack.pop());
//             }
//         }
//         parenthesisFlag = true;
//         answer.push(char);
//     } else if (char === '>') {
//         parenthesisFlag = false;
//         answer.push(char);
//     } else {
//         if (parenthesisFlag) {
//             answer.push(char);
//         } else {
//             if (char === ' ' || i === sentence.length - 1) {
//                 while (stack.length !== 0) {
//                     answer.push(stack.pop());
//                 }
//                 answer.push(char);
//             } else {
//                 stack.push(char);
//             }
//         }
//     }
// }
//
// console.log(answer.join(''));

let answer = '';
let isTag = false;
let word = ''
for (let i = 0; i < sentence.length; i++) {
    const char = sentence[i];
    switch (char) {
        case '<':
            answer += [...word].reverse().join('');
            word = '';
            answer += '<';
            isTag = true;
            break;
        case '>':
            answer += [...word].join('');
            word = '';
            answer += '>';
            isTag = false;
            break;
        case ' ':
            if (isTag) {
                answer += [...word].join('');
                answer += ' ';
                word = '';
            } else {
                answer += [...word].reverse().join('');
                answer += ' ';
                word = '';
            }
            break;
        default:
            word += char;
            break;
    }
}
console.log(answer + [...word].reverse().join(''));