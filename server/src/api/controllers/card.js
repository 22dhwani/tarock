const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../static/personality_code_definition.json')));

exports.getByType = (req, res) => {
    res.send(data[req.params.type]);
}