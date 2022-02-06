import fs from 'fs';
import _ from 'lodash';

// constants
const getWinRows = _.memoize(size => {
  const getRow = i => _.range(i * size, i * size + size);
  const getColumn = i => _.range(i, i + size * size, size);

  const horizontal = _.range(size).map(getRow);
  const vertical = _.range(size).map(getColumn);

  return horizontal.concat(vertical);
});

// board helpers
const parseBoard = board => board.flatMap(row => row.trim().replace(/\s+/g, ' ').split(' '));

const makeMarkedBoard = board => board.map(n => ({ mark: false, n: Number(n) }));

const parseInputData = size => data => {
  const [numSeq, _delim, ...boardsRaw] = data.trim().split('\n');
  const numbers = numSeq.split(',').map(Number);

  const boardCount = boardsRaw.length / (size + 1);
  const boards = _.range(boardCount).map(i => {
    const startIdx = i * (size + 1);
    const rows = boardsRaw.slice(startIdx, startIdx + size);
    return parseBoard(rows);
  });

  return { numbers, boards };
}

const markNumber = number => board => board.map(cell =>
  cell.n === number ? ({ ...cell, mark: true }) : cell);

const isWinBoard = size => board => getWinRows(size)
  .some(idxs => idxs.every(idx => board[idx].mark));

const getScore = board => board
  .filter(field => !field.mark)
  .map(field => field.n)
  .reduce((a, b) => a + b, 0);

// solvers
const readInput = async () => await fs.promises.readFile('./input.txt');

const solver1 = size => (acc, number) => {
  acc.number = number;
  acc.boards = acc.boards.map(markNumber(number));
  acc.board = acc.boards.find(isWinBoard(size));

  return !acc.board;
}

const solver2 = size => (acc, number) => {
  acc.number = number;
  acc.boards = acc.boards.map(markNumber(number));
  [[acc.board], acc.boards] = _.partition(acc.boards, isWinBoard(size));

  return acc.boards.length > 0;
}

const solve = solver => data => {
  const size = 5;
  const { numbers, boards: boardsRaw } = parseInputData(size)(data);
  const boards = boardsRaw.map(makeMarkedBoard);

  return _(numbers)
    .transform(solver(size), { boards })
    .thru(({ number, board }) => number * getScore(board))
    .value();
};

const solve1 = solve(solver1);
const solve2 = solve(solver2);


export { solve1, solve2, readInput };
