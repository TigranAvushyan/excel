import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.prepare()
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    this.emitter.subscribe(event, fn)
  }

  $off(event) {
    this.emitter.unsubscribe(event)
  }

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  prepare() {
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
  }
}
