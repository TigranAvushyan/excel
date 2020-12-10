// Pure functions
export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function letterGenerator(
    number,
    firstArr = null,
    lastArr = [''],
    index = 0) {
  const res = []
  if (!firstArr) {
    const n = number > 26 ? 26 : number
    firstArr = new Array(n).fill('').map(toChar)
  }
  for (const first of firstArr) {
    for (const last of lastArr) {
      if (index === number) return res
      index++
      res.push(`${first + last}`)
    }
  }
  res.push(...letterGenerator(number, firstArr, res, index))
  return res
}


function toChar(_, index) {
  return String.fromCharCode(65 + index)
}
