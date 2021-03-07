import {$} from '@core/dom'
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/storeSubscriber';

export class Excel {
  constructor(options) {
    this.components = options.components || []
    this.store = options.store
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const componentOb = {
      emitter: new Emitter(),
      store: this.store,
    }
    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOb)
      if (component.name) {
        window['c' + component.name] = component
      }
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }


  init() {
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init())
  }

  destroy() {
    this.subscriber.unSubscribeFromStore()
    this.components.forEach(component => component.destroy())
  }
}
