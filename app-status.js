const generateAppStatusData = (maxHistorySeconds, index) => {
  let date = new Date();

  if (
    typeof maxHistorySeconds !== 'undefined' &&
    typeof index !== 'undefined'
  ) {
    const MS_PER_SECOND = 1000;
    const durationInSecond = maxHistorySeconds - index;
    date = new Date(date - durationInSecond * MS_PER_SECOND);
  }

  const appCnt = 2;
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

  for (let i = 0; i < appCnt; i++) {
    const statusNum = randomStatusNum(1, 3);
    const statusPer = randomStatusNum(
      status[statusNum].minPer,
      status[statusNum].maxPer
    );
    const name = `App${i + 1}`;

    appsStatusOverall.push({ name: name, status: status[statusNum].str });
    appsStatusDetail.push({ name: name, percentage: statusPer, date: date });
  }

  return { overall: appsStatusOverall, detail: appsStatusDetail };
};

generateAppStatusData();

module.exports = {
  generateAppStatusData: generateAppStatusData
};
