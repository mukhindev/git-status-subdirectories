const fs = require('fs')
const { exec } = require('child_process')
const colors = require('colors')

const path = '../'

function directories () {
  const content = fs.readdirSync(path, 'utf-8')
  const directories = content.filter(el => fs.statSync(`${path}/${el}`).isDirectory())
  return directories
}

const projects = directories()

function status (dir) {
  exec(`cd ../${dir} && git status -s`, (error, stdout, stderr) => {
    if (error) {
      console.error(
        `📂${colors.bold.red(dir)}\n` +
        error
      )
      return
    }
    console.log(
      `📂${dir}\n`.bold.green +
      stdout.yellow
    )
  })
}

for (const dir in projects) {
  status(projects[dir])
}
