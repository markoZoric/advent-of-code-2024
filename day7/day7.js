console.time('Execution');

import { createReadStream } from 'fs';
import { createInterface } from 'readline';

const readStream = createReadStream('./day7/day7.txt');
const rl = createInterface({
    input: readStream,
    crlfDelay: Infinity
});

const testResults = [];
const operations = ['+', '*', '||'];

const getOperationCombinations = (operations, length) => {
    let combinations = [];

    const backtrack = (current) => {
        if (current.length === length) {
            combinations.push([...current]);
            return;
        }

        for (let opertaion of operations) {
            current.push(opertaion);
            backtrack(current);
            current.pop();
        }
    }

    backtrack([]);

    return combinations;
}

rl.on('line', line => {
    let splitSum = line.split(':');
    let sum = parseInt(splitSum[0]);

    let numbersStr = splitSum[1].replace(' ', '').split(' ');
    let parsedNums = [...numbersStr];
    let ops = getOperationCombinations(operations, numbersStr.length - 1);

    for (let opertaion of ops) {
        let testOp = '';
        for (let i = 0; i < numbersStr.length; i++) {
            testOp += numbersStr[i];
            if (i < opertaion.length) {
                testOp += opertaion[i];
            }
        }
    }

    testResults.push({
        sum: sum,
        numbers: parsedNums,
        ops: ops
    });
});

rl.on('close', () => {
    let calibrationResult = 0;
    for (let testResult of testResults) {
        for (let opertaion of testResult.ops) {
            let stepOp = '';
            let opValue = 0;
            for (let i = 0; i < testResult.numbers.length; i++) {
                stepOp += testResult.numbers[i];
                if (i > 0) {
                    stepOp = stepOp.replace('||', '');
                    opValue = eval(stepOp);
                    stepOp = opValue.toString();
                }
                if (i < opertaion.length) {
                    stepOp += opertaion[i];
                }
            }
            if (opValue === testResult.sum) {
                calibrationResult += opValue;
                break;
            }
        }
    }
    
    console.log(calibrationResult);
    console.timeEnd('Execution');
});