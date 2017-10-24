const fs = require('fs')
fs.readFile('./2010pop.txt', (err, data) => {
  const proccessed = data
    .toString('utf16le')
    .split('\r')
    .map(row => row.trim().split('\t'))
    .reduce((accum, row) => Object.assign(accum, { [row[1]]: { name: row[0], population: +row[2] } }), {})
  fs.writeFile('2010pop.json', JSON.stringify(proccessed, null, '\t'), () => console.log('done'))
})
