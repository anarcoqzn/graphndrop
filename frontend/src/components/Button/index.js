import styled from 'styled-components';

export const Button = styled.button`
  height: 2.4vw;
  font-size: 1.2vw;
  align-items: center;
  font-weight: bolder;
  padding: 0.25em 1em;
  border: 1px solid ${props => props.color};
  border-radius: 5px;
  background-color: ${props=> props.chosen && props.id && props.id === props.chosen ? props.color : '#FFF'};
  color: ${props=> props.chosen && props.id && props.id === props.chosen ? 'white' : 'black'};
  cursor: pointer;
  transition: .3s;
  :hover {
    background-color: ${props => props.color};
    color: white;
  }
`;