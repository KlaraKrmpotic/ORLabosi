//uvoz modula
const express = require('express');
const app = express();
const pg = require('pg')
const db = require('./db')
const router = express.Router();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Index',
        linkActive: 'index'
    });
});

app.get('/datatable', async function (req, res) {

    const sqlHotels = `SELECT idHotel, imeHotel, brZvjezdica, godIzgradnje, wikiStranica, telefonHotel, adresaHotel, email, brojSoba, nazivGrad, pbrgrad
                        FROM hotel INNER JOIN grad ON hotel.idGrad = grad.idGrad ORDER BY idHotel;`;
    try {
        const resultHotels = (await db.query(sqlHotels, [])).rows;
        res.render('datatable', {
            title: 'Datatable',
            hotels: resultHotels,
            linkActive: 'datatable',
        });
    } catch (err) {
        console.log(err);
    }
    
});

module.exports = router;

app.listen(3000);