// Models 
const Creation = require('./models/creationModel');
const User = require('./models/userModel');
const CreationComment = require('./models/creationComments');

module.exports = function() {
	User.hasMany(Creation, { constraints: true, OnDelete: 'CASECADE', foreignKey: 'userId' });
	Creation.belongsTo(User, { foreignKey: 'userId' });
	
	Creation.hasMany(CreationComment, { constraints: true, OnDelete: 'CASECADE', foreignKey: 'creationId' });
	CreationComment.belongsTo(Creation, { foreignKey: 'creationId' });
	
	User.hasMany(CreationComment, { foreignKey: 'userId' });
	CreationComment.belongsTo(User,{ foreignKey: 'userId' });
}