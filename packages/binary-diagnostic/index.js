import fs from 'fs';
import _ from 'lodash';

const readInput = async () => await fs.promises.readFile('./input.txt');

const binaryToNumber = n => parseInt(n.join(''), 2);

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

  const gammaRate = binaryToNumber(maxByDigits);
  const epsilonRate = binaryToNumber(minByDigits);
  const result = gammaRate * epsilonRate;

  return result;
};

const solve2 = (string) => {
  const numbers = string.trim().split('\n');

  const filterRecursiveBy = (comparator) => (numbers) => {
    let i = 0;
    let result = [...numbers];

    while(result.length > 1) {
      const maxDigit = findDigits(result, comparator)[i];
      result = result.filter(digits => digits[i] === maxDigit);
      i++;
    }

    return result;
  }

  const generatorComp = c => c['1'] >= c['0'] ? '1' : '0';
  const generatorRate = _(numbers)
    .thru(filterRecursiveBy(generatorComp))
    .thru(binaryToNumber);

  const scrubberComp = c => c['0'] <= c['1'] ? '0' : '1';
  const scrubberRate = _(numbers)
    .thru(filterRecursiveBy(scrubberComp))
    .thru(binaryToNumber);

  const result = generatorRate * scrubberRate;

  return result;
};

export { solve1, solve2, readInput };
