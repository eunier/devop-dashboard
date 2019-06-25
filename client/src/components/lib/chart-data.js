function getChartData(history) {
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

  history.forEach(elem => {
    const data = { ...elem };
    const per = data.percentage;
    const dateStr = data.date;
    const date = new Date(dateStr);

    chartData.labels.push(`${date.getHours()}:${date.getMinutes()}`);
    chartData.datasets[0].data.push(per);
  });

  return chartData;
}

export default getChartData;
