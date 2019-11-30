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

export default function ModalLocalvisita({ history, match }) {
  const [modal, setModal] = useState(true);
  const [id, setId] = useState('');
  const [nomelocal, setNomelocal] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numcasa, setNumcasa] = useState('');
  const [bairro, setBairro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidadeid, setCidadeId] = useState('');
  const [cidadenome, setCidadeNome] = useState('');
  const [cidade, setCidade] = useState([]);

  const toggle = () => setModal(!modal, history.push('/listagem/localvisita/'));

  async function componentDidMount() {
    const Parametro = match.params.Id;
    if (match.params.Id != null) {
      const response = await api.get('/api/localvisita/' + Parametro);
      setId(response.data.id);
      setNomelocal(response.data.nomelocal);
      setEndereco(response.data.endereco);
      setNumcasa(response.data.numcasa);
      setBairro(response.data.bairro);
      setComplemento(response.data.complemento);
      setTelefone(response.data.telefone);
      setCidadeId(response.data.idcidade); 
    }
    await api.get('/api/cidade/')
      .then(response => {
        const { data } = response;
        setCidade(data)
      })
  };

  async function PesquisaCidade() {
    await api.get('/api/cidade/' + cidadeid)
      .then(response => {
        const { data } = response;
        setCidadeNome(data.nome)
      })
  }
  PesquisaCidade();

  async function componentAll() {
    if (match.params.Id != null) {
      const responseAlter = await api.put('/api/localvisita/' + id, {
        id,
        nomelocal,
        endereco,
        numcasa,
        bairro,
        complemento,
        telefone,
        idcidade: cidadeid,
      })
      if (responseAlter.status === 200) {
        Swal.fire('Sucesso!!',
          '<strong>Status: </strong>' + responseAlter.status +
          ' <br> Lolal alterado com sucesso', 'success');
        toggle();
        toggle();
      }
    } else {
      const responseAdd = await api.post('/api/localvisita/' + id, {
        id,
        nomelocal,
        endereco,
        numcasa,
        bairro,
        complemento,
        telefone,
        idcidade: cidadeid,
      })
      if (responseAdd.status === 201) {
        Swal.fire('Sucesso!!',
          '<strong>Status: </strong>' + responseAdd.status +
          ' <br> Local alterado com sucesso', 'success');
        toggle();
        toggle();
      }
    }
  }

  return (
    <Modal size="xl" onEnter={function () { componentDidMount(); }} isOpen={modal} toggle={toggle} >
      <ModalHeader toggle={toggle}>Local da Visita</ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            {grupoCampos(true, "2", "ID", "text", "ID", id, event => setId(event.target.value))}
            {grupoCampos(false, "5", "Local", "text", "Nome do Local", nomelocal, event => setNomelocal(event.target.value))}
            {grupoCampos(false, "4", "Endereco", "text", "Endereco do local", endereco, event => setEndereco(event.target.value))}
            {grupoCampos(false, "3", "Numero ", "text", "Numero", numcasa, event => setNumcasa(event.target.value))}
            {grupoCampos(false, "3", "bairro", "text", "Nome do Bairro", bairro, event => setBairro(event.target.value))}
            {grupoCampos(false, "3", "Complemento", "text", "Complemento", complemento, event => setComplemento(event.target.value))}
            {grupoCampos(false, "3", "Telefone", "text", "Telefone", telefone, event => setTelefone(event.target.value))}
           
            <Col xs="8">
              <Label>Cidade</Label>
              <Input type="select" name="select" onChange={event => setCidadeId(event.target.value)}>
                <option value={cidadeid}>{cidadenome}</option>
                {cidade.map(list => (
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
