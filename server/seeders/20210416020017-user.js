'use strict';

const bcrypt = require('bcrypt');
const { salt } = require('../config/auth.config');
const Role = require('../helpers/role');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let users = [
      {
        email: 'admin@example.com',
        name: 'admin',
        password: await bcrypt.hash('password', salt),
        role: Role.ADMIN,
      },
    ];

    for (let i = 1; i <= 9; i++) {
      users.push({
        email: 'realtor0' + i + '@example.com',
        name: 'realtor0' + i,
        password: await bcrypt.hash('password', salt),
        role: Role.REALTOR,
      });
    }

    for (let i = 1; i <= 9; i++) {
      users.push({
        email: 'client0' + i + '@example.com',
        name: 'client0' + i,
        password: await bcrypt.hash('password', salt),
        role: Role.CLIENT,
      });
    }

    return queryInterface.bulkInsert('Users', users);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
