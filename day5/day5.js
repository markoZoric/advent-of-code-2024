import { createReadStream } from "fs";
import { createInterface } from "readline";

const readStream = createReadStream('./day5/day5.txt');
const rl = createInterface ({
    input: readStream,
    crlfDelay: Infinity
});

const orderingRules = new Map();
const updates = [];
rl.on('line', line => {
    if (line.indexOf('|') > -1) {
        let lineSplit = line.split('|');
        if (lineSplit[0] && !orderingRules[lineSplit[0]]) {
            orderingRules[lineSplit[0]] = [];
        }
        if (lineSplit[1]) {
            orderingRules[lineSplit[0]].push(lineSplit[1]);
        }
    }

    if (line.indexOf(',') > -1) {
        updates.push(line.split(','));
    }
});

rl.on('close', () => {
    let middlePageSum = 0;
    updates.forEach(pages => {
        let rightOrder = true;
        for (let i = 0; i < pages.length; i++) {
            let page = pages[i];
            let pageRules = orderingRules[page] || [];
            
            pageRules.forEach(rule => {
                let pageIndex = i;
                let ruleIndex = pages.indexOf(rule);
                let minIndex = pages.length;
                if (ruleIndex > -1 && pageIndex > ruleIndex) {
                    let temp = pages[pageIndex];
                    pages[pageIndex] = pages[ruleIndex];
                    pages[ruleIndex] = temp;
                    if (ruleIndex < minIndex) {
                        minIndex = ruleIndex;
                    }
                    rightOrder = false;
                    i = minIndex - 1;
                }
            });
        }
        if (!rightOrder) {
            let middlePage = pages[Math.floor(pages.length / 2)];
            middlePageSum += parseInt(middlePage);
        }
    });

    console.log(middlePageSum);
});

