import {ExcelComponent} from '@core/ExcelComponent'
import {hasKey, toggle} from '@core/utils';
import {$} from '@core/dom';

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['cellData'],
      ...options,
    })
  }


  get getCellData() {
    return hasKey(this.$state().cellData, this.$state().selectedId)
  }


  toHTML() {
    return `
      <div class="button material-icons" 
            data-align="left">
        format_align_left
      </div>

      <div class="button material-icons"
           data-align="center">
        format_align_center
      </div>

      <div class="button material-icons"
           data-align="right">
        format_align_right
      </div>
       
      <div class="button material-icons" data-toggle="bold">
        format_bold
      </div>

      <div class="button material-icons" data-toggle="italic">
        format_italic
      </div>

      <div class="button material-icons" data-toggle="underlined">
        format_underlined
      </div>
    `
  }

  storeChanged(store) {
    const {align, underlined, italic, bold} = this.getCellData
    this.$emit('change-cell-style', {
      textAlign: align || 'left',
      fontWeight: bold ? 'bold' : 'normal',
      textDecoration: underlined ? 'underline' : 'none',
      fontStyle: italic ? 'italic' : '',
    })
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.align) {
      const align = $target.data.align
      this.cellDataChange('align', align)
      $(`[data-align='${align}']`).add
    } else if ($target.data.toggle) {
      const toggleValue = this.getCellData
          ? this.getCellData[$target.data.toggle]
          : false
      this.cellDataChange($target.data.toggle, toggle(toggleValue))
    }
  }

  cellDataChange(key, value) {
    this.$dispatch({
      type: 'CELL_DATA',
      id: this.$state().selectedId,
      data: {
        [key]: value,
      },
    })
  }
}
