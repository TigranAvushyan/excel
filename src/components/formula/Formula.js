import {ExcelComponent} from '@core/ExcelComponent'

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
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }


  storeChanged(changes) {
    let text = ''
    if (Object.keys(changes)[0] === 'cellData') {
      const selId = this.store.getState().selectedId
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
