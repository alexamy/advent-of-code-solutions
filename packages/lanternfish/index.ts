import fs from 'fs';
import _ from 'lodash';

const producer = (n: number) => n === 0 ? [6,8] : [n-1];

export const readInput = async () => (await fs.promises.readFile('./input.txt')).toString();

export const solve1 = (initial: string, day: number) => _
  .range(day)
  .reduce((days) => days.flatMap(producer), initial.trim().split(',').map(Number))
  .length;

interface Cache { fish: number[]; count: number[] };

export const solve2 = (data: string, day: number) => {
  const initial = data.trim().split(',').map(Number);

  const fishes = [0];
  const cache: number[] = [];

  for(let i = 0; i < day; i++) {
    cache.push(fishes.length);

    let add = 0;
    for(let f = 0; f < fishes.length; f++) {
      if(fishes[f] === 0) {
        fishes[f] = 6;
        add += 1;
      }
      else {
        fishes[f] -= 1;
      }
    }
    [...Array(add)].forEach(() => fishes.push(8));
  }

  const count = initial
    .map(d => cache[day - d])
    .reduce((a, b) => a + b);

  return count;
};

export const solve = solve2;
