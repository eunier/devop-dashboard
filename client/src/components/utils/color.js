const color = status => {
  switch (status) {
    case 'Ok':
      return 'success';
    case 'Major':
      return 'warning';
    case 'Critical':
      return 'danger';
    default:
      return 'secondary';
  }
};

export default color;
