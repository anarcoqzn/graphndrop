import React from 'react'
import { Container } from './styles'
import { Button } from '../Button';
import { Input } from '../Input';

export default function Login(props) {
  return (
    <Container>
      <span>LOGIN</span>
      <Input id="email" type="email" className="email" placeholder="EMAIL" />
      <Input id="password" type="password" className="password" placeholder="PASSWORD" />
      
      <div id="buttons">
        <Button color='royalblue' >LOGIN</Button>
        <Button color='coral' onClick={()=>props.history.push("/cadastro")}>CADASTRAR</Button>
      </div>
    </Container>
  )
}
