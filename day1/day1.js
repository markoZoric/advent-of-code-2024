import { createReadStream } from 'fs';
import { createInterface } from 'readline';

const fileStream = createReadStream('day1.txt');
const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const distance1 = [];
const distance2 = [];

rl.on('line', (line) => {
    let split = line.split(' ');
    distance1.push(split[0]);
    distance2.push(split[1]);
});

rl.on('close', () => {
    for (let i = 0; i < distance1.length; i++) {
        for (let j = 0; j < distance1.length - i - 1; j++) {
            if (distance1[j] > distance1[j + 1]) {
                let temp = distance1[j];
                distance1[j] = distance1[j + 1];
                distance1[j + 1] = temp;
            }

            if (distance2[j] > distance2[j + 1]) {
                let temp = distance2[j];
                distance2[j] = distance2[j + 1];
                distance2[j + 1] = temp;
            }
        }
    }

    let distanceSum = 0;

    for (let i = 0; i < distance1.length; i++) {
        distanceSum += Math.abs(distance1[i] - distance2[i]);
    }

    console.log('Distance sum is: ' + distanceSum);
    
    const map = new Map();
    distance2.forEach(distance => {
        if (map[distance] === undefined) {
            map[distance] = 1;
        } else {
            map[distance]++;
        }
    });

    let similarityScore = 0;
    distance1.forEach(distance => {
        let sum = parseInt(distance) * parseInt(map[distance]) || 0;
        similarityScore += sum;
    });

    console.log('Similarity score is: ' + similarityScore);
});


