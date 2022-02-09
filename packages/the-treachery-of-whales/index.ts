export const solve1 = (data: string) => {
  const positions = data.trim().split(',').map(Number);
  positions.sort((a, b) => a - b);

  const median = positions[positions.length/2];

  const fuel = positions
    .map(pos => Math.abs(pos - median))
    .reduce((a, b) => a + b);

  return fuel;
};

export const solve2 = (data: string) => {
  const positions = data.trim().split(',').map(Number);

  return positions;
};
