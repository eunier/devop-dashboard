const getChartData = history => {
  let chartData = {
    labels: [],
    datasets: [
      {
        label: 'test',
        data: []
      }
    ]
  };

  // console.log(history);

  for (let i = 0; i < history.length; i++) {
    const elem = history[i];
    // const per = elem.percentage;
    // const date = new Date(elem.date);
    // const dateFormated = `${date.getHour()}:${date.getSecond()}`;
    // console.log(dateFormated);
    // console.log(elem);
  }
};

module.exports = { getChartData: getChartData };
