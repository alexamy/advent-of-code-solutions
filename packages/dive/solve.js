const solve1 = (paths) => {
  const lines = paths.trim().split('\n');
  const instructions = lines
    .map(line => line.split(' '))
    .map(([dir, n]) => ([dir, Number(n)]));

  const coordinates = instructions.reduce((acc, [dir, n]) => {
    if(dir === 'forward') acc.h += n;
    if(dir === 'down') acc.v += n;
    if(dir === 'up') acc.v -= n;
    return acc;
  }, { h: 0, v: 0 });

  const result = coordinates.h * coordinates.v;

  return result;
};

const solve2 = (paths) => {
  const lines = paths.trim().split('\n');
  const instructions = lines
    .map(line => line.split(' '))
    .map(([dir, n]) => ([dir, Number(n)]));

  const coordinates = instructions.reduce((acc, [dir, n]) => {
    if(dir === 'forward') { acc.h += n; acc.d += n * acc.a; }
    if(dir === 'down') acc.a += n;
    if(dir === 'up') acc.a -= n;
    return acc;
  }, { h: 0, a: 0, d: 0 });

  const result = coordinates.h * coordinates.d;

  return result;
};

export { solve1, solve2 };
