import React , { createContext, useReducer} from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
import firebase from '../firebase';
//Initial state
const initialState = {
    transactions:  [],
    currentUser: null,
    error: null,
    loading: true,         
    budgets: [
        { id: 1, category:'House', amount: 200 , progress : 40},
        { id: 2, category:'Home', amount: 150 , progress : 110}
    ]
}


// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] =  useReducer(AppReducer, initialState);
    

    // Actions
    async function getTransactions() {
      
    }
    async function addTransaction(transaction) {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
    
        try {
          const res = await axios.post('http://localhost:5000/api/budget/add', transaction, config);
    
          dispatch({
            type: 'ADD_TRANSACTION',
            payload: res.data.data
          });
        } catch (err) {
          dispatch({
            type: 'TRANSACTION_ERROR',
            payload: err.response.data.error
          });
        }
      }
    
    function addBudget(budget) {
        dispatch({
            type: 'ADD_BUDGET',
            payload: budget
        });
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        currentUser: state.currentUser,
        error: state.error,
        loading: state.loading,
        getTransactions,
        addTransaction,
        budgets: state.budgets,
        addBudget,
    }}>
        {children}
    </GlobalContext.Provider>);
}