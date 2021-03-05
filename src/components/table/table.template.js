import {hasKey, toSentence} from '@core/utils';

function getWidth(state, col) {
  const c = state.tableResize.col[col]
  if (c) return `style="width: ${c}px"`
}

function getHeight(state, row) {
  const r = state.tableResize.row[row]
  if (r) return `style="height: ${r}px"`
}

function toCell(row, col, state) {
  const cellData = hasKey(state.cellData, col+row) || ''
  let toolBarStyle = ''
  const align = `text-align: ${cellData.align || 'left'}; `
  const bold = `font-weight: ${cellData.bold ? 'bold' : 'normals'};`
  const italic = `font-style: ${cellData.italic ? 'italic' : ''};`
  const underline = `text-decoration: 
    ${cellData.underlined ? 'underline' : 'none'};`
  toolBarStyle = toSentence(align, bold, italic, underline)
  return `
            <input 
              class="cell" 
              data-col="${col}"
              data-row="${row}"
              data-id="${col}${row}"
              data-type="cell"
              ${getWidth(state, col)}
              value="${cellData.value || ''}"
              style="${toolBarStyle}"
            >
        `
}


function toColumn(col, state) {
  return `
    <div class="column" 
      data-type="resizable" 
      data-col="${col}"
      ${getWidth(state, col)}
    >
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `
}


function toRow(index, content, state) {
  const resize = index ? `<div class="row-resize" 
        data-resize="row"></div>` : ''
  const id = index ? index : ''
  return `
    <div class="row" 
      data-type="resizable" 
      data-row="${id}"
      ${getHeight(state, index)}
    >
      <div class="row-info">
        ${id}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

export function createTable(rowsCount, colsCount, state) {
  const rows = []
  const letters = colsCount
  const cols = []

  for (let row = 1; row <= rowsCount; row++) {
    const cells = []
    for (const col of letters) {
      if (row === 1) {
        cols.push(toColumn(col, state))
      }
      cells.push(toCell(row, col, state))
    }
    rows.push(toRow(row, cells.join(''), state))
  }
  rows.unshift(toRow(null, cols.join(''), state))

  return rows.join('')
}
