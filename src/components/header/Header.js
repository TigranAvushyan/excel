import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom';
import {debounce} from '@core/utils';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  onInput(e) {
    this.$dispatch({
      type: 'TABLE_NAME',
      data: {
        value: $(e.target).val(),
      },
    })
  }


  toHTML() {
    const val = this.$state().tableName
    return `
      <input type="text" class="input" value="${val}" />

      <div>

        <div class="button">
          <i class="material-icons">delete</i>
        </div>

        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>

      </div>
    `
  }
}
