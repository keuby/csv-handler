const eol = ['\n', '\r\n', '\r']
const separator = ','
const quoted = '"'

let col = []
let row = []

export function end () {
  if (col.length) {
    row.push(col.join(''))
    col = []
  }
  let result = row
  row = []
  return result
}

export function start (char) {
  if (quoted === char) {
    return inQuotedField
  } else if (separator === char || eol.includes(char)) {
    return start
  } else {
    col.push(char)
    return inStandardField
  }
}

export function inQuotedField (char) {
  if (char === quoted) {
    return inQuotedFieldEnd
  } else {
    col.push(char)
    return inQuotedField
  }
}

export function inQuotedFieldEnd (char) {
  if (char === quoted) {
    col.push(char)
    return inQuotedField
  } else if (char === separator) {
    row.push(col.join(''))
    col = []
    return start
  } else if (eol.includes(char)) {
    return end
  } else {
    return inQuotedField
  }
}

export function inStandardField (char) {
  if (char === separator) {
    row.push(col.join(''))
    col = []
    return start
  } else if (eol.includes(char)) {
    return end
  } else {
    col.push(char)
    return inStandardField
  }
}

export const States = {
  start,
  inQuotedField,
  inQuotedFieldEnd,
  inStandardField,
  end
}