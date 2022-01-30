import fs from 'fs';
import _ from 'lodash';

const readInput = async () => {
  const input = await fs.promises.readFile('./input.txt');

  return input;
};

const findMostCommonDigits = (numbers) => {
  const groups = numbers.reduce((groups, number) => {
    number.split('').forEach((digit, i) => {
      if(!groups[i]) groups[i] = [];

      groups[i].push(digit);
    });

    return groups;
  }, []);

  const maxByDigits = groups
    .map(group => _.countBy(group, _.identity))
    .map(c => c['0'] > c['1'] ? '0' : '1');

  return maxByDigits;
};

const inverseBit = c => c === '0' ? '1' : '0';

const solve1 = (string) => {
  const numbers = string.trim().split('\n');

  const maxByDigits = findMostCommonDigits(numbers);
  const minByDigits = maxByDigits.map(inverseBit);

  const gammaRate = parseInt(maxByDigits.join(''), 2);
  const epsilonRate = parseInt(minByDigits.join(''), 2);
  const result = gammaRate * epsilonRate;

  return result;
};

const solve2 = (string) => {
  const numbers = string.trim().split('\n');

  const groups = numbers.reduce((groups, number) => {
    number.split('').forEach((digit, i) => {
      if(!groups[i]) groups[i] = [];

      groups[i].push(digit);
    });

    return groups;
  }, []);
};

export { solve1, solve2, readInput };
