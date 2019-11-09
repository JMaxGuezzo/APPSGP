import React, { useState } from 'react';
import { Modal, 
    ModalBody, 
    ModalFooter, 
    ModalHeader, 
    Row, 
    Button,
    Form,} from 'reactstrap';
    import api from './api';
    import grupoCampos from './campos'

    export default function ModalTipoPessoa ({history, match}){  
    const [modal, setModal] = useState(true);
    const [id, setId] = useState(''); 
    const [nome, setNome] = useState(''); 
    
     const toggle = () => setModal(!modal, history.push('/listagem/tipopessoa/') );

     async function componentDidMount() { 
      const Parametro = match.params.Id;
      if(match.params.Id != null){
      const response = await api.get('/api/tipopessoa/'+ Parametro);
      setId(response.data.id);
      setNome(response.data.nome);
      } 
      }; 

    async function componentAll () {
      if(match.params.Id != null){
        const responseAlter = await api.put('/api/tipopessoa/'+ id,{
          id,
          nome,
    })
    if(responseAlter.status === 200){
      alert("Tipo de Pessoa Alterado Com Sucesso");
      toggle();
    }
  }else{
    const responseAdd =  await api.post('/api/tipopessoa/'+ id,{
      id,
      nome,
  })
  if(responseAdd.status === 201){
    alert("Tipo de Pessoa Cadastrada com Sucesso.");
    toggle();
  }
}
}
    return(
      <Modal size="xl" onEnter={function (){componentDidMount();}} isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Tipo de Pessoa</ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                {grupoCampos(true,"1","ID", "text", "ID", id, event => setId(event.target.value))}
                {grupoCampos(false,"3", "Tipo Pessoa", "text", "Tipo de Pessoa", nome, event => setNome(event.target.value))}
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={componentAll}>Salvar</Button>
          </ModalFooter>
      </Modal>
    );
}
