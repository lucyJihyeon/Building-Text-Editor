//importing express to run the app 
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

//using client/dist folder as static files, which will be built using webpack 
app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//onvokes a function exported by htmlRoutes
require('./routes/htmlRoutes.js')(app);

app.listen(PORT, function () {
  console.log(`Now listening on port: ${PORT}`);
});
