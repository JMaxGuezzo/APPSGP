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
import axios from 'axios';

class Fiel extends Component {
  state = {
    fiels: [],
    modal: false
  }

  toggle = this.toggle.bind(this);

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  async componentDidMount() {
    axios.get('http://localhost:3001/api/pessoa')
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
            <Link to={'/fiels/' + fiel.id}>
              {fiel.nome}
            </Link>
          </td>
          <td>{fiel.telefone}</td>
          <td>{fiel.situacao ? 'Sim' : 'Não'}</td>
          <td>
           <button type="submit" onClick={this.toggle}>
            <i class="fa fa-eye" ></i>
            </button>

            <button type="submit">
               <i class="fa fa-edit"></i>
            </button>

            <button type="submit">
              <i class="fa fa-trash"></i>
            </button>
                    </td>
        </tr>
      )
    });
    return fielsItems;
  }

  render() {
    return (
      <div className="animated fadeIn">
                <Modal size="xl" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                  <ModalHeader toggle={this.toggle}>Fiel</ModalHeader>
                  <ModalBody>
                  <Form>
                    <Row>
                    <Col>
                      <FormGroup>
                        <Label>Id</Label>
                        <Input disabled type="text" />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Nome</Label>
                        <Input type="text" placeholder="Digite Seu Nome."/>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Data de Nascimento</Label>
                        <Input type="text" placeholder="Data de Nascimento."/>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Endereco</Label>
                        <Input type="text" placeholder="Digite seu endereco"/>
                      </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                      <FormGroup>
                        <Label>Numero</Label>
                        <Input block type="text" placeholder="Numero da casa"/>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Bairro</Label>
                        <Input type="text" placeholder="Digite Seu bairro"/>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Telefone</Label>
                        <Input type="number" placeholder="Digite seu telefone"/>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Celular</Label>
                        <Input type="number" placeholder="Digite o seu celular."/>
                      </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                      <FormGroup>
                        <Label>Complemento</Label>
                        <Input block type="text" placeholder="Digite um Complemento"/>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>RG</Label>
                        <Input type="number" placeholder="Digite seu RG"/>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>CPF</Label>
                        <Input type="number" placeholder="Digite seu CPF"/>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Situação</Label>
                        <Input type="text" placeholder="Digite sua situação"/>
                      </FormGroup>
                    </Col>
                    </Row>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>Do Something</Button>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
                </Modal>
        
        <Row>
          <Col >
            <Card>
              <CardHeader>
                <i> Listagem de Fieis</i>
              </CardHeader>
              <CardBody>
              <Button onClick={this.toggle} className="mr-1" color="success">Cadastrar</Button>
                <Table responsive striped>
                  <thead>
                  <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Ativo</th>
                  <th>Opedações</th>
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
