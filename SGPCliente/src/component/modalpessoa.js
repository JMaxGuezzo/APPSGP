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
    const [modal, setModal] = useState(true);
    const [id, setId] = useState(''); 
    const [nome, setNome] = useState(''); 
    const [datanasc, setDatanasc] = useState(''); 
    const [endereco, setEndereco] = useState(''); 
    const [numero, setNumero] = useState(''); 
    const [bairro, setBairro] = useState(''); 
    const [telefone, setTelefone] = useState(''); 
    const [celular, setCelular] = useState(''); 
    const [complemento, setComplemento] = useState(''); 
    const [rg, setRg] = useState(''); 
    const [cpf, setCpf] = useState(''); 
    const [situacao, setSituacao] = useState(''); 

     const toggle = () => setModal(!modal, history.push('/cadastros/Fiel') );

     async function componentDidMount() { 
      const Parametro = match.params.Id;
      const response = await api.get('/api/pessoa/'+ Parametro);
      setId(response.data.id);
      setNome(response.data.nome);
      setDatanasc(response.data.datanasc);
      setEndereco(response.data.endereco);
      setNumero(response.data.numcasa);
      setBairro(response.data.bairro);
      setTelefone(response.data.telefone);
      setCelular(response.data.celular);
      setComplemento(response.data.complemento);
      setRg(response.data.rg);
      setCpf(response.data.cpf);
      setSituacao(response.data.situacao);
    }; 
     const componentAdd = ()=> {
      // await api.get('/api/pessoa/'+ id,{
      //   id,
      //   nome,
        console.log("Componente Funcionando");
      }

    function Event(Atributo){
      const atributo = event => Atributo(event.target.value)
      return atributo;
    }


    return(
        <Modal size="xl" onEnter={function (){componentDidMount();}} isOpen={modal} toggle={toggle} >
                  <ModalHeader>Fiel</ModalHeader>
                  <ModalBody>
                  <Form>
                    <Row>
                    <Col xs="1">
                    <FormGroup >
                        <Label>ID</Label>
                        <Input
                        type="text" 
                        placeholder="ID"
                        value={id}
                        onChange={Event(setId)}/>
                      </FormGroup>
                    </Col>
                    <Col xs="3">
                      <FormGroup>
                        <Label>Nome</Label>
                        <Input type="text" 
                        placeholder="Digite Seu Nome."
                        value={nome}
                        onChange={Event(setNome)}/>
                      </FormGroup>
                    </Col>
                    <Col xs="2">
                      <FormGroup>
                        <Label>Data de Nascimento</Label>
                        <Input type="date" 
                        placeholder="date placeholder"
                        value={datanasc}/>
                      </FormGroup>
                    </Col>
                    <Col xs="2">
                      <FormGroup>
                        <Label>Telefone</Label>
                        <Input  type="text" placeholder="Digite seu telefone"
                        value={telefone}/>
                      </FormGroup>
                    </Col>
                    <Col xs="2">
                      <FormGroup>
                        <Label>Celular</Label>
                        <Input type="text" placeholder="Digite o seu celular."
                        value={celular}/>
                      </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col xs="4">
                      <FormGroup>
                        <Label>Endereco</Label>
                        <Input type="text" placeholder="Digite seu endereco"
                        value={endereco}/>
                      </FormGroup>
                    </Col>
                    <Col xs="1">
                      <FormGroup>
                        <Label>Numero</Label>
                        <Input type="text" placeholder="Nº"
                        value={numero}/>
                      </FormGroup>
                    </Col>
                    <Col xs="2">
                      <FormGroup>
                        <Label>Bairro</Label>
                        <Input type="text" placeholder="Digite Seu bairro"
                        value={bairro}/>
                      </FormGroup>
                    </Col>
                    <Col xs="3">
                      <FormGroup>
                        <Label>Complemento</Label>
                        <Input type="text" placeholder="Digite um Complemento"
                        value={complemento}/>
                      </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col xs="3">
                      <FormGroup>
                        <Label>RG</Label>
                        <Input  type="number" placeholder="Digite seu RG"
                        value={rg}/>
                      </FormGroup>
                    </Col>
                    <Col xs="3">
                      <FormGroup>
                        <Label>CPF</Label>
                        <Input type="number" placeholder="Digite seu CPF"
                        value={cpf}/>
                      </FormGroup>
                    </Col>
                    <Col xs="2">
                      <FormGroup>
                        <Label>Situação</Label>
                        <Input  type="text"  placeholder="Digite sua situação"
                        value={situacao === "A" ? "Ativo" : "Inativo"}/>
                      </FormGroup>
                    </Col>
                    </Row>
                    <FormGroup>
                  </FormGroup>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={componentAdd}>Editar</Button>
                    <Button color="success" onClick={toggle}>Salvar</Button>
                    <Button color="secondary" onClick={toggle}>Fechar</Button>
                  </ModalFooter>
                </Modal>
    );
}
