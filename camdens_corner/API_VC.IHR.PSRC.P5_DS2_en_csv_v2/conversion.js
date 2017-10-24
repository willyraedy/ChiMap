const fs = require('fs')
const parse = require('csv-parse')
fs.readFile('./worldHomicide.txt', (err, data) => {
  const rows = data
    .toString('utf16le')
    .split('\r')
    .map(row =>
      row
        .split('')
        .filter(char => char !== '"')
        .join(''))
    .map(row => row.trim().split('\t'))
    .map((row) => {
      const newRow = [...row]
      newRow[2] = +row[2]
      return newRow
    })
    .sort((a, b) => a[2] - b[2])
    .reduce((accum, row) => Object.assign(accum, { [row[0]]: row[2] }), {})
  const string = JSON.stringify(rows, null, '\t')
  fs.writeFile('worldHomicide.json', string, () => {
    console.log('done')
  })
})
