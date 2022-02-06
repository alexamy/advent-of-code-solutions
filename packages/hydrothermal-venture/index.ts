import fs from 'fs';
import _ from 'lodash';

type Solver = (data: string) => number;

type Point = number[];

type PathMaker = ([start, end]: Point[]) => Point[];

const makeHorizontalPath: PathMaker = ([start, end]) => {
  const [x1, y1] = start;
  const [x2, _y2] = end;

  const xmin = Math.min(x1, x2);
  const xmax = Math.max(x1, x2);

  return _.range(xmin, xmax + 1).map(x => [x,y1]);
}

const makeVerticalPath: PathMaker = ([start, end]) => {
  const [x1, y1] = start;
  const [_x2, y2] = end;

  const ymin = Math.min(y1, y2);
  const ymax = Math.max(y1, y2);

  return _.range(ymin, ymax + 1).map(y => [x1,y]);
}

export const readInput = async () => (await fs.promises.readFile('./input.txt')).toString();

export const solve1: Solver = (data) => {
  const isVertical = ([start, end]: Point[]) => start[0] === end[0];
  const isHorizontal = ([start, end]: Point[]) => start[1] === end[1];

  const pairs = data
    .trim()
    .split('\n')
    .map(row => row.split(' -> '))
    .map(pair => pair.map(coords => coords.split(',').map(Number)));

  const horizontalPathData = pairs
    .filter(isHorizontal)
    .flatMap(makeHorizontalPath);

  const verticalPathData = pairs
    .filter(isVertical)
    .flatMap(makeVerticalPath);

  const pathData = horizontalPathData.concat(verticalPathData).flat(0);

  const count = _(pathData)
    .countBy()
    .values()
    .filter(count => count > 1)
    .value()
    .length;

  return count;
};

export const solve2: Solver = (data) => {
  return 0;
};
