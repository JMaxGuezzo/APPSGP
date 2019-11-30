import React, { useState } from 'react';
import { Modal, 
    ModalBody, 
    ModalFooter, 
    ModalHeader, 
    Row, 
    Button,
    Form,} from 'reactstrap';
    import api from './api';
    import grupoCampos from './campos';
    import Swal from 'sweetalert2';

    export default function ModalCeb ({history, match}){  
    const [modal, setModal] = useState(true);
    const [id, setId] = useState(''); 
    const [nome, setNome] = useState('');  
    
     const toggle = () => setModal(!modal, history.push('/listagem/ceb/') );

     async function componentDidMount() { 
      const Parametro = match.params.Id;
      if(match.params.Id != null){
      const response = await api.get('/api/ceb/'+ Parametro);
      setId(response.data.id);
      setNome(response.data.nome);
      } 
      }; 

    async function componentAll () {
      if(match.params.Id != null){
        const responseAlter = await api.put('/api/ceb/'+ id,{
          id,
          nome,
    })
    if(responseAlter.status === 200){
      Swal.fire('Sucesso!!',
          '<strong>Status: </strong>' + responseAlter.status +
          ' <br> Ceb alterada com sucesso', 'success');
        toggle();
      toggle();
    }
  }else{
    const responseAdd =  await api.post('/api/ceb/'+ id,{
      nome,
  })
  if(responseAdd.status === 201){
    Swal.fire('Sucesso!!',
          '<strong>Status: </strong>' + responseAdd.status +
          ' <br> Ceb alterada com sucesso', 'success');
        toggle();
    toggle();
  }
}
}
    return(
      <Modal size="xl" onEnter={function (){componentDidMount();}} isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Ceb</ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                {grupoCampos(true,"1","ID", "text", "ID", id, event => setId(event.target.value))}
                {grupoCampos(false,"3", "Ceb", "text","Nome Ceb ", nome, event => setNome(event.target.value))}  
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={componentAll}>Salvar</Button>
          </ModalFooter>
      </Modal>
    );
}
