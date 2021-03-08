export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  const listeners = []
  return {
    dispatch(action) {
      state = rootReducer(state, action)
      listeners.forEach(listener => listener(state))
    },
    subscribe(fn) {
      listeners.push(fn)
      return {
        unsubscribe() {
          listeners.filter(l => l !== fn)
        },
      }
    },
    getState() {
      // IDK why, but this fixed bug
      return JSON.parse(JSON.stringify(state))
    },
  }
}
