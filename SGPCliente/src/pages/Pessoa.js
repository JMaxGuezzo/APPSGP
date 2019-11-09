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

class Pessoa extends Component {
  
  state = {
    pessoas: [],
  }
  
  async componentDidMount() {
    api.get('/api/pessoa')
      .then(response => {
        const { data } = response;
        this.setState({
          pessoas: data
        })
      })
      .catch(err => {
        console.warn(err);
        alert(err.message)
      })
  }

  renderPessoas = () => {
    const { pessoas } = this.state;
    const pessoasItems = pessoas.map((pessoa) => {
      return (
        <tr key={pessoa.id}>
          <td>{pessoa.id}</td>
          <td>
          <Link to={'/listagem/pessoa/' + pessoa.id}>
              {pessoa.nome}
            </Link>
          </td>
          <td>{pessoa.telefone}</td>
          <td>{pessoa.situacao === "A" ? 'Sim' : 'Não'}</td>
        </tr>
      )
    });
    return pessoasItems;
  }


  render() {
    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col >
            <Card>
              <CardHeader>
                <i> Listagem de Pessoas</i>
              </CardHeader>
              <Link to={'/cadastro/pessoa/'}><Button className="mr-1" color="success">Cadastrar</Button></Link>
              <CardBody>
              
                <Table responsive striped>
                  <thead>
                  <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Ativo</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.renderPessoas()}
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

export default Pessoa;
