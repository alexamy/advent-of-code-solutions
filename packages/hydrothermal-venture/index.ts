import fs from 'fs';
import _ from 'lodash';

type SolverGeneric = (data: string, filterF: (p: Point[]) => boolean) => number;
type Solver = (data: string) => number;

interface Point {
  x: number;
  y: number;
}

const makePoint = ([x,y]: number[]) => ({ x, y });

const makePath = ([start, end]: Point[]): Point[] => {
  const { x: x1, y: y1 } = start;
  const { x: x2, y: y2 } = end;

  const sx = Math.sign(x2 - x1);
  const sy = Math.sign(y2 - y1);

  const horRange = _.range(x1, x2 + sx, sx);
  const vertRange = _.range(y1, y2 + sy, sy);

  const horizontal = horRange.length > 0
    ? horRange
    : _.times(vertRange.length, _.constant(x1));

  const vertical = vertRange.length > 0
    ? vertRange
    : _.times(horRange.length, _.constant(y1));

  const points = _
    .zip(horizontal, vertical)
    // @ts-ignore
    .map(makePoint)

  return points as Point[];
}

export const readInput = async () => (await fs.promises.readFile('./input.txt')).toString();

const isHorizontal = ([start, end]: Point[]) =>
  start.x === end.x;

const isVertical = ([start, end]: Point[]) =>
  start.y === end.y;

const isDiagonal = ([start, end]: Point[]) =>
  Math.abs(start.x - end.x) === Math.abs(start.y - end.y);

export const solve: SolverGeneric = (data, filterF) =>
  _(data)
  .thru(s => s.trim().split('\n'))
  .map(row => row.split(' -> ').map(coords => coords.split(',').map(Number)))
  .map(([start, end]) => [makePoint(start), makePoint(end)])
  .filter(filterF)
  .flatMap(makePath)
  .countBy(_.toPairs)
  .values()
  .filter(count => count > 1)
  .value()
  .length;

export const solve1: Solver = (data) =>
  solve(data, _.overSome(isHorizontal, isVertical));

export const solve2: Solver = (data) =>
  solve(data, _.overSome(isHorizontal, isVertical, isDiagonal));
