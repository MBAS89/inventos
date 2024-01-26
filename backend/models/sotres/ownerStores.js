const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const OwnersStore = sequelize.define('owner_stores', {
    owner_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'owners',
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
    store_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'stores',
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
});

module.exports = OwnersStore;