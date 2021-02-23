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
    // console.log(this.$dispatch)
    // eslint-disable-next-line max-len
    // this.selection = new TableSelection(this.cols, this.$root, this.changeSelectedId)
    this.selection = new TableSelection(this)
  }

  init() {
    super.init()
    this.selection.select(this.$state().selectedId || 'A1')
  }

  onInput(event) {
    this.changeTextState($(event.target))
  }

  resizeTable($target) {
    resizeHandler(this.$root, $target).then(data => {
      this.$dispatch({type: 'TABLE_RESIZE', data})
    })
  }

  changeTextState($target) {
    this.$dispatch({
      type: 'CHANGE_TEXT',
      data: {
        [$target.data.id]: {
          value: $target.val(),
          formula: $target.val(),
        },
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
      // this.changeSelectedId($target.data.id)
    }
  }


  onKeydown(event) {
    const $target = $(event.target)
    this.selection.selectOnKeyDown(
        event, $target, this.maxCol, this.maxRow, this.cols)
    // this.changeSelectedId($target.data.id)
  }
}
