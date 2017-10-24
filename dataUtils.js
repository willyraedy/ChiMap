const fs = require('fs');

const streamToPromise = (stream) => {
  return new Promise(function(resolve, reject) {
      stream.on("end", resolve);
      stream.on("error", reject);
  });
}

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
  return JSON.parse(string).data;
}

const getChiHomicideData = async (filePath) => {
  const data = await readJSON(filePath)
  return aggregatedChicagoHomicideData(data);
}


module.exports = getChiHomicideData;
