import React, { useState } from 'react'
import Header from './Header';
import {Container, SidebarContainer, GraphContainer, SideBarListItem}  from './styles';
import TableDepGraph from './TableDepGraph';

export default function Home(props) {
  const [tbDepView, setTbDepView] = useState(false);
  const [usDepView, setUsDepView] = useState(false);

  const handleTbDepClick = () => {
    setUsDepView(false);
    setTbDepView(true);
  };
  const handleUsDepClick = () => {
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
          {
            tbDepView ? <TableDepGraph /> :
            usDepView ? <h1>UserDependencies</h1> : null
          }
        </GraphContainer>
      </Container>
    </div>
  )
  
}
