import {ExcelComponent} from '@core/ExcelComponent'
import {hasKey} from '@core/utils';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
      subscribe: ['cellData', 'selectedId'],
      ...options,
    })
  }


  init() {
    super.init();
    this.formula = this.$root.find('.input')
  }

  toHTML() {
    const val = hasKey(this.$state().cellData, this.$state().selectedId)
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false">
        ${val ? val.formula : ''}
      </div>
    `
  }


  storeChanged(changes) {
    let text = ''
    if (Object.keys(changes)[0] === 'cellData') {
      const selId = this.$state().selectedId
      text = changes.cellData[selId].formula
    } else if (Object.keys(changes)[0] === 'selectedId') {
      try {
        text = this.store.getState().cellData[changes.selectedId].formula
      } catch (e) {
        text = ''
      }
    }
    this.formula.text(text)
  }

  onInput(event) {
    const text = event.target.textContent.trim()
    this.$emit('formulaInput', text)
  }
}
