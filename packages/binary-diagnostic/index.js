import fs from 'fs';
import _ from 'lodash';

const readInput = async () => {
  const input = await fs.promises.readFile('./input.txt');

  return input;
};

const findMostCommonDigits = (numbers, comparator) => {
  const groups = numbers.reduce((groups, number) => {
    number.split('').forEach((digit, i) => {
      if(!groups[i]) groups[i] = [];

      groups[i].push(digit);
    });

    return groups;
  }, []);

  const maxByDigits = groups
    .map(group => _.countBy(group, _.identity))
    .map(comparator);

  return maxByDigits;
};

const inverseBit = c => c === '0' ? '1' : '0';

const solve1 = (string) => {
  const numbers = string.trim().split('\n');

  const comparator = c => c['1'] >= c['0'] ? '1' : '0';
  const maxByDigits = findMostCommonDigits(numbers, comparator);
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
    const maxDigit = findMostCommonDigits(generator, comparator)[i];
    generator = generator.filter(digits => digits[i] === maxDigit);
    i++;
  }

  i = 0;
  let scrubber = [...numbers];
  while(scrubber.length > 1) {
    const comparator = c => c['0'] <= c['1'] ? '0' : '1';
    const minDigit = findMostCommonDigits(scrubber, comparator)[i];
    scrubber = scrubber.filter(digits => digits[i] === minDigit);
    i++;
  }

  generator = parseInt(generator.join(''), 2);
  scrubber = parseInt(scrubber.join(''), 2);
  console.log(generator, scrubber);

  const result = generator * scrubber;

  return result;
};

export { solve1, solve2, readInput };
