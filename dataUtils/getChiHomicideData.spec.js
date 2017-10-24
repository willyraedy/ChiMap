/* global expect describe test */

const fs = require('fs');

const getChiHomicideData = require('./getChiHomicideData');

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
