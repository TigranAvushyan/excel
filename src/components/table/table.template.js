const CODES = {
    A: 65,
    Z: 90,
}

function toCell(col) {
    return `
    <div class="cell" contenteditable data-letter="${col}"></div>
  `
}

function toColumn(col) {
    return `
    <div class="column" data-type="resizable" data-letter="${col}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(index, content) {
    const resize = index ? `<div class="row-resize" 
        data-resize="row"></div>` : ''
    return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
    const rows = []
    const colsCount = CODES.Z - CODES.A + 1
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    rows.push(createRow(null, cols))

    for (let i = 1; i <= rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toChar)
            .map(toCell)
            .join('')

        rows.push(createRow(i, cells))
    }

    return rows.join('')
}
