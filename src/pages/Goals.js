import React, { useState, useEffect } from 'react'
import {
    Container,
    Row
  } from "react-bootstrap"
import '../App.css';
import AddGoal from '../components/Goals/AddGoal';
import GoalList from '../components/Goals/GoalList';
import firebase from '../firebase';
import { useAuth } from '../context/AuthContext';


function Goals() {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(false);
    const { currentUser, logout } = useAuth()

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
    }, [goals, setGoals]);



    return (
        <div className='dash'>
            <Container>
                <AddGoal />
                <Container>
                    <GoalList />
                </Container>                    
            </Container>
        </div>
    )
}

export default Goals
