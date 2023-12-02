import fs from 'fs/promises';

const lines = await fs.readFile('calibration.txt', { encoding: 'utf8' });
const values = lines.split('\r\n');

const kNumbers = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};

function maybeTranspose(input, acceptText) {
    if (acceptText && kNumbers.hasOwnProperty(input))
        return kNumbers[input];

    return input;
}

function runPuzzle(part, acceptText) {
    let sum = 0;
    for (let value of values) {
        const matches =
            acceptText ? [ ...value.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g) ].map(v => v[1])
                       : value.match(/\d/g);

        if (!matches || !matches.length) {
            console.log(`Part ${part}: Invalid input ("${value}")`);
            return;
        }

        let firstMatch = maybeTranspose(matches[0], acceptText);
        let lastMatch = maybeTranspose(matches[matches.length - 1], acceptText);

        sum += parseInt(`${firstMatch}${lastMatch}`, 10);
    }

    console.log(`Part ${part}:`, sum);
}

runPuzzle(/* part= */ 1, /* acceptText= */ false);
runPuzzle(/* part= */ 2, /* acceptText= */ true);
