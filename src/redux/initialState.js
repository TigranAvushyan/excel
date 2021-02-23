import {storage} from '@core/utils'

const defaultState = {
  tableName: 'My Table',
  tableResize: {
    col: {},
    row: {},
  },
  selectedId: '',
  cellData: {
    A1: {
      value: '',
      formula: '',
    },
  },
}

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState
