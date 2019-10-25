import React from 'react';


const fiel = React.lazy(()=> import('./pages/Fiel'));
const modalPessoa = React.lazy(()=> import('./component/modalpessoa'));

const routes = [
  { path: '/cadastros/Fiel/', exact: true, component: fiel },
  { path: '/cadastros/Fiel/:Id', component: modalPessoa },
];

export default routes;
