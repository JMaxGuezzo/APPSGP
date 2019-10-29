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

class Estado extends Component {
  
  state = {
    estados: [],
  }
  
  async componentDidMount() {
    api.get('/api/estado')
      .then(response => {
        const { data } = response;
        this.setState({
          estados: data
        })
      })
      .catch(err => {
        console.warn(err);
        alert(err.message)
      })
  }

  renderEstados = () => {
    const { estados } = this.state;
    const estadosItems = estados.map((estado) => {
      return (
        <tr key={estado.id}>
          <td>{estado.id}</td>
          <td>
          <Link to={'/listagem/estado/' + estado.id}>
              {estado.nome}
          </Link>
          </td>
          <td>{estado.sigla}</td>
        </tr>
      )
    });
    return estadosItems;
  }


  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col >
            <Card>
              <CardHeader>
                <i> Listagem de Estados</i>
              </CardHeader>
              <Link to={'/cadastro/estado'}><Button className="mr-1" color="success">Cadastrar</Button></Link>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Sigla</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.renderEstados()}
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

export default Estado;
