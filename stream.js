const child = require('child_process');
const fs = require('fs');

const myREPL = child.spawn('node');
const myFile = fs.createWriteStream('output.txt');

myREPL.stdout.pipe(process.stdout, { end: false });
myREPL.stdout.pipe(myFile);

process.stdin.resume();

process.stdin.pipe(myREPL.stdin, { end: false });
process.stdin.pipe(myFile);

myREPL.stdin.on('end', function () {
    process.stdout.write('REPL steam end');
});

myREPL.on('exit', function (code) {
    console.log(code)
    process.exit(code);
});