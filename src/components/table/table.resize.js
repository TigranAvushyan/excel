import {$} from '@core/dom';

class TableResize {
  constructor($root, $target) {
    this.$target = $target
    this.$root = $root
    this.resizeType = this.$target.data.resize
    this.$parent = this.$target.closest(`[data-type='resizable']`)
    this.coords = this.$parent.getCoords()
    this.col = this.$parent.data.col
    this.move = this.resizeCountOnMove.bind(this)
    this.up = this.resizingOnMouseUp.bind(this)
    this.$root.on('mousemove', this.move)
    this.$root.on('mouseup', this.up)
  }

  resizingOnMouseUp() {
    if (this.resizeType === 'col') {
      this.$root.findAll(`[data-col='${this.col}']`)
          .forEach(el => {
            $(el).css({width: this.value + 'px'})
          })
      this.$target.css({
        height: 'auto',
        opacity: 0,
      })
    } else {
      this.$parent.css({height: this.value + 'px'})
      this.$target.css({
        width: 'auto',
        opacity: 0,
      })
    }
    this.$root.off('mousemove', this.move)
    this.$root.off('mouseup', this.up)
  }
  resizeCountOnMove(e) {
    if (this.resizeType === 'col') {
      const delta = e.pageX - this.coords.right
      this.value = delta + this.coords.width
      this.$target.css({
        height: '1000vh',
        opacity: 1,
        left: this.value + 'px',
      })
    } else {
      const delta = e.pageY - this.coords.bottom
      this.value = delta + this.coords.height
      this.$target.css({
        width: '1000vw',
        opacity: 1,
        top: this.value + 'px',
      })
    }
  }
}

export function resizeHandler($root, $target) {
  return new TableResize($root, $target)
}
