#!/usr/bin/env node

const fs = require("fs")
const tmp = require("tmp")
const path = require("path")
const archiver = require('archiver')

const [,, ... args] = process.argv

const cwd = process.cwd()

const build = () => {
  if (!fs.existsSync("release")){
    fs.mkdirSync("release");
  }

  tmp.file((err, path, fd, cleanupCallback) => {
    if (err) throw err;

    const output = fs.createWriteStream(path)
    const archive = archiver("zip")

    output.on("close", () => {
      console.log(archive.pointer() + " total bytes")

      fs.copyFile(path, "release/app.dext", function(err){
        console.log(err)
      })
    })

    output.on("end", () => {
      console.log("Data has been drained");
    })

    archive.on("warning", (err) => {
      if(err.code === "ENOENT"){
        console.log(err)
      } else {
        throw err;
      }
    })

    archive.on("error", (err) => {
      console.log(err)
    })

    archive.pipe(output)
    archive.glob('**', {
      ignore: ['node_modules/**', 'release/**']
    })

    archive.finalize()
  })
}

switch(args[0]){
  case "build": build(); break;
}
