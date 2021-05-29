import React from 'react'
import {Container} from "react-bootstrap"
import AllAdded from '../components/LastAdded/AllAdded';

function Expenses() {
    return (
        <div className='dash mt-5'>
            <Container>                
                <AllAdded />
            </Container>
                                  
        </div>
    )
}

export default Expenses
