import React, { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Button,
  Form, Input, Col, Label
} from 'reactstrap';
import api from './api';
import grupoCampos from './campos';
import Swal from 'sweetalert2';

export default function ModalComunidade({ history, match }) {
  const [modal, setModal] = useState(true);
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cebid, setCebId] = useState('');
  const [cebnome, setCebNome] = useState('');
  const [ceb, setCeb] = useState([]);

  const toggle = () => setModal(!modal, history.push('/listagem/comunidade/'));

  async function componentDidMount() {
    const Parametro = match.params.Id;
    if (match.params.Id != null) {
      const response = await api.get('/api/comunidade/' + Parametro);
      setId(response.data.id);
      setNome(response.data.nome);
      setCebId(response.data.idceb);
    }
    await api.get('/api/ceb/')
      .then(response => {
        const { data } = response;
        setCeb(data)
      })

  };

  async function PesquisaCeb() {
    await api.get('/api/ceb/' + cebid)
      .then(response => {
        const { data } = response;
        setCebNome(data.nome)

      })
  }
  PesquisaCeb();

  async function componentAll() {
    if (match.params.Id != null) {
      const responseAlter = await api.put('/api/comunidade/' + id, {
        id,
        nome,
        idceb: cebid,
      })
      if (responseAlter.status === 200) {
        Swal.fire('Sucesso!!',
          '<strong>Status: </strong>' + responseAlter.status +
          ' <br> Comunidade alterada com sucesso', 'success');
        toggle();
        toggle();
      }
    } else {
      const responseAdd = await api.post('/api/comunidade/' + id, {
        id,
        nome,
        idceb: cebid
      })
      if (responseAdd.status === 201) {
        Swal.fire('Sucesso!!',
          '<strong>Status: </strong>' + responseAdd.status +
          ' <br> Comunidade cadastrada com sucesso', 'success');
        toggle();
        toggle();
      }
    }
  }

  return (
    <Modal size="xl" onEnter={function () { componentDidMount(); }} isOpen={modal} toggle={toggle} >
      <ModalHeader toggle={toggle}>Comunidade</ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            {grupoCampos(true, "3", "ID", "text", "ID", id, event => setId(event.target.value))}
            {grupoCampos(false, "5", "Comunidade", "text", "Nome da Comunidade", nome, event => setNome(event.target.value))}
            <Col xs="8">
              <Label>Cebs</Label>
              <Input type="select" name="select" onChange={event => setCebId(event.target.value)}>
                <option value={cebid}>{cebnome}</option>
                {ceb.map(list => (
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
