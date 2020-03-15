const fs = require('fs')
const { exec } = require('child_process')
const colors = require('colors')

const path = '../'

const projects = (function directories () {
  const content = fs.readdirSync(path, 'utf-8')
  const directories = content.filter(el => {
    return fs.statSync(`${path}/${el}`).isDirectory()
  })
  return directories
})()

function status (dir) {
  exec(`cd ../${dir} && git status -s`, (error, stdout) => {
    if (error) {
      console.log(`${colors.bold.red('▓▓', dir)}`)
      if (/'not a git repository'/) {
        console.error(`${colors.red('\xa0\xa0\xa0Not a git repository', '\n')}`)
      }
      return
    }

    const files = stdout
      .split(/\n/)
      .filter(el => el !== '')
      .map((el, i, arr) => {
        if (i === arr.length - 1) return `\xa0└\xa0${el.trim()}`
        else return `\xa0├\xa0${el.trim()}`
      })
      .join('\n')

    if (files.length === 0) {
      console.log(`${colors.bold.green('▓▓', dir)}`)
      console.log(`${colors.green('\xa0\xa0\xa0No change')}`, '\n')
    }

    if (files.length > 0) {
      console.log(`${colors.bold.yellow('▓▓', dir)}`)
      console.log(`${colors.yellow(files)}`, '\n')
    }
  })
}

for (const dir of projects) {
  status(dir)
}
