import {Page} from '@core/Page'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {debounce, storage, toMonth} from '@core/utils'
import {initialState} from '@/redux/initialState'

export class ExcelPage extends Page {
  getRoot() {
    const store = createStore(rootReducer, initialState(this.params.url))
    const stateListener = debounce(state => {
      storage(`excel/${this.params.url}`, state)
    }, 300)
    store.subscribe(stateListener)

    this.excel = new Excel({

      components: [Header, Toolbar, Formula, Table],
      store,
    })
    const date = new Date()
    const lastDate =
        `${date.getDate()} ${toMonth(date.getMonth())}  ${date.getFullYear()}`
    store.dispatch({
      type: 'DATE',
      data: lastDate,
    })
    return this.excel.getRoot()
  }
  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
