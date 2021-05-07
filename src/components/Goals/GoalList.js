import React , { useEffect, useState } from 'react';
import GoalLine from './GoalLine';
import firebase from '../../firebase';

export const GoalList = () => {
    const[goals, setGoals] = useState([]);

    useEffect(() => {
        var user = firebase.auth().currentUser;
        const ref = firebase.firestore().collection("goals").where("userId", "==", user.uid)        
        ref.onSnapshot((querySnapchot) => {
            const items = [];
            querySnapchot.forEach((doc) => {
                items.push(doc.data())
            });
            setGoals(items);
            
        })

    }, []);



    return(
        <div>
            <h2>Goals</h2>
            {goals.map(goal => (<GoalLine key={goal.id} goal={goal} />))}

        </div>
    )
}


export default GoalList;
