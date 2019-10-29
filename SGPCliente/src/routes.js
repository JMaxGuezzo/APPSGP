import React from 'react';


const fiel = React.lazy(()=> import('./pages/Fiel'));
const estado = React.lazy(()=> import('./pages/Estado'));
const cidade = React.lazy(()=> import('./pages/Cidade'));
const modalPessoa = React.lazy(()=> import('./component/modalpessoa'));
const modalEstado = React.lazy(()=> import('./component/modalestado'));
const modalCidade = React.lazy(()=> import('./component/modalcidade'));

const routes = [
  { path: '/listagem/Fiel/', exact: true, component: fiel },
  { path: '/listagem/Fiel/:Id', component: modalPessoa },

  { path: '/cadastro/estado/', exact:true, component: modalEstado },
  { path: '/listagem/estado/', exact:true, component: estado },
  { path: '/listagem/estado/:Id', component: modalEstado },

  { path: '/cadastro/cidade/', exact:true, component: modalCidade },
  { path: '/listagem/cidade/', exact:true, component: cidade },
  { path: '/listagem/cidade/:Id', component: modalCidade },
];

export default routes;
