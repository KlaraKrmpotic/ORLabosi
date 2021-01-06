const express = require('express');
const app = express();
const pg = require('pg')
const db = require('./db')
const router = express.Router();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

var index = require('./routes/index')
var datatable = require('./routes/datatable')

app.use('/', index)
app.use('/datatable', datatable)

const methodOverride = require('method-override')
 
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

module.exports = router;

app.listen(3000);