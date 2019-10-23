import { CsvReader } from './libs/csv-reader'

let reader = new CsvReader('./example/input.csv')
async function main () {
  for await (let row of reader.read()) {
    console.log(row)
  }
}
main()