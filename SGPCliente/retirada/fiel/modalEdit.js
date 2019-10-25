import React,{Component} from 'react';

import { Modal, 
    ModalBody, 
    ModalFooter, 
    ModalHeader, 
    Col, 
    Row, 
    Button,
    FormGroup,
    Label,
    Input,
    Form,} from 'reactstrap';
    import axios from 'axios';
class Modals extends Component {
    
    state = {
        fiels: [],
        modal: true
      }

      toggle = this.toggle.bind(this);

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  async componentDidMount() {
      const response = (this.props.match.params.Id)
    axios.get('http://localhost:3001/api/pessoa/'+ response)
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

  renderModalView = () => {
    const { fiels } = this.state;
      return (
        <Modal size="xl" isOpen={this.state.modal} toggle={this.toggle} >
                  <ModalHeader>Fiel</ModalHeader>
                  <ModalBody>
                  <Form>
                    <Row>
                    <Col xs="1">
                      <FormGroup>
                        <Label>ID</Label>
                        <Input  type="text"
                        value={fiels.id} />
                      </FormGroup>
                    </Col>
                    <Col xs="4">
                      <FormGroup>
                        <Label>Nome</Label>
                        <Input type="text" placeholder="Digite Seu Nome." value={fiels.nome}/>
                      </FormGroup>
                    </Col>
                    <Col xs="2">
                      <FormGroup>
                        <Label>Data de Nascimento</Label>
                        <Input type="text" placeholder="__/___/___"/>
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
                    <Col xs="1">
                      <FormGroup>
                        <Label>Numero</Label>
                        <Input block type="text" placeholder="Nº"/>
                      </FormGroup>
                    </Col>
                    <Col xs="2">
                      <FormGroup>
                        <Label>Bairro</Label>
                        <Input type="text" placeholder="Digite Seu bairro"/>
                      </FormGroup>
                    </Col>
                    <Col xs="2">
                      <FormGroup>
                        <Label>Telefone</Label>
                        <Input type="number" placeholder="Digite seu telefone"/>
                      </FormGroup>
                    </Col>
                    <Col xs="2">
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
                        <Input type="text"  placeholder="Digite sua situação"/>
                      </FormGroup>
                    </Col>
                    </Row>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>Fechar</Button>
                  </ModalFooter>
                </Modal>
    )
  }

render() {
    return (
        <>
        {this.renderModalView()}
        </>
    )}
}

export default Modals;
