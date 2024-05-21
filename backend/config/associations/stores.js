const OwnersStore = require("../../models/sotres/ownerStores");
const Owners = require("../../models/sotres/owners");
const Plans = require("../../models/sotres/plans");
const Stores = require("../../models/sotres/stores");


Stores.belongsTo(Owners, { foreignKey: 'ownerId' });
Owners.hasMany(Stores, { foreignKey: 'ownerId' }); 

Stores.belongsToMany(Owners, { through: OwnersStore }); 
Owners.belongsToMany(Stores, { through: OwnersStore });

Stores.belongsTo(Plans, { foreignKey: 'planId' });

// Export models
module.exports = {
    Owners,
    Stores
};
