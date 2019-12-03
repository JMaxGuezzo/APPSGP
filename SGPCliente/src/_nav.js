export default {
  items: [
    {
      name: 'Inicio',
      url: '/dashboard',
      icon: 'cui-home',
      badge: {
        variant: 'info',
        text: '',
      },
    },
    {
      name: 'Cadastros',
      url: '/pages',
      icon: 'cui-people',
      children: [
        {
          name: 'Pessoa',
          url: '/listagem/pessoa',
          icon: 'cui-user-follow',
        },
        {
          name: 'Cidade',
          url: '/listagem/cidade',
          icon: 'cui-user-follow',
        },
        {
          name: 'Estado',
          url: '/listagem/estado/',
          icon: 'cui-user-follow',
        },
        {
          name: 'Tipo Pessoa',
          url: '/listagem/tipopessoa/',
          icon: 'cui-user-follow',
        },

        {
          name: 'Comunidade',
          url: '/listagem/comunidade/',
          icon: 'cui-user-follow',
        },

        {
          name: 'Ceb ',
          url: '/listagem/ceb/',
          icon: 'cui-user-follow',
        },

        {
          name: 'Tipo Agendamento',
          url: '/listagem/tipoagendamento/',
          icon: 'cui-user-follow',
        },

        {
          name: 'Local Visita',
          url: '/listagem/localvisita/',
          icon: 'cui-user-follow',
        },
      ]},
      {
        name: 'Agendamento',
        url: '/listagem/agendamento/',
        icon: 'cui-home',
        badge: {
          variant: 'info',
          text: '',
        },
      },
      {
        name: 'Dizimo',
        url: '/listagem/parcelasdizimo/',
        icon: 'cui-dollar',
        badge: {
          variant: 'info',
          text: '',
        },
      },

  ]

};
