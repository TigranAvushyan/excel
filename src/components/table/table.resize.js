import {$} from '@core/dom';

let $target,
  $root,
  resizeType,
  $parent,
  coords,
  col,
  row,
  value = 0,
  res
const resizeData = {}

function resizingOnMouseUp() {
  if (resizeType === 'col') {
    resizeData.type = 'col'
    resizeData.id = col
    $root.findAll(`[data-col='${col}']`)
        .forEach(el => {
          $(el).css({width: value + 'px'})
        })
    $target.css({
      height: 'auto',
      opacity: 0,
    })
  } else {
    resizeData.type = 'row'
    resizeData.id = row
    $parent.css({height: value + 'px'})
    $target.css({
      width: 'auto',
      opacity: 0,
    })
  }

  res(resizeData)

  resizeData.value = value
  $root.off('mousemove', resizeCountOnMove)
  $root.off('mouseup', resizingOnMouseUp)
}

function resizeCountOnMove(e) {
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


export function resizeHandler(root, target) {
  return new Promise(resolve => {
    res = resolve
    $root = root
    $target = target
    resizeType = $target.data.resize
    $parent = $target.closest(`[data-type='resizable']`)
    coords = $parent.getCoords()
    col = $parent.data.col
    row = $parent.data.row

    $root.on('mousemove', resizeCountOnMove)
    $root.on('mouseup', resizingOnMouseUp)
  })
}
