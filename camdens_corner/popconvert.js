const fs = require('fs')
fs.readFile('./2010pop.txt', (err, data) => {
  const out = data
    .toString('utf16le')
    .split('\r')
    .map(row => row.trim().split('\t'))
    .map(row => [row[0], +row[1], +row[2]])
    .reduce((accum, row) => Object.assign(accum, {
      [row[1]]: {
        name: row[0],
        population: +row[1],
      },
    }), {})

  const json = JSON.stringify(out, null, '\t')
  fs.writeFile('2010pop.json', json, () => {
    console.log('done')
  })
})
