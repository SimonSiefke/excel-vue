import { TimeEntryKey, TimeEntry } from '@/types/TimeEntry'

// formats address from 'sheet1!A1' to 'A1
function _getAddress(addressString: string) {
  return addressString.split('!')[1]
}

export function writeToExcel(data: Array<Array<string | number | boolean>>) {
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
}

function createRow(rowTemplate: Array<TimeEntryKey | ''>, entry: TimeEntry) {
  return rowTemplate.map(key => {
    if (key === '') {
      return ''
    }
    return entry[key]
  })
}

function createArrayFromTemplate({
  rowTemplate,
  data,
  numberOfRows = data.length,
}: {
  rowTemplate: Array<TimeEntryKey | ''>
  data: TimeEntry[]
  numberOfRows: number
  }) {
  const excelData = data.map(entry => createRow(rowTemplate, entry))

  const fillData = new Array(numberOfRows - data.length).fill(
    new Array(rowTemplate.length).fill('n/a')
  )
  return excelData.concat(fillData)
}

export function buildTemplate(data: TimeEntry[]) {
  const rowTemplate: Array<TimeEntryKey | ''> = [
    'date',
    '',
    'subcode',
    'hours',
    '',
    'project',
    '',
    '',
    '',
    '',
    'code',
    'comment',
  ]

  return createArrayFromTemplate({ rowTemplate, data, numberOfRows: 31 })
}
