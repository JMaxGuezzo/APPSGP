import React, { useState } from 'react';

import { Modal, 
    ModalBody, 
    ModalFooter, 
    ModalHeader, 
    Row, 
   Input, Col, Label,
    Form, Button,} from 'reactstrap';

    import api from './api';
    import Campos from './campos'

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
    const [cidadeid, setCidadeid] = useState(''); 
    const [idcomunidade, setIdcomunidade] = useState(''); 
    const [idtipopessoa, setIdtipopessoa] = useState('');
    const [cidadenome, setCidadeNome] = useState(''); 
    const [cidade, setCidade] = useState([]); 
    const [comunidadenome, setComunidadeNome] = useState(''); 
    const [comunidade, setComunidade] = useState([]); 
    const [tipopessoanome, setTipoPessoaNome] = useState(''); 
    const [tipopessoa, setTipoPessoa] = useState([]); 

     const toggle = () => setModal(!modal, history.push('/cadastros/Fiel') );

     async function componentDidMount() { 
       var t;
      const Parametro = match.params.Id;
      await api.get('/api/pessoa/'+ Parametro)
      .then(responseNomeCidade => {
        const { data } = responseNomeCidade;
        console.log(data.idcidade);
      setId(data.id);
      setNome(data.nome);
      setDatanasc(data.datanasc);
      setEndereco(data.endereco);
      setNumero(data.numcasa);
      setBairro(data.bairro);
      setTelefone(data.telefone);
      setCelular(data.celular);
      setComplemento(data.complemento);
      setRg(data.rg);
      setCpf(data.cpf);
      t=data.idcidade;
      setCidadeid(data.idcidade);
      setIdcomunidade(data.idcomunidade);
      setIdtipopessoa(data.idtipopessoa);
      setSituacao(data.situacao);
      });
      await api.get('/api/cidade/' + t)
      .then(responseNomeCidade => {
      const { data } = responseNomeCidade;
      setCidadeNome(data.nome)
    })

     await api.get('/api/cidade/')
      .then(responseAllCidade => {
      const { data } = responseAllCidade;
      setCidade(data)
    })
    }; 

function PreencheTopDown() {
   console.log(cidadeid)
     

     api.get('/api/comunidade/' + idcomunidade)
      .then(responseIdComunidade => {
      const { data } = responseIdComunidade;
      setComunidadeNome(data.nome)
    })

     api.get('/api/comunidade/')
      .then(responseAllComunidade => {
      const { data } = responseAllComunidade;
      setComunidade(data)
    })

     api.get('/api/tipopessoa/' + idtipopessoa)
      .then(responseIdTipoPessoa => {
      const { data } = responseIdTipoPessoa;
      setTipoPessoaNome(data.nome)
    })

     api.get('/api/tipopessoa/')
      .then(responseAllTipoPessoa => {
      const { data } = responseAllTipoPessoa;
      setTipoPessoa(data)
    })
  }

  async function componentAll() {
    if (match.params.Id != null) {
      const responseAlter = await api.put('/api/pessoa/' + id, {
        id, 
        nome, 
        datanasc, 
        endereco, 
        numero, 
        bairro, 
        telefone,  
        celular, 
        complemento,  
        rg, 
        cpf, 
        situacao,
        idcidade: cidadeid, 
        idcomunidade, 
        idtipopessoa, 
        cidadenome,  
        cidade, 
        comunidadenome, 
        comunidade,
        tipopessoanome,
        tipopessoa,
      })
      if (responseAlter.status === 200) {
        alert("Pessoa Alterada Com Sucesso");
        toggle();
      }
    } else {
      const responseAdd = await api.post('/api/pessoa/' + id, {
        id, 
        nome, 
        datanasc, 
        endereco, 
        numero, 
        bairro, 
        telefone,  
        celular, 
        complemento,  
        rg, 
        cpf, 
        situacao,
        idcidade: cidadeid, 
        idcomunidade, 
        idtipopessoa, 
        cidadenome,  
        cidade, 
        comunidadenome, 
        comunidade,
        tipopessoanome,
        tipopessoa,
      })
      if (responseAdd.status === 201) {
        alert("Pessoa Cadastrada com Sucesso.");
        toggle();
      }
    }
  }

    return(
      <Modal size="xl" onEnter={function (){componentDidMount()}} onEntering={function (){}} isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Fiel</ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                {Campos(true, "1","ID", "text", "ID", id, event => setId(event.target.value))}
                {Campos(false, "3", "Nome", "text", "Digite Seu Nome..", nome, event => setNome(event.target.value))}  
                {Campos(false, "2","Data Nascimento", "date", "__/__/___", datanasc, event => setDatanasc(event.target.value))}
                {Campos(false, "2","Telefone", "text", "__/__/___", telefone, event => setTelefone(event.target.value))}
                {Campos(false, "2","Celular", "text", "__/__/___", celular,  event => setCelular(event.target.value))}
              </Row>
              <Row>
                {Campos(false, "4","Endereco", "text", "Digite seu endereco", endereco, event => setEndereco(event.target.value))}
                {Campos(false, "1", "Numero", "Number", "Numero Casa", numero, event => setNumero(event.target.value))}
                {Campos(false, "2","Bairro", "text", "Digite Seu Bairro", bairro, event => setBairro(event.target.value))}
                {Campos(false, "3","Complemento", "text", "Complemento", complemento, event => setComplemento(event.target.value))}
              </Row>
              <Row>
                {Campos(false, "3","RG", "text", "RG", rg, event => setRg(event.target.value))}
                {Campos(false, "3", "CPF", "text", "CPF", cpf, event => setCpf(event.target.value))}   
              
              <Col xs="4">
              <Label>Cidade</Label>
              <Input type="select" name="select" onChange={event => setCidadeid(event.target.value)}>
                <option value={cidadeid}>{cidadenome}</option>
                {cidade.map(list => (
                  <option key={list.id} value={list.id}>
                    {list.nome}
                  </option>
                ))}
              </Input>
            </Col>
            <Col xs="4">
              <Label>Comunidade</Label>
              <Input type="select" name="select" onChange={event => setIdcomunidade(event.target.value)}>
                <option value={idcomunidade}>{comunidadenome}</option>
                {comunidade.map(list => (
                  <option key={list.id} value={list.id}>
                    {list.nome}
                  </option>
                ))}
              </Input>
            </Col>

            <Col xs="4">
              <Label>Tipo Pessoa</Label>
              <Input type="select" name="select" onChange={event => setIdtipopessoa(event.target.value)}>
                <option value={idtipopessoa}>{tipopessoanome}</option>
                {tipopessoa.map(list => (
                  <option key={list.id} value={list.id}>
                    {list.nome}
                  </option>
                ))}
              </Input>
            </Col>
                 
                 </Row>
              
              {Campos(false, "2","Situação", "text", "Situação", situacao, event => setRg(situacao === "A" ? "Ativo" : "Inativo"))}
             
            </Form>
          </ModalBody>
          <ModalFooter>
          <Button color="success" onClick={componentAll}>Salvar</Button>
          </ModalFooter>
      </Modal>
    );
}
