//inporting express to run the app 
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

//serves client/dist folder as static files 
app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//invokes a function exported by htmlRoutes to handle homepage route. 
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
