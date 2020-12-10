class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  text(text) {
    this.$el.textContent = text
  }

  val(text) {
    if (text) {
      this.$el.value = text
      return this
    } else return this.$el.value
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  get data() {
    return this.$el.dataset
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  focus() {
    this.$el.focus()
    return this
  }

  addClass(...classNames) {
    classNames.forEach( className => {
      this.$el.classList.add(className)
    })
    return this
  }

  removeClass(...classNames) {
    classNames.forEach( className => {
      this.$el.classList.remove(className)
    })
    return this
  }

  css(style) {
    if (typeof style === 'object') {
      Object.keys(style).forEach(key => {
        this.$el.style[key] = style[key]
      })
      return this
    } else if (typeof style === 'string') {
      return getComputedStyle(this.$el)[style]
    }
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }
}

// event.target
export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
