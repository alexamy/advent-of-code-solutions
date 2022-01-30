const simpleNavigator = (acc, [dir, n]) => {
  if(dir === 'forward') acc.h += n;
  if(dir === 'down') acc.d += n;
  if(dir === 'up') acc.d -= n;
  return acc;
}

const complexNavigator = (acc, [dir, n]) => {
  if(dir === 'forward') { acc.h += n; acc.d += n * acc.a; }
  if(dir === 'down') acc.a += n;
  if(dir === 'up') acc.a -= n;
  return acc;
}

const solver = (startPosition, navigator) => (paths) => {
  const instructions = paths
    .trim()
    .split('\n')
    .map(line => {
      const [dir, n] = line.split(' ');
      return [dir, Number(n)];
    });

  const coordinates = instructions.reduce(navigator, startPosition);
  const result = coordinates.h * coordinates.d;

  return result;
};

const solve1 = solver({ h: 0, d: 0 }, simpleNavigator);
const solve2 = solver({ h: 0, d: 0, a: 0 }, complexNavigator);

export { solve1, solve2 };
