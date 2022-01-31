const SIZE = 5;

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

  return boards;
};

const solve2 = () => {};

export { solve1, solve2 };
