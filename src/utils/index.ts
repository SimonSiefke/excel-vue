import { TimeEntryKey, TimeEntry } from '@/types/TimeEntry'

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
