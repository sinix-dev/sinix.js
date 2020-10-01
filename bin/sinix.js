#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const tmp = require("tmp")
const archiver = require('archiver')

const [,, ... args] = process.argv
const CONF_PATH = path.join(process.cwd(), "sinix.config.js")
const PACK_PATH = path.join(process.cwd(), "package.json")


const pack = () => {
  if (!fs.existsSync(PACK_PATH)){
    console.log("Not a Node project.")
    console.log(`
  $ npm init
`)
  }

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

      const name = sinixJsonObj.slug.replace(" ", "-")

      fs.copyFile(tmp_path, `release/${name}.dext`, function(err){
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

    if (!fs.existsSync(config.distDir)){
      console.log(`${config.distDir} does not exists`)
      return
    }

    const packageJsonObj = JSON.parse(fs.readFileSync("package.json"))

    const sinixJsonObj = {
      name: packageJsonObj.name,
      version: packageJsonObj.version,
      title: config.title ? config.title : packageJsonObj.name,
      slug: `${packageJsonObj.name}-v${packageJsonObj.version}`
    }

    const sinixJson = JSON.stringify(sinixJsonObj, null, 2)

    process.chdir(config.distDir)

    fs.writeFileSync("sinix.manifest.json", sinixJson)

    archive.glob("**", {
      ignore: ['node_modules/**', 'release/**']
    })

    process.chdir("../")

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
case "pack": pack(); break
case "init": init(); break
}
