import fs from 'fs';

const INC = 'inc';
const DEC = 'dec';

// read file
const measurementsBuffer = await fs.promises.readFile('input.txt');
const measurements = measurementsBuffer.toString().split('\n').map(Number);

const solvePart1 = () => {
  // count directions
  const trends = [];
  for(let i = 0; i < measurements.length - 1; i++) {
    const current = measurements[i];
    const next = measurements[i+1];

    trends.push(next > current ? INC : DEC);
  }

  // find result count
  const result = trends.filter(direction => direction === INC).length;

  return result;
}

const solvePart2 = () => {
  // count directions
  const sums = [];
  for(let i = 0; i < measurements.length - 3; i++) {
    const [w1, w2, w3] = measurements.slice(i, i + 3);
    sums.push(w1 + w2 + w3);
  }

  const trends = [];
  for(let i = 0; i < sums.length - 1; i++) {
    const current = sums[i];
    const next = sums[i+1];

    trends.push(next > current ? INC : DEC);
  }

  // find result count
  const result = trends.filter(direction => direction === INC).length;

  return result;
}

console.log(`Part 1: ${solvePart1()}`);
console.log(`Part 2: ${solvePart2()}`);
