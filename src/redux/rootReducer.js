export function rootReducer(state, action) {
  const prevState = state
  switch (action.type) {
    case 'TABLE_RESIZE':
      const tr = prevState.tableResize
      const rt = action.data.type
      tr[rt][action.data.id] = action.data.value
      return {...state, tableResize: tr}
    case 'SELECT':
      return {...state, selectedId: action.value}
    case 'CHANGE_TEXT':
      const cellData = prevState.cellData
      Object.assign(cellData, action.data)
      return {...state, cellData}
  }
  return state
}
