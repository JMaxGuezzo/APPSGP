import React, { useState } from 'react';

import { Modal, 
    ModalBody, 
    ModalFooter, 
    ModalHeader, 
    Row, 
    Button,
    Form, Input, Col, Label} from 'reactstrap';
    import api from './api.js';
    import grupoCampos from './campos';
    import Swal from 'sweetalert2';

export default function ModalCidade({ history, match }) {
  const [modal, setModal] = useState(true);
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [estadoid, setEstadoId] = useState('');
  const [estadonome, setEstadoNome] = useState('');
  const [estado, setEstado] = useState([]);

  const toggle = () => setModal(!modal, history.push('/listagem/cidade/'));

  async function componentDidMount() {
    const Parametro = match.params.Id;
    if (match.params.Id != null) {
      const response = await api.get('/api/cidade/' + Parametro);
      setId(response.data.id);
      setNome(response.data.nome);
      setEstadoId(response.data.estadoId);
    }
    await api.get('/api/estado/')
      .then(response => {
        const { data } = response;
        setEstado(data)
      })

  };

  async function PesquisaEstado() {
    await api.get('/api/estado/' + estadoid)
      .then(response => {
        const { data } = response;
        setEstadoNome(data.nome)

      })
  }
  
  PesquisaEstado();

  async function componentAll() {
    if (match.params.Id != null) {
      const responseAlter = await api.put('/api/cidade/' + id, {
        id,
        nome,
        estadoId: estadoid,
      })
      if (responseAlter.status === 200) {
        Swal.fire('Sucesso!!',
          '<strong>Status: </strong>' + responseAlter.status +
          ' <br> Cidade alterada com sucesso', 'success');
        toggle();
        toggle();
      }
    } else {
      const responseAdd = await api.post('/api/cidade/' + id, {
        id,
        nome,
        estadoId: estadoid
      })

      if (responseAdd.status === 201) {
        Swal.fire('Sucesso!!',
          '<strong>Status: </strong>' + responseAdd.status +
          ' <br> Cidade Cadastrada com sucesso', 'success');
        toggle();
        toggle();
      }
}
  }

  return (
    <Modal size="xl" onEnter={function () { componentDidMount(); }} isOpen={modal} toggle={toggle} >
      <ModalHeader toggle={toggle}>Cidade</ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            {grupoCampos(true, "3", "ID", "text", "ID", id, event => setId(event.target.value))}
            {grupoCampos(false, "5", "Cidade", "text", "Nome da Cidade", nome, event => setNome(event.target.value))}
            <Col xs="8">
              <Label>Estado</Label>
              <Input type="select" name="select" onChange={event => setEstadoId(event.target.value)}>
                <option value={estadoid}>{estadonome}</option>
                {estado.map(list => (
                  <option key={list.id} value={list.id}>
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
