'use strict'
const fs = require('fs')
fs.writeFile('target.txt', process.argv[2], (err) => {
  if (err) {
    throw err
  }
  console.log('File Saved!')
})
