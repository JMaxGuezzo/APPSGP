import React, { useState } from 'react';
import { Modal, 
    ModalBody, 
    ModalFooter, 
    ModalHeader, 
    Row, 
    Button,
    Form, Input, Col, Label} from 'reactstrap';
    import api from './api';
    import grupoCampos from './campos'

    export default function ModalCidade ({history, match}){  
    const [modal, setModal] = useState(true);
    const [id, setId] = useState(''); 
    const [nome, setNome] = useState('');
    const [estadoNome, setEstadoNome] = useState('');
    const [estado, setEstado] = useState([]);  
    
     const toggle = () => setModal(!modal, history.push('/listagem/cidade/') );

     async function componentDidMount() { 
      const Parametro = match.params.Id;
      if(match.params.Id != null){
      const response = await api.get('/api/cidade/'+ Parametro);
      setId(response.data.id);
      setNome(response.data.nome);
      setEstadoNome(response.data.cidadeestado);
      }
      await api.get('/api/estado/')
      .then(response => {
        const { data } = response;
          setEstado( data)
      })
      .catch(err => {
        console.warn(err);
        alert(err.message)
      })
      
      }; 
    async function componentAll () {
      if(match.params.Id != null){
        const responseAlter = await api.put('/api/cidade/'+ id,{
          id,
          nome,
    })
    if(responseAlter.status === 200){
      alert("Cidade Alterada Com Sucesso");
      toggle();
    }
  }else{
    const responseAdd =  await api.post('/api/cidade/'+ id,{
      id,
      nome,
  })
  if(responseAdd.status === 201){
    alert("Cidade Cadastrada com Sucesso.");
    toggle();
  }
}
}
const handleChange = (event) => {
 const Event =  event => setEstadoNome(event.target.value);
 return Event;
}
    return(
      <Modal size="sm" onEnter={function (){componentDidMount();}} isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Estado</ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                {grupoCampos("3","ID", "text", "ID", id, event => setId(event.target.value))}
                {grupoCampos("5", "Cidade", "text", "Nome da Cidade", nome, event => setNome(event.target.value))}  
                <Col xs="8">
                <Label>Estado</Label>
                <Input type="select" name="select" onChange={handleChange()}>
                  {estado.map(list =>(
                    <option value={list.id}>
                      {list.nome}
                      </option>
                  ))}
                </Input>
                </Col>
                </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={componentAll}>Salvar</Button>
          </ModalFooter>
      </Modal>
    );
}
