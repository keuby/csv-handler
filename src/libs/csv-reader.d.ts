export as namespace CsvReader

export default CsvReader

declare class CsvReader {
  constructor(path: string, options: CsvReader.CsvReaderOptions)
  /**
   * 打开新文件
   * @return 若打开成功返回true, 否则返回false
   */
  open(path: string): boolean
  /**
   * 获取文件行数
   */
  size(): number
  /**
   * 同步读取CSV文件
   */
  read(): Iterable<Array<string>>
}

declare namespace CsvReader {

  export interface CsvReaderOptions {
    /**
     * 缓冲区大小
     */
    bufferSize: number,
    /**
     * 文本编码格式
     */
    encoding: string,
    /**
     * 跳过头部
     */
    skip_header: boolean
  }
}