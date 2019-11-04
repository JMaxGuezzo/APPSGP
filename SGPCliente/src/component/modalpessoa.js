import React, { useState } from 'react';

import { Modal, 
    ModalBody, 
    ModalFooter, 
    ModalHeader, 
    Row, 
    Button,
    Form,} from 'reactstrap';

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

     const toggle = () => setModal(!modal, history.push('/cadastros/Fiel') );

     async function componentDidMount() { 
      const Parametro = match.params.Id;
      const response = await api.get('/api/pessoa/'+ Parametro);
      setId(response.data.id);
      setNome(response.data.nome);
      setDatanasc(response.data.datanasc);
      setEndereco(response.data.endereco);
      setNumero(response.data.numcasa);
      setBairro(response.data.bairro);
      setTelefone(response.data.telefone);
      setCelular(response.data.celular);
      setComplemento(response.data.complemento);
      setRg(response.data.rg);
      setCpf(response.data.cpf);
      setSituacao(response.data.situacao);
    }; 
    


    return(
      <Modal size="xl" onEnter={function (){componentDidMount();}} isOpen={modal} toggle={toggle} >
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
                {Campos(false, "2","Situação", "text", "Situação", situacao, event => setRg(situacao === "A" ? "Ativo" : "Inativo"))}
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
      </Modal>
    );
}
