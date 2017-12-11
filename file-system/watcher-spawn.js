'use strict'
const fs = require('fs')
const spawn = require('child_process').spawn
const filename = process.argv[2]
if (!filename) {
  throw Error('A file to watch must be specified')
}
let args = process.argv.slice(4)
fs.watch(filename, () => {
  const ls = spawn(process.argv[3], args)
  ls.stdout.pipe(process.stdout)
})
console.log(`Now watching ${filename} for changes...`)
