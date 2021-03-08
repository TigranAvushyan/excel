import {Page} from '@core/Page'
import {$} from '@core/dom';
import {storage} from '@core/utils';

export class DashboardPage extends Page {
  getRoot() {
    return $.create('div', 'db').html(`
    <div class="db__header">
      <h1>Excel Dashboard</h1>
    </div>

    <div class="db__new">
      <div class="db__view">
        <a href="#excel/${this.params.url}" class="db__create">
          Новая <br /> Таблица
        </a>
      </div>
    </div>

    <div class="db__table db__view">

      <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
      </div>

      <ul class="db__list">
        ${this.tablesList(this.params.pages)}
      </ul>

    </div>
    `)
  }

  tablesList(pages) {
    let list = ''
    if (pages.length === 0) {
      return `<li>Вы пока не создали ни одной таблицы</li>`
    } else {
      pages.forEach(i => {
        const table = storage(i)
        list += `
          <li class="db__record">
            <a href="#${i}">${table.tableName}</a>
            <strong>${table.lastDate}</strong>
          </li>
`
      })
    }
    return list
  }
}
