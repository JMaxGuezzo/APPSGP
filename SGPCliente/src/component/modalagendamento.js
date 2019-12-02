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
import Swal from 'sweetalert2';

export default function ModalAgendamento({ history, match }) {
  const [modal, setModal] = useState(true);
  const [idagendamento, setIDagendamento] = useState('');
  const [descricao, setdescricao] = useState('');
  const [idsacerdote, setIDsacerdote] = useState('');


  const [idpessoa, setIDPessoa] = useState('');
  const [idlocalvisita, setIDlocalvisita] = useState('');
  const [idtipoagendamento, setIDTipoAgendamento] = useState('');

  const [nomeAgendaPessoa, setnomeAgendaPessoa] = useState('');
  const [telefoneAgendaPessoa, settelefoneAgendaPessoa] = useState('');

  const [nomeLocalAgendaLocal, setnomeLocalAgendaLocal] = useState('');
  const [enderecoAgendaLocal, setenderecoAgendaLocal] = useState('');
  const [bairroAgendaLocal, setbairroAgendaLocal] = useState('');
  const [numCasaAgendaLocal, setnumCasaAgendaLocal] = useState('');

  const [nomeAgendaTipo, setnomeAgendaTipo] = useState('');

  const [nomepessoa, setnomepessoa] = useState('');
  const [nomelocalvisita, setnomelocalvisita] = useState('');
  const [nometipoAgendamento, setnometipoAgendamento] = useState('');

  const [allpessoa, setallpessoa] = useState([]);
  const [alllocalvisita, setalllocalvisita] = useState([]);
  const [alltipoAgendamento, setalltipoAgendamento] = useState([]);








  const toggle = () => setModal(!modal, history.push('/listagem/agendamento/'));

  async function componentDidMount() {
    var pessoa;
    var localvisita; 
    var tipoagendamento;
    var Parametro = match.params.id;
    if (match.params.id != null) {
      const response = await api.get('/api/agendamento/' + Parametro);

      setIDagendamento(response.data.id);
      setdescricao(response.data.descricao);
      setIDsacerdote(response.data.idsacerdote);

      setIDPessoa(response.data.agendapessoa.idpessoa);
      setIDlocalvisita(response.data.agendalocal.idlocalvisita);
      setIDTipoAgendamento(response.data.agendatipo.idtipoagendamento);

      setnomeAgendaPessoa(response.data.agendapessoa.nome);
      settelefoneAgendaPessoa(response.data.agendapessoa.telefone);

      setnomeLocalAgendaLocal(response.data.agendalocal.nomelocal);
      setenderecoAgendaLocal(response.data.agendalocal.endereco); 
      setbairroAgendaLocal(response.data.agendalocal.bairro); 
      setnumCasaAgendaLocal(response.data.agendalocal.numcasa);

      setnomeAgendaTipo(response.data.agendatipo.nome); 

      pessoa = response.data.agendapessoa.id;
      localvisita = response.data.agendalocal.id;
      tipoagendamento = response.data.agendalocal.id;

      await api.get('/api/pessoa/' + pessoa)
      .then(response => {
        const { data } = response;
        setnomepessoa(data.nome)
      })

      await api.get('/api/localvisita/' + localvisita)
      .then(response => {
        const { data } = response;
        setnomelocalvisita(data.nomelocal)
      })

      await api.get('/api/tipoagendamento/' + tipoagendamento)
      .then(response => {
        const { data } = response;
        setnometipoAgendamento(data.nome)
      })
  };
    await api.get('/api/pessoa/')
      .then(response => {
        const { data } = response;
        setallpessoa(data) 
      })
    
    await api.get('/api/localvisita/')
      .then(response => {
        const { data } = response;
        setalllocalvisita(data)
      })
   
      await api.get('/api/tipoagendamento/')
      .then(response => {
        const { data } = response;
        setalltipoAgendamento(data)
      })
   
    }
  

  async function componentAll() {
    if (match.params.id != null) {
      const responseAlter = await api.put('/api/agendamento/1', {
        idpessoa,
        idlocalvisita,
        idtipoagendamento,
        idsacerdote,
        descricao,
      })
      if(responseAlter.status === 200){
        Swal.fire('Sucesso!!',
            '<strong>Status: </strong>' + responseAlter.status +
            ' <br> Agendamento alterado com sucesso', 'success');
          toggle();
        toggle();
      }
    } else {
      const responseAdd = await api.post('/api/agendamento/' + idagendamento, {
        idpessoa,
        idlocalvisita,
        idtipoagendamento,
        idsacerdote,
        descricao,
      })
      if(responseAdd.status === 201){
        Swal.fire('Sucesso!!',
              '<strong>Status: </strong>' + responseAdd.status +
              ' <br> Agendamento criado com sucesso', 'success');
            toggle();
        toggle();
      }
    }
  }

  
  return (
    <Modal size="xl" onEnter={function () { componentDidMount(); }} isOpen={modal} toggle={toggle} >
      <ModalHeader toggle={toggle}>Agendamento de Visita</ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col xs="4">
              <Label>Nome: </Label>
              <Input type="select" name="select" onChange={event => setIDPessoa(event.target.value)}>
                <option value={idpessoa}>{nomepessoa}</option>
                {allpessoa.map(list => (
                  <option key={list.id} value={list.id}>
                 {list.nome}
                  </option>
                ))}
              </Input>
            </Col>
            <Col xs="4">
              <Label>Local: </Label>
              <Input type="select" name="select" onChange={event => setIDlocalvisita(event.target.value)}>
                <option value={idlocalvisita}>{nomelocalvisita}</option>
                {alllocalvisita.map(list => (
                  <option key={list.id} value={list.id}>
                    {list.nomelocal}
                  </option>
                ))}
              </Input>
            </Col>
            <Col xs="4">
              <Label>Tipo: </Label>
              <Input type="select" name="select" onChange={event => setIDTipoAgendamento(event.target.value)}>
                <option value={idtipoagendamento}>{nometipoAgendamento}</option>
                {alltipoAgendamento.map(list => (
                  <option key={list.id} value={list.id}>
                    {list.nome}
                  </option>
                ))}
              </Input>
            </Col>
            <Col xs="4">
              <Label>Sacerdote: </Label>
              <Input type="select" name="select" onChange={event => setIDsacerdote(event.target.value)}>
                {/* <option value={idpessoa}>{nomepessoa}</option> */}
                {allpessoa.map(list => (
                  <>
                  { list.id == idsacerdote ?
                    <option selected key={list.id} value={list.id}> {list.nome} </option> : ""
                  }
                  { list.pessoatipo.nome == "Padre" ?
                    <option value={list.id}> {list.nome} </option> : ""
                  }
                  </>
                ))}
              </Input>
            </Col>
          </Row>
          <Row>
          <Col xs="12">
          <Label>Observações: </Label>
          <Input type="textarea" name="text" value={descricao} onChange={event => setdescricao(event.target.value)}></Input>
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
