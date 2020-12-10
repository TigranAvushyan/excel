import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {$} from '@core/dom';
import {resizeHandler} from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {letterGenerator} from '@core/utils';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options,
    })
  }

  toHTML() {
    return createTable(this.maxRow, this.cols)
  }

  prepare() {
    this.maxRow = 5
    this.maxCol = 5
    this.cols = letterGenerator(this.maxCol)
    this.selection = new TableSelection(this.cols, this.$root)
  }

  init() {
    super.init()
    this.selection.select('A1')
    this.$on('a', text => {
      this.selection.current.val(text)
    })
  }

  onMousedown(event) {
    const $target = $(event.target)
    if ($target.data.resize) {
      resizeHandler(this.$root, $target)
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
