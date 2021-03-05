import {storage} from '@core/utils'

const defaultState = {
  tableName: 'My Table',
  tableResize: {
    col: {},
    row: {},
  },
  selectedId: 'A1',
  cellData: {

  },
}

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState
