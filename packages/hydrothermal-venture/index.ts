type Solver = (data: string) => number;

const solve1: Solver = (data) => {
  const pairs = data.trim().split('\n')
    .map(row => row.split(' -> '))
    .map(pair => pair.map(coords => coords.split(',').map(Number)));



  return pairs;
};

const solve2: Solver = (data) => {
  return 0;
};

export { solve1, solve2 };
