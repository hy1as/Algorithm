const fs = require('fs')
const [T, sequenceString] = fs.readFileSync(process.platform ===
                                            'linux' ? '/dev/stdin' : 'input.txt')
                              .toString().trim().split('\n');
// 입력 받은 수열의 길이
const lengthOfSequence = +T;
// 입력 받은 수열
const sequenceArray = sequenceString.split(' ').map(n => +n);

// 부분 수열 Memo
const subsequenceLengthMemo = [];
// 완성된 부분 수열의 바로 이전 위치의 원소 인덱스 ( 수열 출력을 위해 각 부분수열의 마지막 원소를 기록하여 역산할 배열 )
const lastThroughMemo = [];
// 첫번째 원소는 항상 자기 자신을 원소로하는 길이가 1인 부분수열을 생성
subsequenceLengthMemo[0] = 1;
// 첫번째 원소는 길이 1인 완성한 부분 수열에서 바로 이전 원소가 존재하지 않기 때문에 null
lastThroughMemo[0] = null;
// 가장 긴 부분 수열이 만들어지는 위치의 인덱스 변수
let maxLengthIndexForAnswer = 0;

// 수열의 두번째 원소부터 Loop
for (let i = 1; i < lengthOfSequence; i++) {
    // 현재 위치 수열 원소
    const currentElementNumber = sequenceArray[i];
    // 현재 위치 숫자를 마지막으로 하는 가장 긴 부분수열의 길이 변수
    let maxSubsequenceIndex = null
    // 현재 위치 이전 인덱스 까지 Loop
    for (let j = 0; j < i; j++) {
        // 현재 수를 마지막 원소로 하는 부분 수열이 아직 생성되지 않았거나
        // 현재 수보다 수열의 앞(왼쪽)에 나오는 수가 현재 수 보다 작은 경우 수열 생성 시도 
        if (sequenceArray[j] < currentElementNumber) {
            maxSubsequenceIndex = maxSubsequenceIndex === null ||
                                  subsequenceLengthMemo[maxSubsequenceIndex] <
                                  subsequenceLengthMemo[j] ? j : maxSubsequenceIndex
        }
    }
    // 부분 수열이 생성 되지 않았다면
    if (maxSubsequenceIndex === null) {
        // 자신만을 원소로 하는 부분 수열 기록
        subsequenceLengthMemo[i] = 1;
        lastThroughMemo[i] = null;
    } else {
        // 부분수열이 생성되었다면
        // 현재 위치에서 완성된 부분 배열의 길이 기록
        subsequenceLengthMemo[i] = subsequenceLengthMemo[maxSubsequenceIndex] +
                                   1;
        // 만들어진 수열의 마지막의 바로 이전 인덱스 기록
        lastThroughMemo[i] = maxSubsequenceIndex
    }
    // 현재 까지 가장 긴 부분 배열의 길이
    if (subsequenceLengthMemo[maxLengthIndexForAnswer] <
        subsequenceLengthMemo[i]) {
        maxLengthIndexForAnswer = i
    }
}

// 기록된 가장 긴 수열의 길이
const answerLength = subsequenceLengthMemo[maxLengthIndexForAnswer]
// 기록된 가장 긴 부분 수열 출력 위한 배열
const answerSequence = []

// 수열의 마지막 ( null ) 이 나올때까지 배열 역산
while (maxLengthIndexForAnswer !== null) {
    answerSequence.push(sequenceArray[maxLengthIndexForAnswer])
    maxLengthIndexForAnswer = lastThroughMemo[maxLengthIndexForAnswer]
}

console.log(answerLength + '\n' + answerSequence.reverse().join(' '))


