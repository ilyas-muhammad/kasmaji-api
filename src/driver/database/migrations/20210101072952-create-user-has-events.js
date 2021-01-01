module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_has_events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'users',
          key: 'id',
        },
      },
      event_id: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'events',
          key: 'id',
        },
      },
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_has_events');
  },
};
