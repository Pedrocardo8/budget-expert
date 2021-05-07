import React , { useEffect, useState } from 'react';
import BudgetLine from './BudgetLine';
import firebase from '../../firebase';

export const BudgetList = () => {
    const[budgets, setBudgets] = useState([]);

    useEffect(() => {
        var user = firebase.auth().currentUser;
        const ref = firebase.firestore().collection("budgets").where("userId", "==", user.uid)        
        ref.onSnapshot((querySnapchot) => {
            const items = [];
            querySnapchot.forEach((doc) => {
                items.push(doc.data())
            });
            setBudgets(items);
            console.log(budgets)
        })

    }, []);



    return(
        <div>
            <h2>Budgets</h2>
            {budgets.map(budget => (<BudgetLine key={budget.id} budget={budget} />))}
        </div>
    )
}


export default BudgetList;
