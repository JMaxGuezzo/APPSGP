import React, { Component } from 'react';
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
        Button,
        } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from '../component/api';

class Tipoagendamento extends Component {
  
  state = {
    tipoagendamento: [],
  }
  
  async componentDidMount() {
    api.get('/api/tipoagendamento')
      .then(response => {
        const { data } = response;
        this.setState({
          tipoagendamento: data
        })
      })
      .catch(err => {
        console.warn(err);
        alert(err.message)
      })
  }

  renderTipoagendamentos = () => {
    const { tipoagendamento } = this.state;
    const tipoagendamentosItems = tipoagendamento.map((tipoagendamento) => {
      return (
        <tr key={tipoagendamento.id}>
          <td>{tipoagendamento.id}</td>
          <td>
          <Link to={'/listagem/tipoagendamento/' + tipoagendamento.id}>
              {tipoagendamento.nome}
          </Link>
          </td>
        </tr>
      )
    });
    return tipoagendamentosItems;
  }


  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col >
            <Card>
              <CardHeader>
                <i> Listagem de Agendamentos</i>
              </CardHeader>
              <Col xs="4">
              <Link to={'/cadastro/tipoagendamento'}><Button className="mr-1" color="success">Cadastrar</Button></Link>
              </Col>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.renderTipoagendamentos()}
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Tipoagendamento;
