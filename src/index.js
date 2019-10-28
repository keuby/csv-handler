import CsvReader from './libs/csv-reader'

let reader = new CsvReader('./example/input.csv', {
  skip_header: true
})
for (let row of reader.read()) {
  console.log(row)
}
