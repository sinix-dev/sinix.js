#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const tmp = require("tmp")
const archiver = require('archiver')

const [,, ... args] = process.argv
const CONF_PATH = path.join(process.cwd(), "sinix.config.js")


const build = () => {
  if (!fs.existsSync(CONF_PATH)){
    console.log("Not a Sinix application.")
    console.log(`
  $ sinix init # to initialize
`)
    return
  }

  const config = require(CONF_PATH)

  if (!fs.existsSync("release")){
    fs.mkdirSync("release")
  }

  tmp.file((err, tmp_path) => {
    if (err) throw err

    const output = fs.createWriteStream(tmp_path)
    const archive = archiver("zip")

    output.on("close", () => {
      console.log(archive.pointer() + " total bytes")

      fs.copyFile(tmp_path, "release/app.dext", function(err){
        if(err){
          console.log(err)
        }
      })
    })

    output.on("end", () => {
      console.log("Data has been drained")
    })

    archive.on("warning", (err) => {
      if(err.code === "ENOENT"){
        console.log(err)
      } else {
        throw err
      }
    })

    archive.on("error", (err) => {
      console.log(err)
    })

    archive.pipe(output)
    archive.glob(path.join(config.distDir, "**"), {
      ignore: ['node_modules/**', 'release/**']
    })

    archive.finalize()
  })
}

const init = () => {
  const configObj = {
    "distDir": "dist/"
  }

  const config = JSON.stringify(configObj, null, 2)
  const code = `module.exports = ${config}`

  fs.writeFile("sinix.config.js", code, (err) => {
    if(err){
      console.log(err)
    } else {
      console.log("Initialized Sinix project")
    }
  })
}

switch(args[0]){
case "build": build(); break
case "init": init(); break
}
