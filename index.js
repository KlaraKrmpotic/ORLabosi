const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const db = require('./queries');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/index', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/datatable', function(req, res) {
    res.sendFile(path.join(__dirname + '/datatable.html'))
});

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/hotels', db.getHotels);
app.get('/hotels/:id', db.getHotelById)
app.get('/hotels/:id/picture', db.getHotelPicture)
app.post('/hotels', db.createHotel)
app.put('/hotels/:id', db.updateHotel)
app.delete('/hotels/:id', db.deleteHotel)

app.listen(3000, () => {
  console.log(`App running on port 3000.`)
})