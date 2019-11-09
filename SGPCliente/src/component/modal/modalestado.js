import React, { useState } from 'react';

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Button,
  Form,
} from 'reactstrap';
import Swal from 'sweetalert2';
import api from './api';
import grupoCampos from './campos'

export default function ModalEstado({ history, match }) {
  const [modal, setModal] = useState(true);
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');

  const toggle = () => setModal(!modal, history.push('/listagem/estado/'));

  async function componentDidMount() {
    const Parametro = match.params.Id;
    if (match.params.Id != null) {
      const response = await api.get('/api/estado/' + Parametro);
      setId(response.data.id);
      setNome(response.data.nome);
      setSigla(response.data.sigla);
    }
  };

  async function componentAll() {
    if (match.params.Id != null) {
      const responseAlter = await api.put('/api/estado/' + id, {
        id,
        nome,
        sigla,
      })
      if (responseAlter.status === 200) {
        Swal.fire('Sucesso!!',
          '<strong>Status: </strong>' + responseAlter.status +
          ' <br> Estado alterado com sucesso', 'success');
        toggle();

      } else {
        Swal.fire('Algo de Errado', 'Erro :' + responseAlter.status, 'error');
      }
    } else {
      const responseAdd = await api.post('/api/estado/' + id, {
        id,
        nome,
        sigla,
      })
      if (responseAdd.status === 201) {
        Swal.fire('Sucesso!!', 'Estado cadastrado com sucesso', 'success');
        toggle();
      }
    }
  }
  return (
    <Modal size="xl" onEnter={function () { componentDidMount(); }} isOpen={modal} toggle={toggle} >
      <ModalHeader toggle={toggle}>Estado</ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            {grupoCampos(true, "1", "ID", "text", "ID", id, event => setId(event.target.value))}
            {grupoCampos(false, "3", "Estado", "text", "Nome Estado", nome, event => setNome(event.target.value))}
            {grupoCampos(false, "1", "Sigla", "text", "Sigla", sigla, event => setSigla(event.target.value))}
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={componentAll}>Salvar</Button>
      </ModalFooter>
    </Modal>
  );
}
