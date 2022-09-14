'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn('RewardType', 'userId', {
        type: Sequelize.UUID,
        allowNull: false,
        unique: false,
        defaultValue: Sequelize.literal(
          'uuid_in((md5((random())::text))::cstring)'
        ),
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('RewardType', 'userId');
  },
};