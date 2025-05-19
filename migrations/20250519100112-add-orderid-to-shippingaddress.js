'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn('ShippingAddresses', 'OrderId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Orders',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.removeColumn('ShippingAddresses', 'OrderId');
  }
};
