export default ((...suffixes) =>
  n =>
    n + (suffixes[(n % 100 - 20) % 10] || suffixes[n % 100] || suffixes[0])
)('th', 'st', 'nd', 'rd');
