export as namespace CsvWriter

export default CsvWriter

declare class CsvWriter {
  constructor(path: string, options: CsvWriter.CsvWriterOptions)
  append(data: Array<any>): void
  appendMany(data: Array<Array<any>>): void
  close(): void
}

declare namespace CsvWriter {

  export interface CsvWriterOptions {
    /**
     * 若文件存在, 是否以追加的方式写入
     * true: 以追加的方式写入
     * false: 以覆盖的方式写入
     */
    append: boolean,
    /**
     * 是否允许覆盖已存在的文件
     */
    overwrite: boolean,
    /**
     * 文本编码格式
     */
    encoding: string,
    /**
     * 缓存行数, 开启这个参数后, 会缓存 cacheLines 行之后一次性写入
     */
    cacheLines: number
  }
}