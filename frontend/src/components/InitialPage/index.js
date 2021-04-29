import React from 'react'
import { Container } from './styles';

export default function InitialPage() {
  return (
    <Container>
      <h1>Your Databases</h1>
      <ul>
        <li style={{backgroundColor:"#A9A9A9"}}>
          DB1
        </li>
        <li style={{backgroundColor:"#DCDCDC"}}>
          DB2
        </li>
      </ul>
    </Container>
  )
}
