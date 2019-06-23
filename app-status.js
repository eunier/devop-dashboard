const generateAppStatusData = () => {
  const maxApps = 12;
  const status = {
    1: {
      str: 'Critical',
      minPer: 71,
      maxPer: 100
    },
    2: {
      str: 'Major',
      minPer: 51,
      maxPer: 70
    },
    3: {
      str: 'Ok',
      minPer: 0,
      maxPer: 50
    }
  };

  const randomStatusNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  let appsStatusOverall = [];
  let appsStatusDetail = [];

  for (let i = 0; i < maxApps; i++) {
    const statusNum = randomStatusNum(1, 3);
    const statusPer = randomStatusNum(
      status[statusNum].minPer,
      status[statusNum].maxPer
    );
    const name = `App${i + 1}`;

    appsStatusOverall.push({ name: name, status: status[statusNum].str });
    appsStatusDetail.push({ percentage: statusPer, date: new Date() });
  }

  return { overall: appsStatusOverall, detail: appsStatusDetail };
};

generateAppStatusData();

module.exports = {
  generateAppStatusData: generateAppStatusData
};