## File Handler
`@lnfsink/csv-handler` can synchronously read and write csv files

## Install

Using npm:

```shell
$ npm install @lnfsink/csv-handler
```

Using yarn:

```shell
$ yarn add @lnfsink/csv-handler
```

## Usage

```javascript
const handler = require('@lnfsink/csv-handler')

let reader = handler.read('example/input.csv', {
  bufferSize: 1024 * 1024, // 1M Default
  encoding: 'utf8' // Default
})
let writer = handler.write('example/output.csv', {
  cacheLines: 1000 // Cache some lines before writing to the file
})
for (let line of reader) {
  writer.writeLine(line)
}
writer.close()
```