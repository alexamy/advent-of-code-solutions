import fs from 'fs';
import _ from 'lodash';

const getWinRows = _.memoize(size => {
  const horizontal = _.range(size).map(i => _.range(i * size, i * size + size));
  const vertical = _.range(size).map(i => _.range(i, i + size * size, size));

  return horizontal.concat(vertical);
});

const readInput = async () => await fs.promises.readFile('./input.txt');

// board helpers
const parseBoard = board => board.flatMap(row => row.trim().replace(/\s+/g, ' ').split(' '));

const makeMarkedBoard = board => board.map(n => ({ mark: false, n: Number(n) }));

const parseInputData = (data, size) => {
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
const solve1 = (data) => {
  const size = 5;
  const { numbers, boards: boardsRaw } = parseInputData(data, size);
  const boards = boardsRaw.map(makeMarkedBoard);

  const { number, board } = _.transform(numbers, (acc, number) => {
    acc.number = number;
    acc.boards = acc.boards.map(markNumber(number));
    acc.board = acc.boards.find(isWinBoard(size));

    return !acc.board;
  }, { boards });

  const result = getScore(board) * number;

  return result;
};

const solve2 = (data) => {
  const size = 5;
  const { numbers, boards: boardsRaw } = parseInputData(data, size);
  const boards = boardsRaw.map(makeMarkedBoard);

  const { number, board } = _.transform(numbers, (acc, number) => {
    acc.number = number;
    acc.boards = acc.boards.map(markNumber(number));
    [[acc.board], acc.boards] = _.partition(acc.boards, isWinBoard(size));

    return acc.boards.length > 0;
  }, { boards });

  const result = getScore(board) * number;

  return result;
};

export { solve1, solve2, readInput };
