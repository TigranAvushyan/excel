import {$} from '@core/dom';
import {ActiveRoute} from '@core/router/ActiveRoute';

export class Router {
  constructor(selector, pages) {
    if (!selector) throw new Error('selector is not provided in Router')

    this.$placeholder = $(selector)
    this.pages = pages
    this.page = null
    this.param = {
      url: '',
      pages: [],
    }

    this.changePageHandler = this.changePageHandler.bind(this)

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    let Page
    const lStorageKeys = Object.keys(localStorage)
        .filter(i => i.includes('excel'))
    if (this.page) this.page.destroy()
    this.$placeholder.clear()
    if (ActiveRoute.PARAM[0] !== 'excel') {
      Page = this.pages.dashboard
      this.param = {
        url: Date.now(),
        pages: lStorageKeys,
      }
    } else {
      Page = this.pages.excel
      lStorageKeys.forEach(key => {
        if (key.includes(ActiveRoute.PARAM[1])) {
          this.param.url = ActiveRoute.PARAM[1]
          return false
        }
      })
    }
    this.page = new Page(this.param)
    this.$placeholder.append(this.page.getRoot())

    this.page.afterRender()
  }


  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
