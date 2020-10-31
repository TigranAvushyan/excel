import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {$} from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown'],
        })
    }

    toHTML() {
        return createTable(20)
    }

    onMousedown(event) {
        const $target = $(event.target)
        const resizeType = $target.data.resize
        if (resizeType) {
            const $root = this.$root.$el
            const $parent = $target.closest(`[data-type='resizable']`)
            const coords = $parent.getCoords()
            const letter = $parent.data.letter
            let value
            document.onmousemove = e => {
                if (resizeType === 'col') {
                    const delta = e.pageX - coords.right
                    value = delta + coords.width
                    $target.css({
                        height: '1000vh',
                        opacity: 1,
                        left: value + 'px',
                    })
                } else {
                    const delta = e.pageY - coords.bottom
                    value = delta + coords.height
                    $target.css({
                        width: '1000vw',
                        opacity: 1,
                        top: value + 'px',
                    })
                }
            }

            document.onmouseup = () => {
                if (resizeType === 'col') {
                    $root.querySelectorAll(`[data-letter='${letter}']`)
                        .forEach(el => {
                            $(el).css({width: value + 'px'})
                        })
                    $target.css({
                        height: 'auto',
                        opacity: 0,
                    })
                } else {
                    $parent.css({height: value + 'px'})
                    $target.css({
                        width: 'auto',
                        opacity: 0,
                    })
                }
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    }
}
