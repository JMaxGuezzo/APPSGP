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

class Localvisita extends Component {
  
  state = {
    locais: [],
    cidade: "",
  }

  

  async componentDidMount() {
    await api.get('/api/localvisita')
      .then(response => {
        const { data } = response;
        this.setState({
          locais: data
        })
      })
      .catch(err => {
        console.warn(err);
        alert(err.message)
      })
    }
  
  renderLocalVisita = () => {
    const { locais } = this.state;
    const locaisItems = locais.map((local) => {
      return (
        <tr key={local.id}>
          <td>{local.id}</td>
          <td>
          <Link to={'/listagem/localvisita/' + local.id}>
              {local.nomelocal}
          </Link>
          </td>
          <td>{local.telefone}</td>
          <td>{local.visitacidade.nome}</td>
        </tr>
        
      )
    });
    return locaisItems;
  }
  

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col >
            <Card>
              <CardHeader>
                <i> Listagem dos Locais de Visita</i>
              </CardHeader>
              <Col xs="4">
              <Link to={'/cadastro/localvisita'}><Button className="mr-1"  color="success">Cadastrar</Button></Link>
              </Col>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Cidade</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.renderLocalVisita()}
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

export default Localvisita;
