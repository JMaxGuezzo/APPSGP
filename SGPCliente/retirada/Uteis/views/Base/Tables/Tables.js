import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';

class Tables extends Component {
  state = {
    tasks: []
  }
  
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        const { data } = response;
        this.setState({
          tasks: data
        })
      })
      .catch(err => {
        console.warn(err);
        alert(err.message)
      })
  }

  renderTasks = () => {
    const { tasks } = this.state;
    const tasksItems = tasks.map((task) => {
      return (
        <tr>
          <td>{task.id}</td>
          <td>
            <Link to={'/tasks/' + task.id}>
              {task.title}
            </Link>
          </td>
          <td>{task.userId}</td>
          <td>{task.completed ? 'Sim' : 'Não'}</td>
          <td>
           <button type="submit">
            <i class="fa fa-eye"></i>
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
    return tasksItems;
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
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                  <th>Id</th>
                  <th>Título</th>
                  <th>Usuário</th>
                  <th>Concluída</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.renderTasks()}
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

export default Tables;
