const solve = (paths) => {
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

export default solve;
