import fs from 'fs';
import _ from 'lodash';

const INC = 'inc';
const DEC = 'dec';

// read file
const measurementsBuffer = await fs.promises.readFile('input.txt');
const measurements = measurementsBuffer.toString().split('\n').map(Number);

const solvePart1 = () => {
  const fromFirst = _.dropRight(measurements, 1);
  const fromSecond = _.drop(measurements, 1);

  const result = _
   .zip(fromFirst, fromSecond)
   .map(([current, next]) => next > current ? INC : DEC)
   .filter(direction => direction === INC)
   .length;

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

export { solvePart1, solvePart2 };
