export function rootReducer(state, action) {
  const prevState = state
  switch (action.type) {
    case 'TABLE_NAME':
      return {...state, tableName: action.data.value}
    case 'TABLE_RESIZE':
      const tr = prevState.tableResize
      const rt = action.data.type
      tr[rt][action.data.id] = action.data.value
      return {...state, tableResize: tr}
    case 'SELECT':
      return {...state, selectedId: action.value}
    case 'CELL_DATA':
      const cellData = prevState.cellData
      const cd = cellData[action.id] || {}
      cellData[action.id] = Object.assign(cd, action.data)
      return {...state, cellData}
  }
  return state
}
