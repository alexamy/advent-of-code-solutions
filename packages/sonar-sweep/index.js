import fs from 'fs';

const INC = 'inc';
const DEC = 'dec';

// read file
const measurementsBuffer = await fs.promises.readFile('input.txt');
const measurements = measurementsBuffer.toString().split('\n').map(Number);

// count directions (part 1)
const trendsByOne = [];
for(let i = 0; i < measurements.length - 1; i++) {
  const current = measurements[i];
  const next = measurements[i+1];

  trendsByOne.push(next > current ? INC : DEC);
}

// find result count
const resultPart1 = trendsByOne.filter(direction => direction === INC).length;
console.log(`Part 1: ${resultPart1}`);
