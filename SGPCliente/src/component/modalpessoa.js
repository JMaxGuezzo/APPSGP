import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { Modal, 
    ModalBody, 
    ModalFooter, 
    ModalHeader, 
    Row, 
   Input, Col, Label,
    Form, Button, FormGroup} from 'reactstrap';
    import moment from 'moment';
    import api from './api';
    import Campos from './campos';
    import Swal from 'sweetalert2';
    const validarCpf = require('validar-cpf');
    
   


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
    const [idcidade, setCidadeid] = useState(''); 
    const [idcomunidade, setIdcomunidade] = useState(''); 
    const [idtipopessoa, setIdtipopessoa] = useState('');
    const [cidadenome, setCidadeNome] = useState(''); 
    const [cidade, setCidade] = useState([]); 
    const [comunidadenome, setComunidadeNome] = useState(''); 
    const [comunidade, setComunidade] = useState([]); 
    const [tipopessoanome, setTipoPessoaNome] = useState(''); 
    const [tipopessoa, setTipoPessoa] = useState([]); 

     const toggle = () => setModal(!modal, history.push('/listagem/pessoa') );

     async function componentDidMount() { 
       var cidadeid;
       var comunidadeid;
       var tipopessoaid;
       var convertdata;
      const Parametro = match.params.Id;
      if(Parametro != null){
      await api.get('/api/pessoa/'+ Parametro)
      .then(response => {
        const { data } = response;
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
      setCidadeid(data.idcidade);
      setIdcomunidade(data.idcomunidade);
      setIdtipopessoa(data.idtipopessoa);
      setSituacao(data.situacao);
      convertdata = moment(data.datanasc).format('DD/MM/YYYY');
      setDatanasc(convertdata);
      cidadeid=data.idcidade;
      comunidadeid=data.idcomunidade;
      tipopessoaid=data.idtipopessoa;
      });

      await api.get('/api/cidade/' + cidadeid)
      .then(responseNomeCidade => {
      const { data } = responseNomeCidade;
      setCidadeNome(data.nome)
    })

    await api.get('/api/comunidade/' + comunidadeid)
      .then(responseIdComunidade => {
      const { data } = responseIdComunidade;
      setComunidadeNome(data.nome)
    })

    await api.get('/api/tipopessoa/' + tipopessoaid)
      .then(responseIdTipoPessoa => {
      const { data } = responseIdTipoPessoa;
      setTipoPessoaNome(data.nome)
    })

  }
     await api.get('/api/cidade/')
      .then(responseAllCidade => {
      const { data } = responseAllCidade;
      setCidade(data)
    })

    await api.get('/api/comunidade/')
      .then(responseAllComunidade => {
      const { data } = responseAllComunidade;
      setComunidade(data)
    })


    await api.get('/api/tipopessoa/')
      .then(responseAllTipoPessoa => {
      const { data } = responseAllTipoPessoa;
      setTipoPessoa(data)
    })
    }; 

console.log(moment(new Date()));
  async function componentAll() {
    const convert = moment(datanasc).format('YYYY-MM-DD');
    if (match.params.Id != null) {
      if(validarCpf(cpf) == true ){
      const responseAlter = await api.put('/api/pessoa/' + id, {
        nome, 
        datanasc, 
        endereco, 
        numcasa: numero, 
        bairro, 
        telefone,  
        celular, 
        complemento,  
        rg, 
        cpf, 
        situacao,
        idcidade, 
        idcomunidade, 
        idtipopessoa, 
      })
      if (responseAlter.status === 200) {
        Swal.fire('Sucesso!!',
          '<strong>Status: </strong>' + responseAlter.status +
          ' <br>' + tipopessoanome + ' alterado com sucesso', 'success');
        toggle();
      }
    }else{
      Swal.fire('Erro!!',
          '<strong>Status: </strong>'+
          ' <br> CPF ' + cpf + ' invalido por favor verifique!!', 'error');
    }
    } else {
      if(validarCpf(cpf) == true && nome != "" && rg != ""){
      const responseAdd = await api.post('/api/pessoa/', {
        nome, 
        datanasc, 
        endereco, 
        numcasa: numero, 
        bairro, 
        telefone,  
        celular, 
        complemento,  
        rg, 
        cpf, 
        situacao,
        idcidade, 
        idcomunidade, 
        idtipopessoa, 
      })
      if (responseAdd.status === 201) {
        alert("Pessoa Cadastrada com Sucesso.");
        toggle();
      }else if(responseAdd.status === 422){
        alert("Nao foi possivel cadastrar!! <br> Nome: "+ nome+ " ja esta cadastrado");
      }
    }else{
      alert("CPF invalido");
    }
  }
  }
    return(
      <Modal size="xl" onEnter={function (){componentDidMount()}} isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Fiel</ModalHeader>
          <ModalBody>
            <Form>
              <Row>
              {Campos(true, "1","ID", "text", "ID", id, event => setId(event.target.value))}
                {Campos(false, "3", "Nome", "text", "Digite Seu Nome..", nome, event => setNome(event.target.value))}

                <Col xs="2">
                <FormGroup>
                <Label>Data de Nascimento</Label>
                <InputMask type="text" mask="99/99/9999" placeholder="___/___/___" value={datanasc} onChange={event => setDatanasc(event.target.value)}></InputMask>
               </FormGroup>
               </Col>

                {Campos(false, "2","Telefone", "text", "", telefone, event => setTelefone(event.target.value))}
                {Campos(false, "2","Celular", "text", "", celular,  event => setCelular(event.target.value))}
              </Row>
              <Row>
                {Campos(false, "4","Endereco", "text", "Digite seu endereco", endereco, event => setEndereco(event.target.value))}
                {Campos(false, "1", "Numero", "Number", "Numero Casa", numero, event => setNumero(event.target.value))}
                {Campos(false, "2","Bairro", "text", "Digite Seu Bairro", bairro, event => setBairro(event.target.value))}
                {Campos(false, "3","Complemento", "text", "Complemento", complemento, event => setComplemento(event.target.value))}
              </Row>
              <Row>
                {Campos(false, "3","RG", "text", "RG", rg, event => setRg(event.target.value))}
                <Col xs="2">
                <FormGroup>
                <Label>CPF:</Label>
                <InputMask type="text" mask="999.999.999-99" placeholder="___.___.___-__" value={cpf} onChange={event => setCpf(event.target.value)}></InputMask>
               </FormGroup>
               </Col>
              <Col xs="4">
              <Label>Cidade</Label>
              <Input type="select" name="select" onChange={event => setCidadeid(event.target.value)}>
                <option value={idcidade}>{cidadenome}</option>
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

            {Campos(false, "2","Situação", "text", "Situação", situacao, event => setSituacao(event.target.value))} 
            </Row>
            
              
             
            </Form>
          </ModalBody>
          <ModalFooter>
          <Button color="success" onClick={componentAll}>Salvar</Button>
          </ModalFooter>
      </Modal>
    );
}
