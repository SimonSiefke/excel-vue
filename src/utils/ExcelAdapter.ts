// formats address from 'sheet1!A1' to 'A1
function _getAddress(addressString: string) {
  return addressString.split('!')[1]
}

interface i {
  [key: string]: Function
}
const ExcelFunctions: i = {
  writeToExcel(data: Array<Array<string | number | boolean>>) {
    Excel.run(async context => {
      // select worksheet
      const sheet = context.workbook.worksheets.getItem('Sheet1')

      // which cells to write to
      const start = {
        x: 0,
        y: 0,
      }

      const startCell = sheet.getCell(start.x, start.y)
      const endCell = sheet.getCell(
        start.x + data.length - 1,
        start.y + data[0].length - 1
      )

      // get addresses of cells (e.g. A1)
      startCell.load('address')
      endCell.load('address')
      await context.sync()
      const startAddress = _getAddress(startCell.address)
      const endAddress = _getAddress(endCell.address)

      // the range for the data
      const range = sheet.getRange(`${startAddress}:${endAddress}`)

      // write data to excel
      range.values = data

      return context.sync()
    }).catch(error => {
      console.log('Error: ' + error)
      if (error instanceof OfficeExtension.Error) {
        console.log('Debug info: ' + JSON.stringify(error.debugInfo))
      }
    })
  },
}

/* higher order function wrapper for functions using Excel
   prevents errors in the console when the app is loaded
   outside of excel */
function withExcel(target: { [key: string]: any }, propertyKey: string) {
  if (typeof Excel !== 'undefined') {
    return target[propertyKey]
  } else {
    return () => console.warn('Excel is not available')
  }
}

const ExcelAdapter = new Proxy(ExcelFunctions, { get: withExcel })

export default ExcelAdapter
