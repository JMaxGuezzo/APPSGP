import React, { useState } from 'react';
import { Modal, 
    ModalBody, 
    ModalFooter, 
    ModalHeader, 
    Col, 
    Row, 
    Button,
    FormGroup,
    Label,
    Input,
    Form,} from 'reactstrap';
    
    import api from './api';

    export default function Modalfunc ({history, match}){
    const [fiels, setFiels] = useState('');    
    const [modal, setModal] = useState(true);

     const toggle = () => setModal(!modal, history.push('/cadastros/Fiel') );

     async function componentDidMount() { 
      const Parametro = match.params.Id;
      const response = await api.get('/api/pessoa/'+ Parametro);
      setFiels(response.data);
    }; 
    console.log(fiels.id)
    const Iput = (props) => {
        <div>
            {props.label && <Label>{props.label}</Label>}
            <input   
              placeholder= {props.placeholder}
              value={props.value}
              onChange={props.onChange}
              type={props.type || "text"}
            />
            </div>
        
    }
    return(
        <Modal onEnter= {function(){ componentDidMount();}} size="xl" isOpen={modal} toggle={toggle} >
                  <ModalHeader>Fiel</ModalHeader>
                  <ModalBody>
                  <Form>
                    <Row>
                    <Col xs="1">
                    <FormGroup>
                      <Iput
                        label={"ID"}
                        placeholder= {"ID"}
                        type={"text"}
                      />
                      </FormGroup>
                    </Col>
                    <Col xs="4">
                      <FormGroup>
                        <Label>Nome</Label>
                        <Input  disabled type="text" 
                        placeholder="Digite Seu Nome."
                        value={fiels.nome}/>
                      </FormGroup>
                    </Col>
                    <Col xs="2">
                      <FormGroup>
                        <Label>Data de Nascimento</Label>
                        <Input disabled type="text" 
                        placeholder="__/___/___"
                        value={fiels.datanasc}/>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Endereco</Label>
                        <Input disabled type="text" placeholder="Digite seu endereco"
                        value={fiels.endereco}/>
                      </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col xs="1">
                      <FormGroup>
                        <Label>Numero</Label>
                        <Input  disabled block type="text" placeholder="Nº"
                        value={fiels.numcasa}/>
                      </FormGroup>
                    </Col>
                    <Col xs="2">
                      <FormGroup>
                        <Label>Bairro</Label>
                        <Input disabled type="text" placeholder="Digite Seu bairro"
                        value={fiels.bairro}/>
                      </FormGroup>
                    </Col>
                    <Col xs="2">
                      <FormGroup>
                        <Label>Telefone</Label>
                        <Input  disabled type="text" placeholder="Digite seu telefone"
                        value={fiels.telefone}/>
                      </FormGroup>
                    </Col>
                    <Col xs="2">
                      <FormGroup>
                        <Label>Celular</Label>
                        <Input disabled type="text" placeholder="Digite o seu celular."
                        value={fiels.celular}/>
                      </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                      <FormGroup>
                        <Label>Complemento</Label>
                        <Input  disabled block type="text" placeholder="Digite um Complemento"
                        value={fiels.complemento}/>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>RG</Label>
                        <Input  disabled type="number" placeholder="Digite seu RG"
                        value={fiels.rg}/>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>CPF</Label>
                        <Input  disabled type="number" placeholder="Digite seu CPF"
                        value={fiels.cpf}/>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Situação</Label>
                        <Input  disabled type="text"  placeholder="Digite sua situação"
                        value={fiels.situacao}/>
                      </FormGroup>
                    </Col>
                    </Row>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={toggle}>Editar</Button>
                    <Button color="success" onClick={toggle}>Salvar</Button>
                    <Button color="secondary" onClick={toggle}>Fechar</Button>
                  </ModalFooter>
                </Modal>
    );
}
