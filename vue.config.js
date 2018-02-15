const fs = require('fs')
module.exports = {
  lintOnSave: true,
  dll: true, // faster compilation
  devServer: {
    https: {
      cert: fs.readFileSync('./ssl/server.crt'),
      key: fs.readFileSync('./ssl/server.key'),
    },
    open: true, // opens application in browser
    port: 3000,
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    // },
  },
}
