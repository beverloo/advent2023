import fs from 'fs/promises';

const lines = await fs.readFile('cubes.txt', { encoding: 'utf8' });
const games = lines.split('\r\n');

const kBagContents = {
    red: 12,
    green: 13,
    blue: 14
};

let sumOfValidGameNumbers = 0;
let sumOfMinimumCubePowers = 0;

for (const game of games) {
    const [ _, gameNumberText, gameSubsetsText ] = game.match(/^Game (\d+):\s*(.+?)\s*$/);

    const gameNumber = parseInt(gameNumberText);
    const gameSubsets = gameSubsetsText.split(';').map(subset =>
        Object.fromEntries([ ...subset.matchAll(/\s*(\d+)\s*(\w+)/g) ].map(v => [ v[2], parseInt(v[1]) ])));

    // Part 1:
    {
        let possible = true;
        for (const subset of gameSubsets) {
            for (const [ colour, cubes ] of Object.entries(subset)) {
                if (!kBagContents.hasOwnProperty(colour))
                    possible = false;
                else if (kBagContents[colour] < cubes)
                    possible = false;
            }
        }

        if (possible)
            sumOfValidGameNumbers += gameNumber;
    }

    // Part 2:
    {
        const minimumPerColour = Object.fromEntries(Object.keys(kBagContents).map(k => [ k, 0 ]));
        for (const subset of gameSubsets) {
            for (const [ colour, cubes ] of Object.entries(subset))
                minimumPerColour[colour] = Math.max(minimumPerColour[colour], cubes);
        }

        sumOfMinimumCubePowers += Object.values(minimumPerColour).reduce((acc, v) => acc * v, 1);
    }
}

console.log('Part 1:', sumOfValidGameNumbers);
console.log('Part 2:', sumOfMinimumCubePowers);
