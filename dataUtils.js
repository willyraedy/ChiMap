const fs = require('fs');

const streamToPromise = (stream) => {
  return new Promise(function(resolve, reject) {
      stream.on("end", resolve);
      stream.on("error", reject);
  });
}

const roundToTenthPlace = num => {
  return Math.round(num * 10) / 10;
};

const aggregatedChicagoHomicideData = (data) => {
  const aggResults = {}
  data.forEach(homicide => {
    const community = homicide[10];
    aggResults[community] ? aggResults[community]++ : aggResults[community] = 1;
  })
  return aggResults;
}

const readJSON = async (filePath) => {
  let string = '';
  const readable = fs.createReadStream(filePath);
  readable.on('data', (chunk) => {
    try {
      string += chunk.toString();
    } catch (err) {
      console.error(err);
    }
  });
  await streamToPromise(readable);
  return JSON.parse(string);
}

const getChiHomicideData = async (filePath) => {
  const dataObj = await readJSON(filePath)
  return aggregatedChicagoHomicideData(dataObj.data);
}

const convertTo100k = (crimeData, popData) => {
  const convertedHomicideData = {};
  Object.keys(crimeData).forEach(communityArea => {
    const unrounded =
      crimeData[communityArea] / popData[communityArea].population * 100000;
    convertedHomicideData[communityArea] = roundToTenthPlace(unrounded);
  });

  return convertedHomicideData;
};

module.exports = {
  getChiHomicideData,
  convertTo100k,
  readJSON,
};
