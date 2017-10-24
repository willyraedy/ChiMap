const fs = require('fs');

const roundToTenthPlace = num => {
  return Math.round(num * 10) / 10;
};

const convertTo100k = (crimeData, popData) => {
  const convertedHomicideData = {};
  Object.keys(crimeData).forEach(communityArea => {
    const unrounded =
      crimeData[communityArea] / popData[communityArea] * 100000;
    convertedHomicideData[communityArea] = roundToTenthPlace(unrounded);
  });

  return convertedHomicideData;
};

module.exports = convertTo100k;


// const string = JSON.stringify(convertedHomicideData, null, '\t');
// fs.writeFile('worldHomicide.json', string, () => {
//   console.log('done');
// });
