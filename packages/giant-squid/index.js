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

const solve1 = (data) => {
  // split data
  const lines = data.trim().split('\n');

  const drawn = lines[0];
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

  return boards;
};

const solve2 = () => {};

export { solve1, solve2 };
