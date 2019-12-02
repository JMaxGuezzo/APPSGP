import React from 'react';
import { 
    Col, 
    FormGroup,
    Label,
    Input,
    } from 'reactstrap';

function Campos (ativo, tamanho, label, type, placeholder, value, onChange){
  const dasabilita = {disabled: ativo !== true ? false : true};
    const Entradas = 
    <Col xs={tamanho}>
    <FormGroup >
      <Label>{label}</Label>
      <Input {...dasabilita}
        type={type} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}/>
        </FormGroup>
    </Col>
  return Entradas;
}

export default Campos;