const generateAppStatusData = () => {
  const status = {
    1: 'Critical',
    2: 'Major',
    3: 'Ok'
  };

  let appsStatus = Array(3);

  for (let i = 0; i < appsStatus.length; i++) {
    const statusNum = Math.floor(Math.random() * 3) + 1;
    const name = `app${i + 1}`;

    appsStatus[i] = { name: name, status: status[statusNum] };
  }

  return appsStatus;
};

module.exports = {
  generateAppStatusData: generateAppStatusData,
};
