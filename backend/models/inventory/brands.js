const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Brands = sequelize.define('brands', {
    brand_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'https://res.cloudinary.com/dagzd3ntq/image/upload/v1705620919/d67opvq7mqx2i5qqcn5f.png',
    },
    image_id: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'd67opvq7mqx2i5qqcn5f',
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

module.exports = Brands;