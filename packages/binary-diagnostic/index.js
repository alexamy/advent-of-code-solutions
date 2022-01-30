import _ from "lodash";

const solve1 = (string) => {
  const numbers = string.trim().split('\n');

  const groups = [[], [], [], [], []];
  numbers.forEach(number => {
    const digits = number.split('');
    digits.forEach((d, i) => groups[i].push(d));
  });

  const maxByDigits = groups
    .map(group => _.countBy(group))
    .map(c => c['0'] > c['1'] ? '0' : '1');

  const minByDigits = maxByDigits
    .map(c => c === '0' ? '1' : '0');

  const gammaRate = parseInt(maxByDigits.join(''), 2);
  const epsilonRate = parseInt(minByDigits.join(''), 2);

  const result = gammaRate * epsilonRate;

  return result;
};

const solve2 = () => {};

export { solve1, solve2 };
