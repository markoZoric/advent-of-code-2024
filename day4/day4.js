import { createReadStream } from "fs";
import { createInterface } from "readline";

const fileStream = createReadStream('./day4/day4.txt');
const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const arrays = [];
rl.on('line', line => {
    let chars = [...line];
    arrays.push(chars);
});

rl.on('close', () => {
    let task1Sum = 0;
    let task2Sum = 0;
    for(let x = 0; x < arrays.length; x++) {
        let currentArray = arrays[x];
        for(let y = 0; y < currentArray.length; y++) {
            if (arrays[x][y] === 'X') {
                let left =      arrays[x][y] + (arrays[x][y-1])     + (arrays[x][y-2])     + (arrays[x][y-3]);
                let leftUp =    arrays[x][y] + (arrays[x-1]?.[y-1]) + (arrays[x-2]?.[y-2]) + (arrays[x-3]?.[y-3]);
                let up =        arrays[x][y] + (arrays[x-1]?.[y]  ) + (arrays[x-2]?.[y]  ) + (arrays[x-3]?.[y]  );
                let rightUp =   arrays[x][y] + (arrays[x-1]?.[y+1]) + (arrays[x-2]?.[y+2]) + (arrays[x-3]?.[y+3]);
                let right =     arrays[x][y] + (arrays[x][y+1]    ) + (arrays[x][y+2]    ) + (arrays[x][y+3]    );
                let rightDown = arrays[x][y] + (arrays[x+1]?.[y+1]) + (arrays[x+2]?.[y+2]) + (arrays[x+3]?.[y+3]);
                let down =      arrays[x][y] + (arrays[x+1]?.[y]  ) + (arrays[x+2]?.[y]  ) + (arrays[x+3]?.[y]  );
                let leftDown =  arrays[x][y] + (arrays[x+1]?.[y-1]) + (arrays[x+2]?.[y-2]) + (arrays[x+3]?.[y-3]);

                task1Sum +=
                    (left === 'XMAS') + // true = 1, false = 0
                    (leftUp === 'XMAS') +
                    (up === 'XMAS') +
                    (rightUp === 'XMAS') +
                    (right === 'XMAS') +
                    (rightDown === 'XMAS') +
                    (down === 'XMAS') +
                    (leftDown === 'XMAS');
            }

            if (arrays[x][y] === 'A') {
                let leftUp =    arrays[x-1]?.[y-1];
                let rightUp =   arrays[x-1]?.[y+1];
                let rightDown = arrays[x+1]?.[y+1];
                let leftDown =  arrays[x+1]?.[y-1];

                let mas1 = leftUp + arrays[x][y] + rightDown;
                let mas2 = leftDown + arrays[x][y] + rightUp;

                if((mas1 === 'MAS' || mas1 === 'SAM') && (mas2 === 'MAS' || mas2 === 'SAM')) {
                    task2Sum++;
                }
            }
        }
    }

    console.log('First task sum is: ' + task1Sum);
    console.log('Second task sum is  ' + task2Sum);
});