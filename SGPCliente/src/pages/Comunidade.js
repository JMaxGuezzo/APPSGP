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

class Comunidade extends Component {
  
  state = {
    comunidade: [],
    ceb: "",
  }

  

  async componentDidMount() {
    await api.get('/api/comunidade')
      .then(response => {
        const { data } = response;
        this.setState({
          comunidade: data
        })
      })
      .catch(err => {
        console.warn(err);
        alert(err.message)
      })
    }
  
  renderComunidade = () => {
    const { comunidade } = this.state;
    const comunidadesItems = comunidade.map((comunidade) => {
      return (
        <tr key={comunidade.id}>
          <td>{comunidade.id}</td>
          <td>
          <Link to={'/listagem/comunidade/' + comunidade.id}>
              {comunidade.nome}
          </Link>
          </td>
          <td>{comunidade.comunidadeceb.nome}</td>
        </tr>
        
      )
    });
    return comunidadesItems;
  }
  

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col >
            <Card>
              <CardHeader>
                <i> Listagem das Comunidades</i>
              </CardHeader>
              <Col xs="4">
              <Link to={'/cadastro/comunidade'}><Button className="mr-1"  color="success">Cadastrar</Button></Link>
              </Col>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                  <th>Id</th>
                  <th>Comunidade</th>
                  <th>Ceb</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.renderComunidade()}
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

export default Comunidade;
