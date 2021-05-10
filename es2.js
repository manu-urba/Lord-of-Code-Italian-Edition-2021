'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}



/*
 * Complete the 'minimumGroups' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY predators as parameter.
 */

const nest = (items, specie = -1) => items.filter(item => item.predators == specie).map(item => ({ ...item, children: nest(items, item.specie) }));

const getDepth = (node) => 1 + Math.max(0, ...node.map(({ children = [] }) => getDepth(children)));

function minimumGroups(predators) {    
    let childs = predators.map((value, i) => {return {specie: i, predators: predators[i]}});
    
    let max = 0;
   
    for (let branch of nest(childs)) {
        let depth = getDepth(branch.children);
        if (depth > max)
            max = depth;
    }
    return max;
    
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const predatorsCount = parseInt(readLine().trim(), 10);

    let predators = [];

    for (let i = 0; i < predatorsCount; i++) {
        const predatorsItem = parseInt(readLine().trim(), 10);
        predators.push(predatorsItem);
    }

    const result = minimumGroups(predators);

    ws.write(result + '\n');

    ws.end();
}
