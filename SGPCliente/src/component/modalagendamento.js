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
import Tipoagendamento from '../pages/Tipoagendamento';

export default function ModalLocalvisita({ history, match }) {
  const [modal, setModal] = useState(true);
  const [idagendamento, setIdagendamento] = useState('');

  const [nomeagendalocal, setNomeagendalocal] = useState('');
  const [enderecoagenda, setEnderecoagenda] = useState('');
  const [numlocalagenda, setNumlocalagenda] = useState('');
  const [bairroagenda, setBairroagenda] = useState('');

  const [nomepessoa, setNomepessoa] = useState('');
  const [telefonepessoa, setTelefonepessoa] = useState('');

  const [nometipo, setNometipo] = useState('');



  const toggle = () => setModal(!modal, history.push('/listagem/localvisita/'));

  async function componentDidMount() {
    const Parametro = match.params.Id;
    if (match.params.Id != null) {
      const response = await api.get('/api/agendamento/' + Parametro);
      console.log(response);
      setIdagendamento(response.data.id);
      setNomeagendalocal(response.data.agendalocal.nomelocal);
      setEnderecoagenda(response.data.agendalocal.endereco);
      setNumlocalagenda(response.data.agendalocal.numcasa);
      setBairroagenda(response.data.agendalocal.bairro);
      setNomepessoa(response.data.agendapessoa.nome);
      setTelefonepessoa(response.data.agendapessoa.telefone);
      setNometipo(response.data.agendatipo.nome); 
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
        alert("Local Alterado Com Sucesso");
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
        alert("local Cadastrado com Sucesso.");
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
            {grupoCampos(true, "2", "ID", "text", "ID", id, event => setIdagendamento(event.target.value))}
            {grupoCampos(false, "5", "Local", "text", "Nome do Local", nomeagendalocal, event => setNomeagendalocal(event.target.value))}
            {grupoCampos(false, "4", "Endereco", "text", "Endereco do local", enderecoagenda, event => setEnderecoagenda(event.target.value))}
            {grupoCampos(false, "3", "Numero ", "text", "Numero", numlocalagenda, event => setNumlocalagenda(event.target.value))}
            {grupoCampos(false, "3", "bairro", "text", "Nome do Bairro", bairroagenda, event => setBairroagenda(event.target.value))}
            {grupoCampos(false, "3", "Complemento", "text", "Complemento", nomepessoa, event => setNomepessoa(event.target.value))}
            {grupoCampos(false, "3", "Telefone", "text", "Telefone", nometipo, event => setNometipo(event.target.value))}
           
           
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
        <Button color="success">Salvar</Button>
      </ModalFooter>
    </Modal>
  );
}
