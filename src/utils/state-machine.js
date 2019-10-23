import {
  eol,
  separator,
  quoted
} from './constants'

export function end (storage) {
  let { row, col } = storage
  if (col.length) {
    row.push(col.join(''))
    storage.col = []
  }
  let result = row
  storage.row = []
  return result
}

export function start (char, { col }) {
  if (quoted === char) {
    return inQuotedField
  } else if (separator === char || eol.includes(char)) {
    return start
  } else {
    col.push(char)
    return inStandardField
  }
}

export function inQuotedField (char, { col }) {
  if (char === quoted) {
    return inQuotedFieldEnd
  } else {
    col.push(char)
    return inQuotedField
  }
}

export function inQuotedFieldEnd (char, storage) {
  let { row, col } = storage
  if (char === quoted) {
    col.push(char)
    return inQuotedField
  } else if (char === separator) {
    row.push(col.join(''))
    storage.col = []
    return start
  } else if (eol.includes(char)) {
    return end
  } else {
    return inQuotedField
  }
}

export function inStandardField (char, storage) {
  let { row, col } = storage
  if (char === separator) {
    row.push(col.join(''))
    storage.col = []
    return start
  } else if (eol.includes(char)) {
    return end
  } else {
    col.push(char)
    return inStandardField
  }
}

export default {
  start,
  inQuotedField,
  inQuotedFieldEnd,
  inStandardField,
  end
}