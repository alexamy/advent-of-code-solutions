import fs from 'fs';

const SIZE = 5;

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

const readInput = async () => await fs.promises.readFile('./input.txt');

// board helpers
const markNumber = (board, number) => {
  const index = board.findIndex(({ n }) => n === number);
  if(index > -1) board[index].mark = true;
};

const isWinBoard = (board) => {
  return ROW_INDEXES.some(idxs => {
    return idxs.every(idx => board[idx].mark);
  });
}

const solve1 = (data) => {
  // split data
  const lines = data.trim().split('\n');

  const drawn = lines[0].split(',').map(Number);
  let merged = lines.slice(2);

  const boardsRaw = [];
  while(merged.length) {
    boardsRaw.push(merged.splice(0, SIZE));
    merged.splice(0, 1);
  }

  // make boards
  const boards = boardsRaw.map(board => {
    return board.flatMap(row => row
      .trim()
      .replace(/\s+/g, ' ')
      .split(' ')
      .map(n => ({ mark: false, n: Number(n) }))
    );
  });

  // find winner
  const numbers = [...drawn];
  let drawnNumber;
  let winIdx = -1;
  while(winIdx === -1 && numbers.length > 0) {
    [drawnNumber] = numbers.splice(0, 1);
    boards.forEach(board => markNumber(board, drawnNumber));

    winIdx = boards.findIndex(isWinBoard);
  }

  // calculate sum
  const winBoard = boards[winIdx];
  const winSum = winBoard
    .filter(field => !field.mark)
    .map(field => field.n)
    .reduce((a, b) => a + b);

  const result = winSum * drawnNumber;

  return result;
};

const solve2 = (data) => {
  // split data
  const lines = data.trim().split('\n');

  const drawn = lines[0].split(',').map(Number);
  let merged = lines.slice(2);

  const boardsRaw = [];
  while(merged.length) {
    boardsRaw.push(merged.splice(0, SIZE));
    merged.splice(0, 1);
  }

  // make boards
  const boards = boardsRaw.map(board => {
    return board.flatMap(row => row
      .trim()
      .replace(/\s+/g, ' ')
      .split(' ')
      .map(n => ({ mark: false, n: Number(n) }))
    );
  });

  // find winner
  const boardsArr = boards.map(board => ({ isWin: false, board }));
  const numbers = [...drawn];
  const winIdxs = [];
  let drawnNumber;

  while(boardsArr.some(s => !s.isWin) && numbers.length > 0) {
    [drawnNumber] = numbers.splice(0, 1);
    boardsArr.forEach(({ board }) => markNumber(board, drawnNumber));

    const winIdx = boardsArr.findIndex(({ isWin, board }) => !isWin && isWinBoard(board));
    if(winIdx > -1) {
      winIdxs.push(winIdx);
      boardsArr[winIdx].isWin = true;
    }
  }

  // calculate sum
  const [lastWinIdx] = winIdxs.slice(-1);
  const winBoard = boards[lastWinIdx];
  const winSum = winBoard
    .filter(field => !field.mark)
    .map(field => field.n)
    .reduce((a, b) => a + b);

  const result = winSum * drawnNumber;

  return result;
};

export { solve1, solve2, readInput };
