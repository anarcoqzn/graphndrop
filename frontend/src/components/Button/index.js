import styled from 'styled-components';

export const Button = styled.button`
  height: 2.4vw;
  font-size: 1.2vw;
  align-items: center;
  font-weight: bolder;
  padding: 0.25em 1em;
  border: 1px solid ${props => props.color};
  border-radius: 5px;
  background: ${props => (props.chosen && (props.id === props.chosen || props.chosen.includes(props.id))) ? props.color : "transparent"};
  color: ${props => (props.chosen && (props.id === props.chosen || props.chosen.includes(props.id))) ? 'white':'black'};
  cursor: pointer;
  :hover {
    background: ${props => props.color};
    color:white;
    transition: .3s;
  }
`;