console.time('Execution');

import { createReadStream, read } from 'fs';
import { createInterface } from 'readline';

const readStream = createReadStream('./day6/day6.txt');
const rl = createInterface({
    input: readStream,
    crlfDelay: Infinity
});

const mapMatrix = [];
const startingPosition = {
    x: 0,
    y: 0
};
const state = {
    UP: 1,
    RIGHT: 2,
    DOWN: 3,
    LEFT: 4
}

rl.on('line', line => {
    let splitLine = [...line];
    mapMatrix.push(splitLine);
    let startIndex = splitLine.indexOf('^');
    if(startIndex > -1) {
        startingPosition.x = mapMatrix.length - 1;
        startingPosition.y = startIndex
    }
        
});

rl.on('close', () => {
    mapMatrix[startingPosition.x][startingPosition.y] = 'X' // starting location is also visited
    moveGuard(state.UP, {x: startingPosition.x, y: startingPosition.y}, mapMatrix, true); // every field that guard visits is now marked

    let loopPlacements = 0;
    let visitedLocations = new Set();
    mapMatrix.forEach((row, rowIdx) => {
        row.forEach((_, colIdx) => {
            let matrixCopy = mapMatrix.map(row => [...row]);
            if (matrixCopy[rowIdx][colIdx] === 'X' && !(rowIdx === startingPosition.x && colIdx === startingPosition.y)) {
                matrixCopy[rowIdx][colIdx] = 'O';
            }
            let loopStatus = moveGuard(state.UP, {x: startingPosition.x, y: startingPosition.y}, matrixCopy, false, visitedLocations);
            visitedLocations.clear();
            if (loopStatus.isLoop) {
                loopPlacements++;
            }
        });
    });
    
    console.log(loopPlacements);
    console.timeEnd('Execution');
});

const moveGuard = (currState, start, mapMatrix, markPositions, visitedLocations) => {
    let currentPosition = start;
    let nextPosition = '';
    if (currState === state.UP) {
        nextPosition = mapMatrix[currentPosition.x - 1]?.[currentPosition.y];
        while(nextPosition !== '#' && nextPosition !== 'O') {
            currentPosition.x -= 1;
            if (markPositions) {
                mapMatrix[currentPosition.x][currentPosition.y] = 'X'
            }
            if (visitedLocations && !addVisited(visitedLocations, currentPosition, currState)) {
                return { isLoop: true }
            }
            nextPosition = mapMatrix[currentPosition.x - 1]?.[currentPosition.y];
            if (nextPosition === undefined) {
                break;
            }
        }
    }
    
    if (currState === state.RIGHT) {
        nextPosition = mapMatrix[currentPosition.x][currentPosition.y + 1];
        while(nextPosition !== '#' && nextPosition !== 'O') {
            currentPosition.y += 1;
            if (markPositions) {
                mapMatrix[currentPosition.x][currentPosition.y] = 'X'
            }
            if (visitedLocations && !addVisited(visitedLocations, currentPosition, currState)) {
                return { isLoop: true }
            }
            nextPosition = mapMatrix[currentPosition.x][currentPosition.y + 1];
            if (nextPosition === undefined) {
                break;
            }
        }
    }

    if (currState === state.DOWN) {
        nextPosition = mapMatrix[currentPosition.x + 1]?.[currentPosition.y];
        while(nextPosition !== '#' && nextPosition !== 'O') {
            currentPosition.x += 1;
            if (markPositions) {
                mapMatrix[currentPosition.x][currentPosition.y] = 'X'
            }
            if (visitedLocations && !addVisited(visitedLocations, currentPosition, currState)) {
                return { isLoop: true }
            }
            nextPosition = mapMatrix[currentPosition.x + 1]?.[currentPosition.y];
            if (nextPosition === undefined) {
                break;
            }
        }
    }

    if (currState === state.LEFT) {
        nextPosition = mapMatrix[currentPosition.x][currentPosition.y - 1];
        while(nextPosition !== '#' && nextPosition !== 'O') {
            currentPosition.y -= 1;
            if (markPositions) {
                mapMatrix[currentPosition.x][currentPosition.y] = 'X'
            }
            if (visitedLocations && !addVisited(visitedLocations, currentPosition, currState)) {
                return { isLoop: true }
            }
            nextPosition = mapMatrix[currentPosition.x][currentPosition.y - 1];
            if (nextPosition === undefined) {
                break;
            }
        }
    }
    
    if (nextPosition !== undefined) {
        let nextState = currState + 1 > state.LEFT ? state.UP : currState + 1;
        return moveGuard(nextState, currentPosition, mapMatrix, markPositions, visitedLocations);
    }

    return { isLoop: false };
}

function addVisited(visitedLocations, currentPosition, currState) {
    const setValue = currentPosition.x.toString() + '_' + currentPosition.y.toString() + '_' + currState.toString();
    if (visitedLocations.has(setValue)) {
        return false;
    }
    visitedLocations.add(setValue);
    return true;
}