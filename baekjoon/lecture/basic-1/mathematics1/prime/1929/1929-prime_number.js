    const fs = require('fs');
    const os = require('os');
    const [min, max] = fs.readFileSync(os.platform() ===
                                       'linux' ? '/dev/stdin' : 'input.txt')
                         .toString().split(' ').map(input => +input);
    const arr = new Array(max + 1).fill(false, 0, max + 1);
    arr[0] = true;
    arr[1] = true;

    for (let i = 2; i <= max; i++) {
        if (arr[i]) continue;
        // let j = i * 2;
        // while (j <= max) {
        //     arr[j] = true;
        //     j += i;
        // }
        for (let j = i + i; j <= max; j += i) {
            arr[j] = true;
        }
    }

    const answer = [];

    for (let i = min; i <= max; i++) {
        if (arr[i] === false) {
            answer.push(i)
        }
    }

    console.log(answer.join('\n'));