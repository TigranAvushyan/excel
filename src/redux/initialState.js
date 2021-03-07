import {storage} from '@core/utils'

const defaultState = {
  lastDate: '',
  tableName: 'My Table',
  tableResize: {
    col: {},
    row: {},
  },
  selectedId: 'A1',
  cellData: {

  },
}

export const initialState = url => {
  return storage(`excel/${url}`)
      ? storage(`excel/${url}`)
      : defaultState
}

