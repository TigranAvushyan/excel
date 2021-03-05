import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
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

  $dispatch(action) {
    this.store.dispatch(action)
  }

  storeChanged() {
  }


  $state() {
    return this.store.getState()
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
