const sum = (total, count) => total + count;

export default function sortPackagesByDownloads(
  [ _icon1, pkg1, _description1, downloads1 ],
  [ _icon2, pkg2, _description2, downloads2 ],
) {
  const count1 = downloads1.reduce(sum, 0);
  const count2 = downloads2.reduce(sum, 0);
  if (count1 < count2) {
    return 1;
  }
  if (count1 > count2) {
    return -1;
  }
  if (pkg1 < pkg2) {
    return 1;
  }
  return 1;
};
