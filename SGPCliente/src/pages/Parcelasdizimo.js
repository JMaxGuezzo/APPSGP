import React, { useState } from 'react';
import { 
        Card, 
        CardBody, 
        CardHeader, 
        Col, 
        Pagination, 
        PaginationItem, 
        PaginationLink, 
        Row, 
        Table, 
        Button, Input, Label
        } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from '../component/api';
import Swal from 'sweetalert2';
import moment from 'moment';



export default function Parcelasdizimo ({history}) {
  
  const [allparcelas, setallParcelas] = useState([]);
  const [codigofiel, setcodigofiel] = useState("");
  const [nomefiel, setnomefiel] = useState([]);
  const [valor, setvalor] = useState([]);
  const [qntdparcelas, setqntdparcelas] = useState([]);
  const [datapgto, setdatapgto] = useState([]);

  async function componentDidMount() {
    await api.get('/api/parcelasdizimo')
      .then(response => {
        const { data } = response;
          setallParcelas(data)
      })
      .catch(err => {
        console.warn(err);
        alert(err.message)
      })

      await api.get('/api/pessoa/'+ codigofiel)
      .then(response => {
        const { data } = response;
          setnomefiel(data.nome)
      })
      .catch(err => {
        console.warn(err);
        alert(err.message)
      })
      renderParcelas()
    }


  function renderParcelas () {
    var data;
    const parcelasdizimosItems = allparcelas.map((parcelasdizimo) => {
      {if(parcelasdizimo.pessoa.id == codigofiel && nomefiel == parcelasdizimo.pessoa.nome){
        data = moment(parcelasdizimo.datapgto).format('DD-MM-YYYY');
      return (
        <tr key={parcelasdizimo.id}>
          <td>{parcelasdizimo.id}</td>
          <td>
              {data}
          </td>
          <td>{parcelasdizimo.valor}</td>
          <td><button>Deletar</button></td>
        </tr>
      )
    }}

    });
    return parcelasdizimosItems;  
  }

  async function salvarParcelas() {
    var response = 0;
    var i = qntdparcelas;
    var resultado = valor / qntdparcelas ;
    
    if(valor > 0){
    for(i; i > 0 ; i--){ 
      response = await api.post('/api/parcelasdizimo/',{
        idpessoa: codigofiel,
        valor:resultado, 
        datapgto: moment(datapgto).format('YYYY MM DD'),
    }).catch( function add() {
      if(response.status === 201){
          alert("Cadastrado com sucesso!!");
        setqntdparcelas("");
        setvalor("");
        setcodigofiel("");
        setnomefiel("");
        }else{
          Swal.fire('Erro!!',
          '<strong>Status: </strong>' + response.status +
          ' <br> Nao foi possivel Lançar a parcela, Verifique os campos e tente novamente', 'error')
      }
    }
    )
  }
  }else{
    Swal.fire('Erro!!',
          '<strong>Status: </strong>' + response.status +
          ' <br> Por favor Digite um valor Maior que Zero', 'error')
  }
    }
    
    return (
      <div className="animated fadeIn">
        <Card body>
        <CardHeader>
          <b>Dizimo</b>
        </CardHeader>
        <Row>
        
          <Col xs="2">
          <br/>
            <br/>
          <Label>Codigo:</Label>
          <Input type="number" placeholder="Dizimo" onBlur={componentDidMount} value={codigofiel} onChange={event => setcodigofiel(event.target.value)} > </Input>

          <Label>Qntd Parcelas:</Label>
          <Input type="number" placeholder="Parcelas" value={qntdparcelas} onChange={event => setqntdparcelas(event.target.value)}> </Input>

          <Label>Valor:</Label>
          <Input type="number" placeholder="Valor" value={valor} onChange={event => setvalor(event.target.value)}> </Input>
          <br/>
          <Button color="success" onClick={salvarParcelas} > Salvar</Button>

          </Col>

          <Col xs="3">
          <br/>
            <br/>
          <Label>Nome:</Label>
          <Input disabled type="text" placeholder="Nome Fiel" value={nomefiel} > </Input>

          <Label>Data:</Label>
          <Input type="date" placeholder="Nome Fiel" value={datapgto} onChange={event => setdatapgto(event.target.value)}> </Input>

          </Col>

          <Col xs="5">
            <br/>
            <br/>
            <Card>
              <CardHeader>
                <i>Parcelas Dizimo</i>
                </CardHeader>
                <CardBody>
                <Table size="sm" responsive striped>
                <thead>
                  <tr>
                  <th>Id</th>
                  <th>Data</th>
                  <th>Valor</th>
                  <th>Deletar</th>
                  </tr>
                  </thead>
                  <tbody>
                  {renderParcelas()}
                  </tbody>
                </Table>
                </CardBody>
            </Card>
          </Col>
        </Row>
        </Card>
        
      </div>
    );
  }

