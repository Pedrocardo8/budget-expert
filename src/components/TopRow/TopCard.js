import React, { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function TopCard({titulo,balanco}){    
    return(
        <Col className='border rounded bg-primary'>
            <p className='totals'>{titulo}</p>
            <p className='totals' >{balanco}€</p>
      </Col>
    );
};

export default TopCard;