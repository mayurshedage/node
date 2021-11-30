const readline = require('readline');

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

interface.question(`Enter array size: `, size => {
    interface.question('Enter array elements: ', elements => {
        const unsortedArr = elements.split(' ');
        unsortedArr.sort((a, b) => a - b);

        console.log(unsortedArr);

        interface.close();
    });
});

// const num1 = () => {
//     return new Promise((resolve, reject) => {
//         interface.question(`Enter first number: `, num1 => {
//             console.log(num1)
//             resolve(num1);
//         });
//     });
// }
// const num2 = () => {
//     return new Promise((resolve, reject) => {
//         interface.question(`Enter second number: `, num2 => {
//             console.log(num2);
//             resolve(num2);
//         });
//     });
// }

// (async () => {
//     const n1 = await num1();
//     const n2 = await num2();

//     interface.close();
// })();