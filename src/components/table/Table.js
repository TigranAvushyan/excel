import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {$} from '@core/dom';
import {TableSelection} from '@/components/table/TableSelection';
import {letterGenerator} from '@core/utils';
import {resizeHandler} from '@/components/table/table.resize';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
  }

  toHTML() {
    return createTable(this.maxRow, this.cols, this.$state())
  }

  prepare() {
    this.maxRow = 5
    this.maxCol = 5
    this.cols = letterGenerator(this.maxCol)
    this.selection = new TableSelection(this)
  }

  init() {
    super.init()
    this.selection.select(this.$state().selectedId || 'A1')
    this.$on('formulaInput', text => {
      this.selection.current.val(text)
      this.changeCellDataText(this.selection.current.data.id, text)
    })
    this.$on('change-cell-style', data => {
      this.selection.current.css(data)
    })
  }

  onInput(event) {
    const target = $(event.target)
    this.changeCellDataText(target.data.id, target.val())
  }

  resizeTable($target) {
    resizeHandler(this.$root, $target).then(data => {
      this.$dispatch({type: 'TABLE_RESIZE', data})
    })
  }


  changeCellDataText(id, text) {
    this.$dispatch({
      type: 'CELL_DATA',
      id,
      data: {
        value: text,
        formula: text,
      },
    })
  }

  changeSelectedId(id) {
    this.$dispatch({
      type: 'SELECT',
      value: id,
    })
  }

  onMousedown(event) {
    const $target = $(event.target)
    if ($target.data.resize) {
      this.resizeTable($target)
    } else if ($target.data.type === 'cell') {
      this.selection.selectOnMouseDown($target)
    }
  }


  onKeydown(event) {
    const $target = $(event.target)
    this.selection.selectOnKeyDown(
        event, $target, this.maxCol, this.maxRow, this.cols)
  }
}
