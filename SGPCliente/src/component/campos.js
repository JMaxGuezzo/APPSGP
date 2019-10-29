import React from 'react';
import { 
    Col, 
    FormGroup,
    Label,
    Input,
    } from 'reactstrap';

function Campos (tamanho, label, type, placeholder, value, onChange){
    const Entradas = 
    <Col xs={tamanho}>
    <FormGroup >
      <Label>{label}</Label>
      <Input
        type={type} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}/>
        </FormGroup>
    </Col>
  return Entradas;
}

export default Campos;