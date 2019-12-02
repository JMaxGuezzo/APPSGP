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

class Ceb extends Component {
  
  state = {
    cebs: [],
  }
  
  async componentDidMount() {
    api.get('/api/ceb')
      .then(response => {
        const { data } = response;
        this.setState({
          cebs: data
        })
      })
      .catch(err => {
        console.warn(err);
        alert(err.message)
      })
  }

  renderCebs = () => {
    const { cebs } = this.state;
    const cebsItems = cebs.map((ceb) => {
      return (
        <tr key={ceb.id}>
          <td>{ceb.id}</td>
          <td>
          <Link to={'/listagem/ceb/' + ceb.id}>
              {ceb.nome}
          </Link>
          </td>
        </tr>
      )
    });
    return cebsItems;
  }


  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col >
            <Card>
              <CardHeader>
                <i> Listagem das Cebs</i>
              </CardHeader>
              <Col xs="4">
              <Link to={'/cadastro/ceb'}><Button className="mr-1" color="success">Cadastrar</Button></Link>
              </Col>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                  <th>Id</th>
                  <th>Ceb</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.renderCebs()}
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

export default Ceb;
