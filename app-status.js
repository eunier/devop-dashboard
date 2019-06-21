let testCnt = 0;

const generateAppStatusDataTest = () => {
  return testCnt++;
};

const generateAppStatusData = () => {
  const status = Math.floor(Math.random() * 3) + 1;
  return status;
};

module.exports = {
  generateAppStatusData: generateAppStatusData,
  generateAppStatusDataTest: generateAppStatusDataTest
};
