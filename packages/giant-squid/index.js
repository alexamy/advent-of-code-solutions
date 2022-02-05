import fs from 'fs';
import _ from 'lodash';

// constants
const ROW_INDEXES = [
  // horizontal
  [ 0, 1, 2, 3, 4],
  [ 5, 6, 7, 8, 9],
  [10,11,12,13,14],
  [15,16,17,18,19],
  [20,21,22,23,24],
  // vertical
  [ 0, 5,10,15,20],
  [ 1, 6,11,16,21],
  [ 2, 7,12,17,22],
  [ 3, 8,13,18,23],
  [ 4, 9,14,19,24],
];

// read data helpers
const readInput = async () => await fs.promises.readFile('./input.txt');

const parseInputData = (data, size = 5) => {
  const [numSeq, _delim, ...boardsRaw] = data.trim().split('\n');
  const numbers = numSeq.split(',').map(Number);

  const boardCount = boardsRaw.length / (size + 1);
  const boards = _.range(boardCount).map(i => {
    const startIdx = i * (size + 1);
    return boardsRaw.slice(startIdx, startIdx + size);
  });

  return { numbers, boards };
}

// board helpers
const makeMarkedBoard = (board) => {
  return board.flatMap(row => row
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map(n => ({ mark: false, n: Number(n) })));
}

const markNumber = (board, number) => {
  const index = board.findIndex(({ n }) => n === number);
  if(index > -1) board[index].mark = true;
};

const isWinBoard = (board) => {
  return ROW_INDEXES.some(idxs => {
    return idxs.every(idx => board[idx].mark);
  });
}

const getScore = (board) => {
  return board
    .filter(field => !field.mark)
    .map(field => field.n)
    .reduce((a, b) => a + b, 0);
}

// solvers
const solve1 = (data) => {
  const { numbers: drawn, boards: boardsRaw } = parseInputData(data);
  const boards = boardsRaw.map(makeMarkedBoard);

  const numbers = [...drawn];
  let drawnNumber;
  let winIdx = -1;
  while(winIdx === -1 && numbers.length > 0) {
    [drawnNumber] = numbers.splice(0, 1);
    boards.forEach(board => markNumber(board, drawnNumber));

    winIdx = boards.findIndex(isWinBoard);
  }

  const winSum = getScore(boards[winIdx]);
  const result = winSum * drawnNumber;

  return result;
};

const solve2 = (data) => {
  const { numbers: drawn, boards: boardsRaw } = parseInputData(data);
  const boardsMarked = boardsRaw.map(makeMarkedBoard);

  const boards = boardsMarked.map(board => ({ isWin: false, board }));
  const numbers = [...drawn];
  const winIdxs = [];
  let drawnNumber;

  while(!boards.every(s => s.isWin) && numbers.length > 0) {
    [drawnNumber] = numbers.splice(0, 1);

    boards.forEach(({ isWin, board }, idx) => {
      if(isWin) return;

      markNumber(board, drawnNumber);
      const isWinAfterMark = isWinBoard(board);

      if(isWinAfterMark) {
        boards[idx].isWin = true;
        winIdxs.push(idx);
      }
    });
  }

  const [lastWinIdx] = winIdxs.slice(-1);
  const winBoard = boards[lastWinIdx].board;

  const winSum = getScore(winBoard);
  const result = winSum * drawnNumber;

  return result;
};

export { solve1, solve2, readInput };
