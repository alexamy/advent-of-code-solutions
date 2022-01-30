import fs from 'fs';
import _ from 'lodash';

const INC = 'inc';
const DEC = 'dec';

// read file
const measurementsBuffer = await fs.promises.readFile('input.txt');
const measurements = measurementsBuffer.toString().split('\n').map(Number);

const comparator = ([current, next]) => next > current ? INC : DEC;
const isInc = dir => dir === INC;

const solvePart1 = () => _(measurements)
  .thru(ms => _.zip(ms, _.drop(ms, 1)))
  .filter(_.every)
  .map(comparator)
  .filter(isInc)
  .value()
  .length;

const solvePart2 = () => _(measurements)
  .thru(ms => _.zip(ms, _.drop(ms, 1), _.drop(ms, 2)))
  .filter(_.every)
  .map(_.sum)
  .thru(ms => _.zip(ms, _.drop(ms, 1)))
  .filter(_.every)
  .map(comparator)
  .filter(isInc)
  .value()
  .length;

export { solvePart1, solvePart2 };
