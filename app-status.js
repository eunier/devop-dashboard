const generateAppStatusData = (history, maxHistorySeconds, index) => {
  const appCnt = 12;
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

  const randomNum = (min, max) => {
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
        return 'unknown';
    }
  };

  let appsStatusOverall = [];
  let appsStatusDetail = [];

  for (let i = 0; i < appCnt; i++) {
    let statusPer = undefined;
    let incidentsCnt = undefined;
    let impactedSec = undefined;
    let mttaCnt = undefined;
    let anomalistFeatures = undefined;

    if (history.length === 0) {
      statusPer = randomNum(0, 100);
      incidentsCnt = randomNum(0, 9) === 0 ? 1 : 0;
      impactedSec = randomNum(0, 9) === 0 ? 1 : 0;
      mttaCnt = randomNum(0, 9) === 0 ? 1 : 0;
      anomalistFeatures = randomNum(0, 9) === 0 ? 1 : 0;
    } else {
      const lastHistPer = history[history.length - 1][i].percentage;
      const lastIncidentsCnt = history[history.length - 1][i].incidents;
      const lastImpactedSec = history[history.length - 1][i].impactedSeconds;
      const lastMtta = history[history.length - 1][i].mttaCount;
      const lastAnomalistFeatures =
        history[history.length - 1][i].anomalistFeatures;

      const directionChange = randomNum(0, 1) === 1 ? 'up' : 'down';
      const changeAmount = randomNum(0, 5);

      // 5 % of new incident
      randomNum(0, 19) === 0
        ? (incidentsCnt = lastIncidentsCnt + 1)
        : (incidentsCnt = lastIncidentsCnt);

      // 60 % of impact second
      randomNum(0, 99) < 60
        ? (impactedSec = lastImpactedSec + 1)
        : (impactedSec = lastImpactedSec);

      // 20 % of mtta
      randomNum(0, 4) === 0 ? (mttaCnt = lastMtta + 1) : (mttaCnt = lastMtta);

      // 20 % of anomalist feature
      randomNum(0, 4) === 0
        ? (anomalistFeatures = lastAnomalistFeatures + 1)
        : (anomalistFeatures = lastAnomalistFeatures);

      // 10 % of a bigger ammount change
      randomNum(0, 9) === 0 ? changeAmount + randomNum(5, 15) : null;

      if (directionChange === 'up') {
        statusPer = lastHistPer + changeAmount;
        statusPer > 100 ? (statusPer = Math.abs(statusPer - 100 - 100)) : null;
      } else {
        statusPer = lastHistPer - changeAmount;
        statusPer < 0 ? (statusPer = Math.abs(statusPer)) : null;
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
    appsStatusDetail.push({
      name: name,
      percentage: statusPer,
      date: date,
      incidents: incidentsCnt,
      impactedSeconds: impactedSec,
      mttaCount: mttaCnt,
      anomalistFeatures: anomalistFeatures
    });
  }

  console.log(history[history.length - 1]);

  return { overall: appsStatusOverall, detail: appsStatusDetail };
};

module.exports = {
  generateAppStatusData: generateAppStatusData
};
