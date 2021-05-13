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
