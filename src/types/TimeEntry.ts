/* eslint-disable camelcase */
type id = string
type user = string
type date = string
type code = string
type subcode = string
type project = string
type hours = number
type comment = string
type committed = boolean
type domain = string
type subsubcode = string
type group = string
type created_by = string
type create_time = string
type modified_by = string
type modify_time = string
type id_suggestion = number

export interface TimeEntry {
  [key: string]: number | string | boolean
  id: id
  user: user
  date: date
  code: code
  subcode: subcode
  project: project
  hours: hours
  comment: comment
  committed: committed
  domain: domain
  subsubcode: subsubcode
  group: group
  created_by: created_by
  create_time: create_time
  modified_by: modified_by
  modify_time: modify_time
  id_suggestion: id_suggestion
}

export type TimeEntryKey =
  | 'id'
  | 'user'
  | 'date'
  | 'code'
  | 'subcode'
  | 'project'
  | 'hours'
  | 'comment'
  | 'committed'
  | 'domain'
  | 'subsubcode'
  | 'group'
  | 'created_by'
  | 'create_time'
  | 'modified_by'
  | 'modify_time'
  | 'id_suggestion'
