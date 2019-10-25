import React, { Component } from 'react';
import { Modal, 
        ModalBody, 
        ModalFooter, 
        ModalHeader, 
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
        FormGroup,
        Label,
        Input,
        Form,} from 'reactstrap';
import { Link, Route } from 'react-router-dom';
import api from '../component/api';

class Fiel extends Component {
  
  state = {
    fiels: [],
  }
  
  async componentDidMount() {
    api.get('/api/pessoa')
      .then(response => {
        const { data } = response;
        this.setState({
          fiels: data
        })
      })
      .catch(err => {
        console.warn(err);
        alert(err.message)
      })
  }

  renderFiels = () => {
    const { fiels } = this.state;
    const fielsItems = fiels.map((fiel) => {
      return (
        <tr>
          <td>{fiel.id}</td>
          <td>
          <Link to={'/cadastros/Fiel/' + fiel.id}>
              {fiel.nome}
            </Link>
          </td>
          <td>{fiel.telefone}</td>
          <td>{fiel.situacao == "A" ? 'Sim' : 'Não'}</td>
          <td>
            <Link to={'/cadastros/Fiel/' + fiel.id}>
               <i  class="fa fa-edit"></i>
            </Link>
          </td>
        </tr>
      )
    });
    return fielsItems;
  }


  render() {
    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col >
            <Card>
              <CardHeader>
                <i> Listagem de Fieis</i>
              </CardHeader>
              <Link to={'/cadastros/'}><Button className="mr-1" color="success">Cadastrar</Button></Link>
              <CardBody>
              
                <Table responsive striped>
                  <thead>
                  <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Ativo</th>
                  <th>Editar</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.renderFiels()}
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

export default Fiel;
