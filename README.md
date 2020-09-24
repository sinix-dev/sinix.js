# Sinix

[![Join the chat at https://gitter.im/sinix-dev/sinix.js](https://badges.gitter.im/sinix-dev/sinix.js.svg)](https://gitter.im/sinix-dev/sinix.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[Letter to SLoP Contributors](https://github.com/sinix-dev/sinix/wiki/Letter-to-SLoP-Contributors)

Build games for Sinix with [Joystick](https://github.com/sinix-dev/sinix-android) support

### Installation and Setup

```bash
$ npm install sinix --save
```

Add script in `package.json`

```json
"scripts": {
  "sinix": "sinix",
}
```

Initialize a Sinix project
```
$ npm run sinix init
```

This will create `sinix.config.js` in the current directory. By default, sinix packages
the content of `dist/` directory, update the `distDir` value in `sinix.config.js`
as per your project.

### Communication Interface

You can use `remote` to listen for events happening on [Joysticks](https://github.com/sinix-dev/sinix-android)
```js
import { remote } from "sinix"

remote.listen("STICK1", (payload) => {
  console.log(payload)
  
  /*
  {
    "user": "nickname",
    "x": 35.09090909090909,
    "y": -48.36363636363637}
  }
  */
})

remote.listen("BUTTON", (payload) => {
  console.log(payload) // { "user": "nickname", "val": "A" }
  
  if(payload.val === "A"){
    // do something
  } else if(payload.val === "B"){
    // do something
  }
})
```

### Build and Publish
Generates `app.dext` file in `release` folder, which you can open in [Sinix](https://github.com/sinix-dev/sinix)
or publish on Sinix.
```
$ npm run sinix build
```

It is also possible to publish directly from the command-line using following command.
```
$ npm run sinix publish
```

will prompt for `token` and `password` which can be retrieved from the account created on [sinix.dev](https://sinix.dev). The application
will go live in under 24 hours on [Sinix Store](https://sinix.dev/store).
