import fs from 'fs'
import {
  end,
  start
} from '../utils/state-machine'

export class CsvReader {
  constructor (path, {
    bufferSize = 1024 * 1024 * 50,
    encoding = 'utf8'
  } = {}) {
    this._encoding = encoding
    this._bufferSize = bufferSize
    this.fstat = this.fpath = null
    if (!(path && this.open(path))) {
      throw new Error(path + ' is not a file')
    }
  }

  open (path) {
    this.fstat = fs.statSync(path)
    return this.fstat.isFile && !!(this.fpath = path)
  }

  *readSync () {
    let buffer = Buffer.alloc(this._bufferSize)
    let fd = fs.openSync(this.fpath, 'r')
    let bytesReadNum = 0, data = null
    let state = start, storage = { col: [], row: [] }
    while ((bytesReadNum = fs.readSync(fd, buffer, 0, buffer.byteLength, null)) !== 0) {
      data = buffer.toString(this._encoding, 0, bytesReadNum)
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

  async *read () {
    let buffer = Buffer.alloc(this._bufferSize)
    let fd = fs.openSync(this.fpath, 'r')
    let bytesReadNum = 0, data = null
    let state = start, storage = { col: [], row: [] }
    while((bytesReadNum = await fs.read(fd, buffer, 0, buffer.byteLength, null)) !== 0) {
      data = buffer.toString(this._encoding, 0, bytesReadNum)
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
    await fs.close(fd)
  }
}