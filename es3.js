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
 * Complete the 'photoAlbum' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY index
 *  2. INTEGER_ARRAY identity
 */

function photoAlbum(index, identity) {    
    let album = [];
    /* This code makes the program way heavier with big input data
    for (let [i, id] of identity.entries()) {
        album.splice(index[i], 0, id);
    }*/
    for (let i = 0; i < identity.length; ++i) {
        album.splice(index[i], 0, identity[i]);
    }
    return album;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const indexCount = parseInt(readLine().trim(), 10);

    let index = [];

    for (let i = 0; i < indexCount; i++) {
        const indexItem = parseInt(readLine().trim(), 10);
        index.push(indexItem);
    }

    const identityCount = parseInt(readLine().trim(), 10);

    let identity = [];

    for (let i = 0; i < identityCount; i++) {
        const identityItem = parseInt(readLine().trim(), 10);
        identity.push(identityItem);
    }

    const result = photoAlbum(index, identity);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
