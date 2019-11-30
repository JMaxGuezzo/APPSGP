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
    cidades: [],
    estado: "",
  }

  

  async componentDidMount() {
    await api.get('/api/cidade')
      .then(response => {
        const { data } = response;
        this.setState({
          cidades: data
        })
      })
      .catch(err => {
        console.warn(err);
        alert(err.message)
      })
    }
  
  renderCidades = () => {
    const { cidades } = this.state;
    const cidadesItems = cidades.map((cidade) => {
      return (
        <tr key={cidade.id}>
          <td>{cidade.id}</td>
          <td>
          <Link to={'/listagem/cidade/' + cidade.id}>
              {cidade.nome}
          </Link>
          </td>
          <td>{cidade.cidadeestado.nome}</td>
        </tr>
        
      )
    });
    return cidadesItems;
  }
  

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col >
            <Card>
              <CardHeader>
                <i> Listagem de Cidades</i>
              </CardHeader>
              <Col xs="4">
              <Link to={'/cadastro/cidade'}><Button className="mr-1"  color="success">Cadastrar</Button></Link>
              </Col>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Estado</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.renderCidades()}
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

export default Estado;
