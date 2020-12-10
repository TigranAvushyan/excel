
function toCell(row, col) {
  return `
            <input 
            class="cell" 
            data-col="${col}"
            data-row="${row}"
            data-id="${col}${row}"
            data-type="cell"
            >
        `
}

function toColumn(col) {
  return `
    <div class="column" data-type="resizable" data-col="${col}">
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
export function createTable(rowsCount, colsCount) {
  const rows = []
  const letters = colsCount
  const cols = []

  for (let row = 1; row <= rowsCount; row++) {
    const cells = []
    for (const col of letters) {
      if (row === 1)
        cols.push(toColumn(col))
      cells.push(toCell(row, col))
    }
    rows.push(createRow(row, cells.join('')))
  }
  rows.unshift(createRow(null, cols.join('')))

  return rows.join('')
}
