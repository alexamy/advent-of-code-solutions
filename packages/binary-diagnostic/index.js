import fs from 'fs';
import _ from 'lodash';

const readInput = async () => await fs.promises.readFile('./input.txt');

const findDigits = (numbers, comparator) => {
  const getAllAtIndex = i => numbers.map(n => n[i]);

  const count = numbers[0].length;
  const groups = _.range(count).map(getAllAtIndex);

  const digitCounter = group => _(group)
    .countBy()
    .defaults({ '0': 0, '1': 0 })
    .thru(comparator)
    .value();

  return groups.map(digitCounter);
};

const solve1 = (string) => {
  const numbers = string.trim().split('\n');

  const comparator = c => c['1'] >= c['0'] ? '1' : '0';
  const maxByDigits = findDigits(numbers, comparator);

  const inverseBit = c => c === '0' ? '1' : '0';
  const minByDigits = maxByDigits.map(inverseBit);

  const gammaRate = parseInt(maxByDigits.join(''), 2);
  const epsilonRate = parseInt(minByDigits.join(''), 2);
  const result = gammaRate * epsilonRate;

  return result;
};

const solve2 = (string) => {
  const numbers = string.trim().split('\n');

  let i = 0;
  let generator = [...numbers];
  while(generator.length > 1) {
    const comparator = c => c['1'] >= c['0'] ? '1' : '0';
    const maxDigit = findDigits(generator, comparator)[i];

    generator = generator.filter(digits => digits[i] === maxDigit);
    i++;
  }

  let j = 0;
  let scrubber = [...numbers];
  while(scrubber.length > 1) {
    const comparator = c => c['0'] <= c['1'] ? '0' : '1';
    const minDigit = findDigits(scrubber, comparator)[j];

    scrubber = scrubber.filter(digits => digits[j] === minDigit);
    j++;
  }

  const generatorRate = parseInt(generator.join(''), 2);
  const scrubberRate = parseInt(scrubber.join(''), 2);
  const result = generatorRate * scrubberRate;

  return result;
};

export { solve1, solve2, readInput };
