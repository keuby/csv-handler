import { write } from '@lnfsink/file-handler'
import {
  eol,
  quoted,
  separator
} from '../utils/constants'

const FIELD_TYPE = {
  QUOTED_FIELD: 0,
  SPECIAL_FIELD: 1,
  STANDARD_FIELD: 1
}

const QUOTED_FIELD_REGEXP = new RegExp(`\\${quoted}`, 'g')

/**
 * 判断字段类型
 * @param {string} col 
 */
function judgeFieldType (col) {
  for (let c of col) {
    if (eol.includes(c) || c === separator) {
      return FIELD_TYPE.SPECIAL_FIELD
    } else if (c === quoted) {
      return FIELD_TYPE.QUOTED_FIELD
    }
  }
  return FIELD_TYPE.STANDARD_FIELD
}

export default class CsvWriter {
  constructor (path, options) {
    this.writer = write(path, options)
  }

  append (data) {
    let row = data.map(col => {
      switch (judgeFieldType(col)) {
        case FIELD_TYPE.STANDARD_FIELD:
          return col
        case FIELD_TYPE.SPECIAL_FIELD:
          return quoted + col + quoted
        case FIELD_TYPE.QUOTED_FIELD:
          return quoted + col.replace(QUOTED_FIELD_REGEXP, quoted + quoted) + quoted
      }
    }).join(separator)
    this.writer.writeLine(row)
  }

  appendMany (data) {
    data.forEach(row => append(row))
  }

  close () {
    this.writer.close()
  }
}
