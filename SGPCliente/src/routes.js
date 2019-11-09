import React from 'react';


const pessoa = React.lazy(()=> import('./pages/Pessoa'));
const estado = React.lazy(()=> import('./pages/Estado'));
const cidade = React.lazy(()=> import('./pages/Cidade'));
const tipopessoa = React.lazy(()=> import('./pages/Tipopessoa'));
const comunidade = React.lazy(()=> import('./pages/Comunidade'));
const ceb = React.lazy(()=> import('./pages/Ceb'));
const tipoagendamento = React.lazy(()=> import('./pages/Tipoagendamento'));
const localvisita = React.lazy(()=> import('./pages/Localvisita'));
const agendamento = React.lazy(()=> import('./pages/Agendamento'));

const modalPessoa = React.lazy(()=> import('./component/modalpessoa'));
const modalEstado = React.lazy(()=> import('./component/modalestado'));
const modalCidade = React.lazy(()=> import('./component/modalcidade'));
const modalTipopessoa = React.lazy(()=> import('./component/modaltipopessoa'));
const modalComunidade = React.lazy(()=> import('./component/modalcomunidade'));
const modalCeb = React.lazy(()=> import('./component/modalceb'));
const modalTipoagendamento = React.lazy(()=> import('./component/modaltipoagendamento'));
const modalLocalvisita = React.lazy(()=> import('./component/modallocalvisita'));
const modalAgendamento = React.lazy(()=> import('./component/modalagendamento'));

const routes = [
  { path: '/cadastro/pessoa/', exact:true, component: modalPessoa },
  { path: '/listagem/pessoa/', exact: true, component: pessoa },
  { path: '/listagem/pessoa/:Id', component: modalPessoa },

  { path: '/cadastro/estado/', exact:true, component: modalEstado },
  { path: '/listagem/estado/', exact:true, component: estado },
  { path: '/listagem/estado/:Id', component: modalEstado },

  { path: '/cadastro/cidade/', exact:true, component: modalCidade },
  { path: '/listagem/cidade/', exact:true, component: cidade },
  { path: '/listagem/cidade/:Id', component: modalCidade },

  { path: '/cadastro/tipopessoa/', exact:true, component: modalTipopessoa },
  { path: '/listagem/tipopessoa/', exact:true, component: tipopessoa },
  { path: '/listagem/tipopessoa/:Id', component: modalTipopessoa },

  { path: '/cadastro/comunidade/', exact:true, component: modalComunidade },
  { path: '/listagem/comunidade/', exact:true, component: comunidade },
  { path: '/listagem/comunidade/:Id', component: modalComunidade },

  { path: '/cadastro/ceb/', exact:true, component: modalCeb },
  { path: '/listagem/ceb/', exact:true, component: ceb },
  { path: '/listagem/ceb/:Id', component: modalCeb },

  { path: '/cadastro/tipoagendamento/', exact:true, component: modalTipoagendamento },
  { path: '/listagem/tipoagendamento/', exact:true, component: tipoagendamento },
  { path: '/listagem/tipoagendamento/:Id', component: modalTipoagendamento },

  { path: '/cadastro/localvisita/', exact:true, component: modalLocalvisita },
  { path: '/listagem/localvisita/', exact:true, component: localvisita },
  { path: '/listagem/localvisita/:Id', component: modalLocalvisita },

  { path: '/listagem/agendamento/', exact:true, component: agendamento },
  { path: '/listagem/agendamento/:id', exact:true, component: modalAgendamento },
];

export default routes;
