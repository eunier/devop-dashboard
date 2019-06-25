const generateAppStatusData = (history, maxHistorySeconds, index) => {
  const appCnt = 2;
  const changeAmount = 1;
  let date = new Date();

  if (
    typeof maxHistorySeconds !== 'undefined' &&
    typeof index !== 'undefined'
  ) {
    const MS_PER_SECOND = 1000;
    const durationInSecond = maxHistorySeconds - index;
    date = new Date(date - durationInSecond * MS_PER_SECOND);
  }

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

  const getStatusStr = num => {
    switch (true) {
      case status[1].minPer <= num && num <= status[1].maxPer:
        return status[1].str;
      case status[2].minPer <= num && num <= status[2].maxPer:
        return status[2].str;
      case status[3].minPer <= num && num <= status[3].maxPer:
        return status[3].str;
      default:
        return Error('Wrong num');
    }
  };

  let appsStatusOverall = [];
  let appsStatusDetail = [];

  for (let i = 0; i < appCnt; i++) {
    let statusPer = undefined;

    if (history.length === 0) {
      console.log(history);
      statusPer = randomStatusNum(0, 100);
    } else {
      const directionChange = randomStatusNum(0, 1) === 1 ? 'up' : 'down';
      const lastHistPer = history[history.length - 1][i].percentage;
      if (directionChange === 'up') {
        console.log(history);
        statusPer = lastHistPer + changeAmount ;
        statusPer > 100 ? statusPer = 60 : null
      } else {
        console.log(history);
        statusPer = lastHistPer + changeAmount;
        statusPer < 0 ? statusPer = 40 : null
      }
    }

    const statusStr = getStatusStr(statusPer);
    // console.log(history);
    // const statusNum = randomStatusNum(1, 3);
    // const statusPer = randomStatusNum(
    //   status[statusNum].minPer,
    //   status[statusNum].maxPer
    // );
    const name = `App${i + 1}`;

    appsStatusOverall.push({ name: name, status: statusStr });
    appsStatusDetail.push({ name: name, percentage: statusPer, date: date });
  }

  return { overall: appsStatusOverall, detail: appsStatusDetail };
};

module.exports = {
  generateAppStatusData: generateAppStatusData
};
