
import { createReadStream } from 'fs';
import { createInterface } from 'readline';

const fileStream = createReadStream('./day2/day2.txt');
const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const reports = [];
rl.on('line', line => {
    let levels = [];
    let lvlStr = line.split(' ');
    lvlStr.forEach(lvl => {
        levels.push(parseInt(lvl));
    });
    reports.push(levels);
});

rl.on('close', () => {
    let stableReports = 0;
    reports.forEach(levels => {
        let faultyIndexes = findFaultyIndexes(levels);
         // example [83,81,82,85,88,90,92,93] - registers as a decreasing array, making every index wrong except 0, which is actually the wrong one
        if (faultyIndexes.length === levels.length - 1) {
            faultyIndexes.unshift(0);
        }

        let minFaults = faultyIndexes.length;
        faultyIndexes.forEach(faultyIndex => {
            let splice = [...levels];
            splice.splice(faultyIndex, 1);
            let newFaulty = findFaultyIndexes(splice);
            if (newFaulty.length < minFaults) {
                minFaults = newFaulty.length;
            }
        });

        if (minFaults <= 1) {
            stableReports++;
        }
    });

    console.log('Number of safe reports is ' + stableReports);
});

const findFaultyIndexes = (levels) => {
    let increasing = false;
    let faultyIndexes = [];
    for (let i = 0; i < levels.length; i++) {
        let previousLvl = levels [i - 1] || null;
        let currentLvl = levels[i];
        let nextLvl = levels[i + 1] || null;
        if (i === 0 && currentLvl < nextLvl ) {
            increasing = true;
        }
        if (increasing) {
            if ((previousLvl && (currentLvl <= previousLvl || currentLvl - previousLvl > 3)) || (nextLvl && (currentLvl >= nextLvl || nextLvl - currentLvl > 3 ))) {
                faultyIndexes.push(i);
            }
        }
        if (!increasing) {
            if ((previousLvl && (currentLvl >= previousLvl || previousLvl - currentLvl > 3)) || (nextLvl && (currentLvl <= nextLvl || currentLvl - nextLvl > 3))) {
                faultyIndexes.push(i);
            }
        }
    }

    return faultyIndexes;
}