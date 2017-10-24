/* global expect describe test before */

const convertTo100k = require('./convertTo100k');

describe('Convert to 100k', () => {
  let crimeData, popData, result = {};
  beforeEach(() => {
    crimeData = {
      1: 1,
      2: 2,
      3: 13,
      4: 24,
    };
    popData = {
      1: 50000,
      2: 10000,
      3: 19000,
      4: 2000,
    };
    [1, 2, 3, 4].forEach(num => {
      result[num] = Math.round(((crimeData[num] / popData[num]) * 100000) * 10) / 10;
    });
  });

  test('returns an object', () => {
    const convertedData = convertTo100k(crimeData, popData);
    expect(typeof convertedData).toBe('object');
  });
  test('converts homicides to homicides per 100k people', () => {
    const convertedData = convertTo100k(crimeData, popData);
    expect(convertedData).toEqual(result);
  });
});
