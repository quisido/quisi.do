const _date = Object.create(null);

const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

const date = (y, m, d) => {
  const key = '_' + y + '_' + m + '_' + d;
  if (!Object.prototype.hasOwnProperty.call(_date, key)) {
    _date[key] = new Date(d + ' ' + months[m - 1] + ' ' + y + ' UTC');
  }
  return _date[key];
};

export default date;
