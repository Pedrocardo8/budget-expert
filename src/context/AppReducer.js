const AppReducer = (state, action) => {
    switch(action.type) {
        case 'GET_TRANSACTIONS':
            return {
              ...state,
              loading: false,
              transactions: action.payload
            }
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
            }
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [action.payload, ...state.transactions]
            }
        case 'ADD_BUDGET':
                return {
                    ...state,
                    budgets: [action.payload, ...state.budgets]
                }
        default:
            return state;
    }
}

export default AppReducer;