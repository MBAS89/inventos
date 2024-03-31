const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Categories = sequelize.define('categories', {
    category_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'https://res.cloudinary.com/dagzd3ntq/image/upload/v1705620919/trp6vagjxvf5co3hdwlv.png',
    },
    image_id: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'trp6vagjxvf5co3hdwlv',
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: false,
    },
    store_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'stores',
            key: 'id'
        },
    },
});

module.exports = Categories;