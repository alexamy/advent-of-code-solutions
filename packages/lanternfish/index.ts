import fs from 'fs';
import _ from 'lodash';

export const readInput = async () => (await fs.promises.readFile('./input.txt')).toString();

export const solve1 = (data: string, day: number) => {
  const daysInitial = data.trim().split(',').map(Number);

  const { days } = _.transform(_.range(day), (acc) => {
    acc.day += 1;
    acc.days = acc.days.flatMap(n => n === 0 ? [6,8] : [n - 1]);
  }, { day: 0, days: daysInitial });

  return days.length;
};

export const solve2 = (data: string, day: number) => {};
