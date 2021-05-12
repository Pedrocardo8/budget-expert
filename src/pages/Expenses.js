import React from 'react'
import {
    Container,Row,Col
  } from "react-bootstrap"
import AllAdded from '../components/LastAdded/AllAdded';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const data = [
    {
      subject: "Shopping",
      A: 120,
      B: 110,
      fullMark: 150
    },
    {
      subject: "House",
      A: 98,
      B: 130,
      fullMark: 150
    },
    {
      subject: "Invests",
      A: 86,
      B: 130,
      fullMark: 150
    },
    {
      subject: "Salary",
      A: 99,
      B: 100,
      fullMark: 150
    },
    {
      subject: "Food",
      A: 85,
      B: 90,
      fullMark: 150
    }
  ];

function Expenses() {
    return (
        <div className='dash'>
            <Container>
                <h1>All Transactions</h1>
                <Row>
                 <Col md="auto" >
                <RadarChart
                    cx={300}
                    cy={250}
                    outerRadius={150}
                    width={500}
                    height={500}
                    data={data}
                    >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar
                        dataKey="A"
                        stroke="#0a2963"
                        fill="#3dadff"
                        fillOpacity={0.6}
                    />
                </RadarChart>
                </Col>
                </Row>
                <AllAdded />
            </Container>
                                  
        </div>
    )
}

export default Expenses
