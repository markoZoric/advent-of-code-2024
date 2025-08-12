import { createReadStream } from 'fs';
import { createInterface } from 'readline';

const fileStream = createReadStream('./day3/day3.txt');
const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const mulRegEx = /do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\)/g;
const digitRegEx = /\d{1,3}/g;

let mulSum = 0;
let mulEnabled = true;

rl.on('line', line => {
    let matches = line.match(mulRegEx);
    matches.forEach(regexMatch => {
        if (regexMatch === `don't()`) {
            mulEnabled = false;
        }

        if (regexMatch === `do()`) {
            mulEnabled = true;
        }

        let nums = regexMatch.match(digitRegEx);
        if (nums && nums.length && mulEnabled) {
            let baseNum = nums[0];
            let multiplier = nums[1];
            mulSum += baseNum * multiplier;
        }
    })
});

rl.on('close', () => {
    console.log(mulSum);
});