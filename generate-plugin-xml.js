const fs = require('fs')
const baseXML = fs.readFileSync('./excel-plugin-base.xml', 'utf-8')

function createXML({ url }) {
  // eslint-disable-next-line no-template-curly-in-string
  return baseXML.replace('${url}', url)
}

// create xml file for development
const devBaseUrl = 'https://localhost'
const devPort = '3000'
const devUrl = `${devBaseUrl}:${devPort}`
const devXML = createXML({ url: devUrl })
fs.writeFileSync('./public/excel-plugin-dev.xml', devXML)

// create xml file for production
const prodUrl = ''
const prodXML = createXML({ url: prodUrl })
fs.writeFileSync('./public/excel-plugin.xml', prodXML)
