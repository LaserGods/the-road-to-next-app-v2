export const sizeInMb = (sizeInBytes: number, decimalsNum = 2) => {
  const mb = sizeInBytes / (1024 * 1024);
  return +mb.toFixed(decimalsNum);
};
