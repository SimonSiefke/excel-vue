const fs = require('fs')

module.exports = {
  lintOnSave: true,
  dll: true, // faster compilation
  devServer: {
    /* https is needed for excel-plugins to work.
       you need generate a cert-file and a key-file and
       place it inside the ssl folder */
    https: {
      cert: fs.readFileSync('./ssl/server.crt'),
      key: fs.readFileSync('./ssl/server.key'),
    },
    port: 3000,
  },
}
