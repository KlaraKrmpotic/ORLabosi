const express = require('express');
const router = express.Router();
const pg = require('pg');
const db = require('../db');
const { check, validationResult } = require('express-validator');

// PRIKAZ SVIH HOTELA
router.get('/', async function (req, res) {

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

// FILTRIRAJ PO ZADANOJ VRIJEDNOSTI U ZADANOM ATRIBUTU
router.post('/filter', async function (req, res){
    var v = req.body.vrijednost;
    var p = req.body.polje;

    console.log("Vrijednost:" + v + "  Polje: " + p + "\n");
    
    var sqlRes = "";
    /*
    if(p.localeCompare("sve")) {
        sqlRes = `SELECT idHotel, imeHotel, brZvjezdica, godIzgradnje, wikiStranica, telefonHotel, adresaHotel, email, brojSoba, nazivGrad, pbrgrad 
                    FROM hotel INNER JOIN grad ON hotel.idGrad = grad.idGrad WHERE idHotel = ${v} OR imeHotel LIKE '%${v}%' OR brZvjezdica = ${v} OR 
                    godIzgradnje = ${v} OR wikiStranica LIKE '%${v}%' OR telefonHotel LIKE '%${v}%' OR adresaHotel LIKE '%${v}%' OR 
                    email LIKE '%${v}%' OR brojSoba = ${v} OR nazivGrad LIKE '%${v}%' OR pbrgrad = ${v}`;
    } else {
    */
    if(p.localeCompare("idHotel") == 0 || p.localeCompare("brZvjezdica") == 0 || 
        p.localeCompare("godIzgradnje") == 0 || p.localeCompare("brojSobe") == 0)   {

            const sqlHotels = `SELECT idHotel, imeHotel, brZvjezdica, godIzgradnje, wikiStranica, telefonHotel, adresaHotel, email, brojSoba, nazivGrad, pbrgrad
                    FROM hotel INNER JOIN grad ON hotel.idGrad = grad.idGrad WHERE ($1) = ($2);`;
            try {
                const resultHotels = (await db.query(sqlHotels, [p, v])).rows;
                res.render('datatable', {
                    title: 'Datatable',
                    hotels: resultHotels,
                    linkActive: 'datatable',
                });
            } catch (err) {
                console.log(err);
            }
    } else {
        const sqlHotels = `SELECT idHotel, imeHotel, brZvjezdica, godIzgradnje, wikiStranica, telefonHotel, adresaHotel, email, brojSoba, nazivGrad, pbrgrad
                    FROM hotel INNER JOIN grad ON hotel.idGrad = grad.idGrad WHERE ${p} LIKE '%${v}%';`;
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
    } 
});


router.get('/:id', async function (req, res) {

    const sqlHotel = `SELECT idHotel, imeHotel, brZvjezdica, godIzgradnje, wikiStranica, telefonHotel, adresaHotel, email, brojSoba, nazivGrad, pbrgrad
            FROM hotel INNER JOIN grad ON hotel.idGrad = grad.idGrad WHERE idHotel = ($1);`;
    try {
        const resHotel = (await db.query(sqlHotel, [req.params.id])).rows;

        console.log(resHotel)

        res.render('single', {
            title: 'Single record',
            hotel: resHotel      
        })
    } catch (err) {
        console.log(err);
    }
});


// DODAJ NOVI HOTEL FORM
router.get('/dodaj', async function(req, res){ 

    console.log("ADD get method")
    
    const sqlCities = `SELECT idGrad, nazivGrad, pbrgrad FROM grad ORDER BY idGrad;`;
    try {
        const resultCities = (await db.query(sqlCities, [])).rows;
        res.render('dodaj', {
            title: 'Dodaj novi hotel',
            //linkActive: 'add',
            idHotel: '',
            imeHotel: '',
            brZvjezdica: '',
            telefonHotel: '',
            email: '',
            adresaHotel: '',
            brojSoba: '',
            wikiStranica: '',
            godIzgradnje: '',
            gradovi: resultCities      
        })
    } catch (err) {
        console.log(err);
    }  
});

// ADD NEW USER POST ACTION
router.post('/dodaj', [   // validacija polja
                check('imeHotel', 'Ime je obavezno polje').notEmpty(),
                check('brZvjezdica', 'Mora biti između 1 i 5').isFloat({min:1,max:5}),
                check('telefonHotel', 'Telefon je obavezno polje').notEmpty(),
                check('email', 'Mora biti ispravan email').isEmail(),
                check('adresaHotel', 'Adresa je obavezno polje').notEmpty(),
                check('brojSoba', 'Mora biti veci od 0').isFloat({min:1}),
                check('wikiStranica', 'Wiki handle je obavezno polje').notEmpty(),
                check('godIzgradnje', 'Mora biti manja od sadasnje godine').isFloat({max: 2022})
                //check('idgrad', 'Grad je obavezno polje').notEmpty() 
            ], async function(req, res, next) {

                console.log("Pocetak POSTa ")

                const errors = validationResult(req);
                
                if (!errors.isEmpty()) {    //Nasao je error u validaciji
                    
                    res.send(errors)

                    res.redirect('/dodaj');
                    
                    const sqlCities = `SELECT idGrad, nazivGrad, pbrgrad FROM grad ORDER BY idGrad;`;
                    try {
                        const resultCities = (await db.query(sqlCities, [])).rows;
                        res.render('dodaj', {
                            title: 'Add new hotel',
                            idHotel: req.body.idHotel,
                            imeHotel: req.body.imeHotel,
                            brZvjezdica: req.body.brZvjezdica,
                            telefonHotel: req.body.telefonHotel,
                            email: req.body.email,
                            adresaHotel: req.body.adresaHotel,
                            brojSoba: req.body.brojSoba,
                            wikiStranica: req.body.wikiStranica,
                            godIzgradnje: req.body.godIzgradnje,
                            idGrad: req.body.idGrad,
                            gradovi: resultCities      
                        })
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    var hotel = {   // uzmi upisane podatke i stvori objekt hotel
                        idHotel: req.body.idHotel,
                        imeHotel: req.body.imeHotel,
                        brZvjezdica: req.body.brZvjezdica,
                        telefonHotel: req.body.telefonHotel,
                        email: req.body.email,
                        adresaHotel: req.body.adresaHotel,
                        brojSoba: req.body.brojSoba,
                        wikiStranica: req.body.wikiStranica,
                        godIzgradnje: req.body.godIzgradnje,
                        idgrad: req.body.idGrad,
                    }
            
                    console.log(hotel.idHotel + "\n");

                    const sqlRes = `INSERT INTO hotel(idHotel, imeHotel, brZvjezdica, telefonHotel, email, adresaHotel, brojSoba, wikiStranica, 
                        godIzgradnje, idGrad) VALUES (($1, $1, $2, $4, $5, $6, $7, $8, $9, $10));`;
            
                    try {
                        console.log("try dio \n")

                        const result = (await db.query(sqlRes, [hotel.idHotel, hotel.imeHotel, hotel.brZvjezdica, hotel.telefonHotel, hotel.email,
                            hotel.adresaHotel, hotel.brojSoba, hotel.wikiStranica, hotel.godIzgradnje, hotel.idGrad])).command;
                        
                        console.log(result)

                        res.redirect('/datatable');
                    } catch (err) {
                        console.log("U catch dio\n");

                        const sqlCities = `SELECT idGrad, nazivGrad, pbrgrad FROM grad ORDER BY idGrad;`;
                        try {
                            
                            const resultCities = (await db.query(sqlCities, [])).rows;
                            res.render('dodaj', {
                                title: 'Add new hotel',
                                idHotel: hotel.idHotel,
                                imeHotel: hotel.imeHotel,
                                brZvjezdica: hotel.brZvjezdica,
                                telefonHotel: hotel.telefonHotel,
                                email: hotel.email,
                                adresaHotel: hotel.adresaHotel,
                                brojSoba: hotel.brojSoba,
                                wikiStranica: hotel.wikiStranica,
                                godIzgradnje: hotel.godIzgradnje,
                                gradovi: resultCities      
                            })
                        } catch (err) {
                            console.log(err);
                        }
                    }
                } 
                 
            }
)

// IZBRISI ODABRANI ZAPIS
router.delete('/delete/:id', async function(req, res) {
    console.log("Usao sam u DELETE");

    const sqlDel = `DELETE FROM hotel WHERE idhotel = ($1);`;
    try {
        const resultDelete = (await db.query(sqlDel, [req.params.id])).rows;
        console.log(resultDelete);

        res.redirect('datatable');
    } catch (err) {
        console.log(err);
    }
})

router.get('/edit/:id', async function(req, res) {

    const sqlHotel = `SELECT idHotel, imeHotel, brZvjezdica, godIzgradnje, wikiStranica, telefonHotel, adresaHotel, email, brojSoba, nazivGrad, pbrgrad
                        FROM hotel INNER JOIN grad ON hotel.idGrad = grad.idGrad WHERE idHotel = ($1);`;
    const sqlCities = `SELECT idGrad, nazivGrad, pbrgrad FROM grad ORDER BY idGrad;`;
    try {                 
        const resultCities = (await db.query(sqlCities, [])).rows;
        const resultHotel = (await db.query(sqlHotel, [req.params.id])).rows;
        //console.log(resultHotels);
        res.render('edit', {
            title: 'Edit',
            hotel: resultHotel, // skupi informacije o hotelu
            gradovi: resultCities,
            linkActive: 'datatable',
        });
    } catch (err) {
        console.log(err);
    }
})

// IZMJENI ODABRANI HOTEL
router.put('/edit/:id', [   // validacija polja
        check('imeHotel', 'Ime je obavezno polje').notEmpty(),
        check('brZvjezdica', 'Mora biti između 1 i 5').isFloat({min:1,max:5}),
        check('telefonHotel', 'Telefon je obavezno polje').notEmpty(),
        check('email', 'Mora biti ispravan email').isEmail(),
        check('adresaHotel', 'Adresa je obavezno polje').notEmpty(),
        check('brojSoba', 'Mora biti veci od 0').isFloat({min:1}),
        check('wikiStranica', 'Wiki handle je obavezno polje').notEmpty(),
        check('godIzgradnje', 'Mora biti manja od sadasnje godine').isFloat({max: 2022})
        //check('idgrad', 'Grad je obavezno polje').notEmpty() 
    ], async function(req, res, next) {

        console.log("Pocetak PUTa ")

        const errors = validationResult(req);
        
    if(errors.isEmpty()) {    //Nije nasao je error u validaciji

        var hotel = {   // uzmi upisane podatke i stvori objekt hotel
            idHotel: req.body.idHotel,
            imeHotel: req.body.imeHotel,
            brZvjezdica: req.body.brZvjezdica,
            telefonHotel: req.body.telefonHotel,
            email: req.body.email,
            adresaHotel: req.body.adresaHotel,
            brojSoba: req.body.brojSoba,
            wikiStranica: req.body.wikiStranica,
            godIzgradnje: req.body.godIzgradnje,
            idgrad: req.body.idGrad,
        }

        const sqlHotel = `UPDATE hotel SET imeHotel = ($1), brZvjezdica = ($2), godIzgradnje = ($3),
                    wikiStranica = ($4), telefonHotel = ($5), adresaHotel = ($6),
                    email = ($7), brojSoba = ($8), idGrad = ($9) WHERE idHotel = ($10);`;
        
        try {
            const resultHotel = (await db.query(sqlHotel, [ hotel.imeHotel, hotel.brZvjezdica, hotel.godIzgradnje, hotel.wikiStranica, 
                hotel.telefonHotel, hotel.adresaHotel, hotel.email, hotel.brojSoba, hotel.idGrad, hotel.idHotel])).command;
            res.redirect('/datatable');
        } catch (err) {
            res.render('edit', {
                        title: 'Edit',
                        id: req.params.idHotel,
                        name: req.body.name,
                        age: req.body.age,
                        email: req.body.email
            })
        }     
    } else {   

        try {
            const resultCities = (await db.query(sqlCities, [])).rows;
            res.render('edit', {
                title: 'Edit hotel',
                idHotel: req.body.idHotel,
                imeHotel: req.body.imeHotel,
                brZvjezdica: req.body.brZvjezdica,
                telefonHotel: req.body.telefonHotel,
                email: req.body.email,
                adresaHotel: req.body.adresaHotel,
                brojSoba: req.body.brojSoba,
                wikiStranica: req.body.wikiStranica,
                godIzgradnje: req.body.godIzgradnje,
                idGrad: req.body.idGrad,
                gradovi: resultCities      
            })
        } catch (err) {
            console.log(err);
        }
    }
})

module.exports = router;