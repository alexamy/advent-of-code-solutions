import fs from 'fs';
import _ from 'lodash';

// types
interface Cell {
  n: number;
  mark: boolean;
}

type Board = Cell[];

interface SolverContext {
  number: number;
  board: Board;
  boards: Board[];
}

type Solver = (size: number) => (acc: SolverContext, number: number) => boolean;

// constants
const getWinRows = _.memoize((size: number): number[][] => {
  const getRow = i => _.range(i * size, i * size + size);
  const getColumn = i => _.range(i, i + size * size, size);

  const horizontal = _.range(size).map(getRow);
  const vertical = _.range(size).map(getColumn);

  return horizontal.concat(vertical);
});

// board helpers
const parseBoard = (board: string[]): string[] =>
  board.flatMap(row => row.trim().replace(/\s+/g, ' ').split(' '));

const makeMarkedBoard = (board: string[]): Board =>
  board.map(n => ({ mark: false, n: Number(n) }));

const parseInputData = (size: number) => (data: string): { numbers: number[], boards: string[][] } => {
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

const markNumber = (number: number) => (board: Board) =>
  board.map(cell => cell.n === number ? ({ ...cell, mark: true }) : cell);

const isWinBoard = (size: number) => (board: Board): boolean =>
  getWinRows(size).some(idxs => idxs.every(idx => board[idx].mark));

const getScore = (board: Board) => board
  .filter(field => !field.mark)
  .map(field => field.n)
  .reduce((a, b) => a + b, 0);

// solvers
const readInput = async () => await fs.promises.readFile('./input.txt');

const solverFirst: Solver = (size) => (acc, number) => {
  acc.number = number;
  acc.boards = acc.boards.map(markNumber(number));
  acc.board = acc.boards.find(isWinBoard(size));

  return !acc.board;
}

const solverLast: Solver = (size) => (acc, number) => {
  acc.number = number;
  acc.boards = acc.boards.map(markNumber(number));
  [[acc.board], acc.boards] = _.partition(acc.boards, isWinBoard(size));

  return acc.boards.length > 0;
}

const solve = (solver: Solver) => (data: string) => {
  const size = 5;
  const { numbers, boards: boardsRaw } = parseInputData(size)(data);
  const boards = boardsRaw.map(makeMarkedBoard);

  return _(numbers)
    .transform(solver(size), { boards, board: [], number: -1 })
    .thru(({ number, board }) => number * getScore(board))
    .value();
};

const solve1 = solve(solverFirst);
const solve2 = solve(solverLast);

export { solve1, solve2, readInput };
