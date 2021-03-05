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

export function storage(key, data) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  } localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}


/**
 * @param name
 * @param key
 * @param f
 * @returns if has key => object; else f
 */
export function hasKey(key, name, f = false) {
  if (Object.keys(key).indexOf(name) > -1) {
    return key[name]
  } return f
}

export function toSentence(...words) {
  return words.reduce((a, c) => a + c )
}

export function toggle(a) {
  return !a
}
