export class Emitter {
  constructor() {
    this.listeners = {}
  }

  emit(event, ...args) {
    this.listeners[event](...args)
  }

  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || fn
  }

  unsubscribe(event) {
    delete this.listeners[event]
  }
}
