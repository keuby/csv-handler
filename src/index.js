import { CsvReader } from './libs/csv-reader'

let reader = new CsvReader('./example/input.csv')
for (let row of reader.readSync()) {
  console.log(row)
}