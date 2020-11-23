#!/usr/bin/env node

/**
 * Loading the 'fs', 'path', 'tmp', 'archiver' node modules
 */
const fs = require("fs")
const path = require("path")
const tmp = require("tmp")
const archiver = require("archiver")
/**
 * Loading the version of 'sinix' from 'package.json'
 */
const { version } = require("../package.json")
/**
 * Storing arguments passed to 'process' in an array.
 * @type {Array}
 */
const [,, ... args] = process.argv
const CONF_PATH = path.join(process.cwd(), "sinix.config.js")
const PACK_PATH = path.join(process.cwd(), "package.json")

console.log(`sinix.js v${version}`)
/**
 * @returns {void}
 */
const pack = () => {
  /**
   * Initialize a Node project if path to 'package.json' does not exist
   */
  if (!fs.existsSync(PACK_PATH)){
    console.log("Not a Node project.")
    console.log(`
  $ npm init
`)
  }
  /**
   * Check if a Sinix project is initialized or not
   */
  if (!fs.existsSync(CONF_PATH)){
    console.log("Not a Sinix application.")
    console.log(`
  $ sinix init # to initialize
`)
    return
  }

  const config = require(CONF_PATH)

  /**
   * Create 'release' directory if the path does not exist
   */
  if (!fs.existsSync("release")){
    fs.mkdirSync("release")
  }
  /**
   * @returns {void}
   */
  tmp.file((err, tmp_path) => {
    if (err) throw err
    /**
     * @description Creating a Writestream object
     */
    const output = fs.createWriteStream(tmp_path)
    const archive = archiver("zip")
    /**
     * @description Returns the "total bytes" after running $sinix pack command in project.
     */
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
    /**
     * @description Check if 'distDir' exists in 'sinix.config.js' file
     */
    if (!fs.existsSync(config.distDir)){
      console.log(`${config.distDir} does not exists`)
      return
    }
    /**
     * @description Parsing package.json into a Javascript object
     * @type {Object}
     */
    const packageJsonObj = JSON.parse(fs.readFileSync("package.json"))
    /**
     * @description Storing package.json values
     * @type {{name: string, version: string, title: string, slug: string}}
     */
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
      ignore: ["node_modules/**", "release/**"]
    })

    process.chdir("../")

    archive.finalize()
  })
}
/**
 * @description Initializing 'distDir' value for 'sinix.config.js'
 */
const init = () => {
  const configObj = {
    "distDir": "dist/"
  }

  const config = JSON.stringify(configObj, null, 2)
  const code = `module.exports = ${config}`
  /**
   * @description Write data in 'sinix.config.js' while initializing a Sinix project
   */
  fs.writeFile("sinix.config.js", code, (err) => {
    if(err){
      console.log(err)
    } else {
      console.log("Initialized Sinix project")
    }
  })
}
/**
 * @description Perform 'pack' or 'init' function according to command on CLI.
 */
switch(args[0]){
case "pack": pack(); break
case "init": init(); break
}
