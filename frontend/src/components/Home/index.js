import React, { useState } from 'react'
import Header from './Header';
import {Container, SidebarContainer, GraphContainer, SideBarListItem}  from './styles';
import DepGraph from './DepGraph';
import graphTypesConstants from '../../services/constants/graphTypeConstants';

export default function Home(props) {
  const [tbDepView, setTbDepView] = useState(false);
  const [usDepView, setUsDepView] = useState(false);
  const [typeGraph, setTypeGraph] = useState('');

  const handleTbDepClick = () => {
    setTypeGraph(graphTypesConstants.tableDependencies);
    setUsDepView(false);
    setTbDepView(true);
  };
  const handleUsDepClick = () => {
    setTypeGraph(graphTypesConstants.userDependencies);
    setTbDepView(false);
    setUsDepView(true);
  };

  return (
    <div>
      <Header props={props}/>
      <Container>
        <SidebarContainer>
          <ul>
          <SideBarListItem id="usDepBtn" selected={usDepView} onClick={handleUsDepClick}>User Dependencies</SideBarListItem>
          
          <SideBarListItem id="tbDepBtn" selected={tbDepView} onClick={handleTbDepClick}>Table Dependencies <br/> (Foreign Key)</SideBarListItem>
          </ul>
        </SidebarContainer>

        <GraphContainer>
          <DepGraph type={typeGraph}/>
        </GraphContainer>
      </Container>
    </div>
  )
  
}
