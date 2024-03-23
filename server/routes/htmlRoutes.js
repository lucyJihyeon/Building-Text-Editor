//importing path module
const path = require('path');

//exporting the function to send a homepage file. 
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
};
