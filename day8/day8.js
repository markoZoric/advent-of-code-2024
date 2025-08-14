console.time('Execution');

import { createReadStream } from 'fs';
import { createInterface } from 'readline';

const readStream = createReadStream('./day8/day8.txt');
const rl = createInterface({
    input: readStream,
    crlfDelay: Infinity
});

const matrix = [];
const frequencies = new Map();

rl.on('line', line => {
    let lineArray = [...line];
    lineArray.forEach((el, idx) => {
        if (el !== '.' && !frequencies.get(el)) {
            let coordinates = {x: matrix.length, y: idx};
            frequencies.set(el, [coordinates]);
        } else if (frequencies.get(el)) {
            let coordinates = {x: matrix.length, y: idx};
            frequencies.get(el).push(coordinates);
        }
    });
    matrix.push([...line]);
});

rl.on('close', () => {
    let totalAntinodes = 0;
    frequencies.values().forEach(frequency => {
        if (frequency.length > 1) {
            for (let freq1 of frequency) {
                for (let freq2 of frequency) {
                    let distance = {x: Math.abs(freq2.x - freq1.x), y: Math.abs(freq2.y - freq1.y)};
                    if (!(distance.x === 0 && distance.y === 0)) {
                        let antinodes = findAntinodes(freq1, freq2, distance)
                        totalAntinodes += antinodes;
                    }
                }
            }
        }
    });
    console.log(totalAntinodes);
    console.timeEnd('Execution');
});

const findAntinodes = (freq1, freq2, distance) => {
    let antinodeSum = 0;
    if (freq1.x < freq2.x && freq1.y > freq2.y) {
        // leaning right
        let antinode1 = matrix[freq1.x][freq1.y];
        let antinode2 = matrix[freq2.x][freq2.y];
        
        let newfreq1 = structuredClone(freq1);
        while(antinode1 !== undefined) {
            if (antinode1 !== '#') {
                antinodeSum++;
                matrix[newfreq1.x][newfreq1.y] = '#';
            }
            newfreq1.x = newfreq1.x - distance.x;
            newfreq1.y = newfreq1.y + distance.y;
            antinode1 = matrix[newfreq1.x]?.[newfreq1.y];
        }

        newfreq1 = structuredClone(freq1);
        let newfreq2 = structuredClone(freq2);
        while(antinode2 !== undefined) {
            if (antinode2 !== '#') {
                antinodeSum++;
                matrix[newfreq2.x][newfreq2.y] = '#';
            }
            newfreq2.x = newfreq2.x + distance.x;
            newfreq2.y = newfreq2.y - distance.y;
            antinode2 = matrix[newfreq2.x]?.[newfreq2.y];
        }
    }

    if (freq1.x < freq2.x && freq1.y < freq2.y) {
        // leaning left
        let antinode1 = matrix[freq1.x][freq1.y];
        let antinode2 = matrix[freq2.x][freq2.y];
    
        let newfreq1 = structuredClone(freq1);
        while(antinode1 !== undefined) {
            if (antinode1 !== '#') {
                antinodeSum++;
                matrix[newfreq1.x][newfreq1.y] = '#';
            }
            newfreq1.x = newfreq1.x - distance.x;
            newfreq1.y = newfreq1.y - distance.y;
            antinode1 = matrix[newfreq1.x]?.[newfreq1.y];
        }

        newfreq1 = structuredClone(freq1);
        let newfreq2 = structuredClone(freq2);
        while(antinode2 !== undefined) {
            if (antinode2 !== '#') {
                antinodeSum++;
                matrix[newfreq2.x][newfreq2.y] = '#';
            }
            newfreq2.x = newfreq2.x + distance.x;
            newfreq2.y = newfreq2.y + distance.y;
            antinode2 = matrix[newfreq2.x]?.[newfreq2.y];
        }
    }

    if (freq1.x === freq2.x) {
        //horizontal
        let antinode1 = matrix[freq1.x][freq1.y];
        let antinode2 = matrix[freq2.x][freq2.y];
        
        let newfreq1 = structuredClone(freq1);
        while(antinode1 !== undefined) {
            if (antinode1 !== '#') {
                antinodeSum++;
                matrix[newfreq1.x][newfreq1.y] = '#';
            }

            newfreq1.y = newfreq1.y - distance.y;
            antinode1 = matrix[newfreq1.x]?.[newfreq1.y];
        }

        newfreq1 = structuredClone(freq1);
        let newfreq2 = structuredClone(freq2);
        while(antinode2 !== undefined) {
            if (antinode2 !== '#') {
                antinodeSum++;
                matrix[newfreq2.x][newfreq2.y] = '#';
            }
            newfreq2.y = newfreq2.y + distance.y;
            antinode2 = matrix[newfreq2.x]?.[newfreq2.y];
        }
    }

    if (freq1.y === freq2.y) {
        // vertical
        let antinode1 = matrix[freq1.x][freq1.y];
        let antinode2 = matrix[freq2.x][freq2.y];
        
        let newfreq1 = structuredClone(freq1);
        while(antinode1 !== undefined) {
            if (antinode1 !== '#') {
                antinodeSum++;
                matrix[newfreq1.x][newfreq1.y] = '#';
            }
            newfreq1.x = newfreq1.x - distance.x;
            antinode1 = matrix[newfreq1.x]?.[newfreq1.y];
        }

        newfreq1 = structuredClone(freq1);
        let newfreq2 = structuredClone(freq2);
        while(antinode2 !== undefined) {
            if (antinode2 !== '#') {
                antinodeSum++;
                matrix[newfreq2.x][newfreq2.y] = '#';
            }
            newfreq2.x = newfreq2.x + distance.x;
            antinode2 = matrix[newfreq2.x]?.[newfreq2.y]
        }
    }
    return antinodeSum;
}
