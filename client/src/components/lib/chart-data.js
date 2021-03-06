const getChartData = (history, chartRange) => {
  let chartData = {
    labels: [],
    datasets: [
      {
        label: 'Memory/CPU',
        data: [],
        radius: 0,
        fill: false,
        borderColor: '#ff0000',
        backgroundColor: ['red']
      }
    ]
  };

  const startIndex = history.length - chartRange;

  for (let i = startIndex; i < history.length; i++) {
    const elem = history[i];
    const per = elem.percentage;
    const dateStr = elem.date;
    const date = new Date(dateStr);

    chartData.labels.push(`${date.getHours()}:${date.getMinutes()}`);
    chartData.datasets[0].data.push(per);
  }

  return chartData;
};

export default getChartData;
