import React from 'react'
import Header from './Header';
import {Container, SidebarContainer, GraphContainer}  from './styles';
import DepGraph from './DepGraph';

export default function Home() {
  return (
    <div>
      <Header />
      <Container>
        <SidebarContainer>
          <ul>
          <li>User Dependencies</li>
          
          <li>Table Dependencies <br/> (Foreign Key)</li>
          </ul>
        </SidebarContainer>

        <GraphContainer>
          <DepGraph />
        </GraphContainer>
      </Container>
    </div>
  )
  
}
