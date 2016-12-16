var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
    name: String,
    role: String,
    tech: [],
    description: String
});

module.exports = mongoose.model('Project', ProjectSchema);
