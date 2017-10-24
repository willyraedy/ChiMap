/* global expect describe test before */

const fs = require('fs');

const convertTo100k = require('./dataUtils').convertTo100k;
const getChiHomicideData = require('./dataUtils').getChiHomicideData;

describe('Data utils', () => {
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
        1: {
          name: 'one',
          population: 50000,
        },
        2: {
          name: 'two',
          population: 10000,
        },
        3: {
          name: 'three',
          population: 19000,
        },
        4: {
          name: 'four',
          population: 2000,
        },
      };
      [1, 2, 3, 4].forEach(num => {
        result[num] = Math.round(((crimeData[num] / popData[num].population) * 100000) * 10) / 10;
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

  describe('Get Chicago Homicides', () => {
    test('returns an object', (done) => {
      getChiHomicideData('./willys_corner/testCrimeData.json')
        .then(output => {
          expect(typeof output).toBe('object');
          done();
        })
        .catch(err => {
          console.error(err);
          throw new Error('getChiHomicideData rejected unexpectedly');
        });
    });
    test('aggregates chicago homicides by community area', (done) => {
      let results;
      const readable = fs.createReadStream('./willys_corner/testCrimeData.json');
      readable.on('data', chunk => {
        const string = chunk.toString();
        results = JSON.parse(string).results;
      });
      readable.on('close', () => {
        getChiHomicideData('./willys_corner/testCrimeData.json')
          .then(output => {
            expect(typeof output).toBe('object');
            expect(output).toEqual(results);
            done();
          })
          .catch(err => {
            console.error(err);
            throw new Error('getChiHomicideData rejected unexpectedly');
          });
      });
    });
  });
});
