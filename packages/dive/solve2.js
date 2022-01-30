const solve = (paths) => {
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

export default solve;
