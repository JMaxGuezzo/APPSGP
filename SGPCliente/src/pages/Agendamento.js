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

class Agendamento extends Component {
  
  state = {
    agendamentos: [],
    estado: "",
  }

  

  async componentDidMount() {
    await api.get('/api/agendamento/')
      .then(response => {
        const { data } = response;
        console.log(data);
        this.setState({
          agendamentos: data
        })
      })
      .catch(err => {
        console.warn(err);
        alert(err.message)
      })
    }
  
  renderAgendamentos = () => {
    const { agendamentos } = this.state;
    const agendamentosItems = agendamentos.map((agendamento) => {
      return (
        <tr key={agendamento.id}>
          <td>{agendamento.id}</td>
          <td>
          <Link to={'/listagem/agendamento/' + agendamento.id}>
              {agendamento.agendapessoa.nome}
          </Link>
          </td>
          <td>{agendamento.agendapessoa.telefone}</td>
          <td>{agendamento.agendatipo.nome}</td>
        </tr>
        
      )
    });
    return agendamentosItems;
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
              <Link to={'/cadastro/agendamento'}><Button className="mr-1"  color="success">Cadastrar</Button></Link>
              </Col>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Ação</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.renderAgendamentos()}
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem >
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

export default Agendamento;
