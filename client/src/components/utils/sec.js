const timeStr = sec => {
  const min = Math.floor(sec / 60);

  const hours = Math.floor(min / 60);
  const remainMin = min - hours * 60;

  return hours > 0 ? `${hours} hr ${remainMin} min` : `${remainMin} min`;
};

export default timeStr;
