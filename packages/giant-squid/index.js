import fs from 'fs';

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
  const lines = data.trim().split('\n');

  const numbers = lines[0].split(',').map(Number);

  const boards = [];
  let boardsRaw = lines.slice(2);
  while(boardsRaw.length) {
    boards.push(boardsRaw.splice(0, size));
    boardsRaw.splice(0, 1);
  }

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
    boards.forEach(({ board }) => markNumber(board, drawnNumber));

    const winIdx = boards.findIndex(({ isWin, board }) => !isWin && isWinBoard(board));
    if(winIdx > -1) {
      boards[winIdx].isWin = true;
      winIdxs.push(winIdx);
    }
  }

  const [lastWinIdx] = winIdxs.slice(-1);
  const winSum = getScore(boards[lastWinIdx].board);
  const result = winSum * drawnNumber;

  return result;
};

export { solve1, solve2, readInput };
