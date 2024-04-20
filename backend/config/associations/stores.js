const OwnersStore = require("../../models/sotres/ownerStores");
const Owners = require("../../models/sotres/owners");
const Stores = require("../../models/sotres/stores");


Stores.belongsTo(Owners, { foreignKey: 'ownerId' });
Owners.hasMany(Stores, { foreignKey: 'ownerId' }); 

Stores.belongsToMany(Owners, { through: OwnersStore }); 
Owners.belongsToMany(Stores, { through: OwnersStore });

// Export models
module.exports = {
    Owners,
    Stores
};
