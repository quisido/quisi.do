const mediumUrl = (id, title) =>
  'https://medium.com/@Charles_Stover/' +
  title
    .toLowerCase()
    .replace(/[^a-z\d\s-]+/g, '')
    .replace(/\s+/g, '-') +
  '-' +
  id;

export default mediumUrl;
