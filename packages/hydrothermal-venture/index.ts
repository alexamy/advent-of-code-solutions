import fs from 'fs';
import _ from 'lodash';

type SolverGeneric = (data: string, filter: (p: Point[]) => boolean) => number;
type Solver = (data: string) => number;

type Point = number[];

const makePath = ([start, end]: Point[]): Point[] => {
  const [x1, y1] = start;
  const [x2, y2] = end;

  const dx = Math.sign(x2 - x1);
  const dy = Math.sign(y2 - y1);

  const horizontalRange = _.range(x1, x2 + dx, dx);
  const verticalRange = _.range(y1, y2 + dy, dy);

  const horizontal = horizontalRange.length > 0
    ? horizontalRange
    : _.times(verticalRange.length, _.constant(x1));

  const vertical = verticalRange.length > 0
    ? verticalRange
    : _.times(horizontalRange.length, _.constant(y1));

  return _.zip(horizontal, vertical) as Point[];
}

export const readInput = async () => (await fs.promises.readFile('./input.txt')).toString();

const isHorizontal = ([start, end]: Point[]) =>
  start[0] === end[0];

const isVertical = ([start, end]: Point[]) =>
  start[1] === end[1];

const isDiagonal = ([start, end]: Point[]) =>
  Math.abs(start[0] - end[0]) === Math.abs(start[1] - end[1]);

export const solve: SolverGeneric = (data, filter) => {
  const pairs: Point[][] = data
    .trim()
    .split('\n')
    .map(row => row.split(' -> '))
    .map(pair => pair.map(coords => coords.split(',').map(Number)));

  const pathData = pairs
    .filter(filter)
    .flatMap(makePath);

  const count = _(pathData)
    .countBy()
    .values()
    .filter(count => count > 1)
    .value()
    .length;

  return count;
};

export const solve1: Solver = (data) =>
  solve(data, _.overSome(isHorizontal, isVertical));

export const solve2: Solver = (data) =>
  solve(data, _.overSome(isHorizontal, isVertical, isDiagonal));
