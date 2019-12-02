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

class Tipopessoa extends Component {
  
  state = {
    tipopessoa: [],
  }
  
  async componentDidMount() {
    api.get('/api/tipopessoa')
      .then(response => {
        const { data } = response;
        this.setState({
          tipopessoa: data
        })
      })
      .catch(err => {
        console.warn(err);
        alert(err.message)
      })
  }

  renderTipopessoas = () => {
    const { tipopessoa } = this.state;
    const tipopessoasItems = tipopessoa.map((tipopessoa) => {
      return (
        <tr key={tipopessoa.id}>
          <td>{tipopessoa.id}</td>
          <td>
          <Link to={'/listagem/tipopessoa/' + tipopessoa.id}>
              {tipopessoa.nome}
          </Link>
          </td>
        </tr>
      )
    });
    return tipopessoasItems;
  }


  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col >
            <Card>
              <CardHeader>
                <i> Listagem dos Tipos de Pessoas</i>
              </CardHeader>
              <Col xs="4">
              <Link to={'/cadastro/tipopessoa'}><Button className="mr-1" color="success">Cadastrar</Button></Link>
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
                  {this.renderTipopessoas()}
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

export default Tipopessoa;
