import React , { useState, useContext } from 'react';
import { Form, Button } from "react-bootstrap"
import { useAuth } from '../../context/AuthContext'
import firebase from '../../firebase';


    function AddCategory(){
        const { currentUser, logout } = useAuth()
        const [category, setCategory] = useState('');
        function addNewCategory(e){
            e.preventDefault()
            const db = firebase.firestore()
            db.collection("categories").add({
                titulo:category,
                userId: currentUser.uid
            })
            setCategory('')
    }

    return(
        <div className='mt-5'>
            <Form onSubmit={addNewCategory}>
                <h2 className='text-center title-dash'>Add new category</h2>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" block >Add</Button>                                        
            </Form>
        </div>
    );
}

export default AddCategory;