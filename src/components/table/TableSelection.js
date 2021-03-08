import {$} from '@core/dom';

export class TableSelection {
  // constructor(cols, $root, s) {
  constructor(ctx) {
    this.ctx = ctx
    this.selectGroupArr = []
    this.cols = ctx.cols.map((el, i) => {
      return [el, i]
    })
    this.$root = ctx.$root
    this.colsOb = Object.fromEntries(this.cols)
  }

  get current() {
    return this.selectGroupArr[0]
  }

  selectOnKeyDown(event, $target, maxCol, maxRow, cols) {
    let row = parseInt($target.data.row)
    let col = $target.data.col
    if ((event.key === 'Enter' && event.shiftKey) ||
        event.key === 'ArrowUp') {
      if (row === 1) {
        row = maxRow
        if (col === 'A') {
          col = cols[maxCol-1]
        } else {
          col = cols[cols.indexOf(col) - 1]
        }
      } else row--
      this.select(col+row)
    } else if (event.key === 'Enter' || event.key === 'ArrowDown') {
      if (row === maxRow) {
        if (col === cols[maxCol - 1]) {
          col = 'A'
          row = 1
        } else {
          col = cols[cols.indexOf(col) + 1]
          row = 1
        }
      } else row++
      this.select(col+row)
    } else if (event.key === 'ArrowLeft') {
      if (col === 'A') {
        col = cols[maxCol - 1]
      } else {
        col = cols[cols.indexOf(col) - 1]
      }
      this.select(col+row)
    } else if (event.key === 'ArrowRight') {
      if (col === cols[maxCol - 1]) {
        col = 'A'
      } else {
        col = cols[cols.indexOf(col) + 1]
      }
      this.select(col+row)
    }
  }

  selectOnMouseDown($target) {
    this.$target = $target
    this.select($target.data.id)
    this.move = this.selectOnMouseMove.bind(this)
    this.up = this.selectOnMouseUp.bind(this)
    this.$root.on('mousemove', this.move)
    this.$root.on('mouseup', this.up)
  }

  selectOnMouseMove(e) {
    const $lastTarget = $(e.target)
    const firstCellId = this.$target.data.id
    const lastCellId = $lastTarget.data.id
    const selection = `${firstCellId}:${lastCellId}`
    if (firstCellId !== lastCellId) {
      this.select(selection)
    }
  }
  selectOnMouseUp() {
    this.$root.off('mousemove', this.move)
    this.$root.off('mouseup', this.up)
  }

  select(selection) { // selection ~ A1:B2 or A1:B2;A3;A4:C5
    this.selectGroupArr.forEach(el => {
      el.removeClass('group', 'selected')
    })
    this.selectGroupArr = []
    const groups = selection.split(/;/g)
    groups.forEach(group => {
      const [first, last] = group.split(':')
      if (groups.length === 1 && last === undefined) {
        this.selectGroupArr.push(
            this.$root
                .find(`[data-id=${first}]`)
                .addClass('selected')
                .focus()
        )
        return false
      }
      let firstCol = this.colsOb[first.match(/\D/g).join('')]
      let firstRow = parseInt(first.match(/\d/g).join(''))
      if (last === undefined) {
        this.selectGroupArr.push(
            this.$root.find(`[data-id="${first}"]`).addClass('group')
        )
      } else {
        let lastCol = this.colsOb[last.match(/\D/g).join('')]
        let lastRow = parseInt(last.match(/\d/g).join(''))
        if (firstRow > lastRow) [firstRow, lastRow] = [lastRow, firstRow]
        if (firstCol > lastCol) [firstCol, lastCol] = [lastCol, firstCol]
        for (let col = firstCol; col <= lastCol; col++) {
          for (let row = firstRow; row <= lastRow; row++) {
            const $cell = this.cols[col][0] + row
            this.selectGroupArr.push(
                this.$root.find(`[data-id="${$cell}"]`).addClass('group')
            )
          }
        }
      }
    })
    this.selectGroupArr[0].focus().addClass('selected')
    this.ctx.changeSelectedId(this.selectGroupArr[0].data.id)
  }
}
