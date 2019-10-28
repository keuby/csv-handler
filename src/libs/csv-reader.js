import fs from 'fs'
import {
  end,
  start
} from '../utils/state-machine'

function *readSync(reader) {
  let buffer = Buffer.alloc(reader._buffer_size)
  let fd = fs.openSync(reader.fpath, 'r')
  let state = start, storage = { col: [], row: [] }
  let bytesReadNum = 0, data = ''
  while ((bytesReadNum = fs.readSync(fd, buffer, 0, buffer.byteLength, null)) !== 0) {
    data = buffer.toString(reader._encoding, 0, bytesReadNum)
    for (let char of data) {
      state = state(char, storage)
      if (state === end) {
        yield state(storage)
        state = start
      }
    }
  }
  let row = end(storage)
  row.length && (yield row)
  fs.closeSync(fd)
}

export default class CsvReader {
  constructor (path, {
    buffer_size = 1024 * 1024 * 50,
    encoding = 'utf8',
    ...options
  } = {}) {
    this._encoding = encoding
    this._buffer_size = buffer_size
    this._size = null
    this.options = options
    this.fstat = this.fpath = null
    if (!(path && this.open(path))) {
      throw new Error(path + ' is not a file')
    }
  }

  open (path) {
    this.fstat = fs.statSync(path)
    return this.fstat.isFile && !!(this.fpath = path)
  }

  read () {
    let it = readSync(this)
    if (this.options.skip_header) {
      it.next()
    }
    return it
  }

  size () {
    if (this._size !== null) {
      return this._size
    }
    let i = 0
    for (let _ of this.read()) {
      i++
    }
    return this._size = i
  }
}
