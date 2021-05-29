import React , { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from "react-bootstrap"
import { useAuth } from '../../context/AuthContext'
import firebase from '../../firebase';


    function AddCategory(){
        // criar variáveis para usar no controlo
        const { currentUser } = useAuth()
        const [category, setCategory] = useState('');
        const [categories, setCategories] = useState([]);
        const [cat, setCat] = useState(false);
        const [deleteCategorie, setDeleteCategorie] = useState('');
        const [added, setAdded] = useState(false);
        const [deleted, setDeleted] = useState(false);

        // vai buscar todas as categorias adicionadas anteriormente
        useEffect(() => {
            var user = firebase.auth().currentUser;
            const ref = firebase.firestore().collection("categories").where("userId", "==", user.uid)
            ref.onSnapshot((querySnapchot) => {
                const items = [];
                querySnapchot.forEach((doc) => {
                    items.push(doc.data())
                });
                setCategories(items);
            })
        }, []);

        // adicionar nova categoria
        function addNewCategory(e){
            e.preventDefault()
            let x = true;
            setDeleted(false);
            setAdded(false);
            setCat(false);
            for(let i = 0; i < categories.length; i++) {
                if(categories[i].titulo === category){x = false;}
            };
            if(x && category !== ""){
                const db = firebase.firestore()
                db.collection("categories").add({
                    titulo:category,
                    userId: currentUser.uid
                })
                // repor valor inicial dos campos
                setCategory('')
                setAdded(true);
            }
            else {setCat(true);}
    }

    // eliminar categoria
    function deletCategory(e) {
        e.preventDefault();
        setAdded(false);
        setDeleted(false);
        const db = firebase.firestore()        
        db.collection("categories").where("titulo", "==", deleteCategorie).get()
        .then(querySnapshot => {
            querySnapshot.docs[0].ref.delete();
        });
        setDeleted(true);
        setDeleteCategorie('');
    }

    return(
        <div className='mt-1 mb-3'>
            <Row>
                <Col>
                    <Form onSubmit={addNewCategory} className="mt-3">
                        <h2 className='text-center title-dash'>Add new category</h2>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control type="text" value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" block >Add</Button>   
                        <span style={{ display: cat ? "block" : "none"}} className="error">Insert valid category name</span>
                        <span style={{ display: added ? "block" : "none"}} className="success">Success!</span>                                     
                    </Form>
                
                </Col>
                <Col>
                    <Form onSubmit={deletCategory} className="mt-3">
                        <h2 className='text-center title-dash'>Delete category</h2>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="select" value={deleteCategorie} onChange={(e) => setDeleteCategorie(e.target.value)}>
                            <option value="0">Choose...</option>
                            {categories.map(opt => (
                                <option value={opt.titulo}>{opt.titulo}</option>
                            ))}
                        </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" block >Delete</Button>  
                        <span style={{ display: deleted ? "block" : "none"}} className="success">Success!</span>                                      
                    </Form>
                
                </Col>
            </Row>
            
        </div>
    );
}

export default AddCategory;