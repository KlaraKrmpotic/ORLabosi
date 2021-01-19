const Pool = require('pg').Pool

const fetch = require("node-fetch");
var cacheManager = require('cache-manager');
var cacheManagerFs = require('cache-manager-fs');
var cache = cacheManager.caching({
  store: cacheManagerFs, 
  options: {
    ttl: 60*60, 
    maxsize: 1000*1000*1000, 
    path:'fscache', 
    preventfill:true, 
    reviveBuffers: true
  }
});

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hoteliHrv1',
    password: 'bazepodataka',
    port: 5432,
});

const getHotels = (request, response) => {
    pool.query('SELECT * FROM hotel ORDER BY idHotel ASC', [], (error, results) => {

      if (error) {
        response.status(500).json({
              status: "Internal Server Error",
              message: "An error has occured on the server.",
              response: null
          })
      } else {
        results.rows.forEach(hotel => {
          hotel['@context'] = {
            imeHotel: 'https://schema.org/imeHotel',
            telefonhotel: 'https://schema.org/telefonhotel',
            email: 'https://schema.org/email',
            adresahotel: 'https://schema.org/adresahotel',
            wikistranica: 'https://schema.org/URL'
            
          }
          //hotel.slika = "http://localhost:3000/hotels/" + hotel.idhotel + "/picture"
          hotel.links = [{
              href: '/hotels/' + hotel.idhotel,
              ref: 'Detail',
              type: 'GET'
          }]
        })
        response.status(200).json({
          status: "OK",
          message: "List of all hotels",
          response: results.rows
        })  
      }
    })
}

const getHotelById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM hotel WHERE idHotel = $1', [id], (error, results) => {
    if (error) {
      response.status(400).json({
        status: "Bad Request",
        message: "Invalid request.",
        response: null
      })
    }
    results.rows.forEach(hotel => {
      hotel['@context'] = {
        imeHotel: 'https://schema.org/imeHotel',
        telefonhotel: 'https://schema.org/telefonhotel',
        email: 'https://schema.org/email',
        adresahotel: 'https://schema.org/adresahotel',
        wikistranica: 'https://schema.org/URL'
        
      }
      hotel.slika = "http://localhost:3000/hotels/" + hotel.idhotel + "/picture"
      hotel.links = [{
        href: '/hotels/' + id + '/picture',
        //href: 'http://localhost:3000/hotels/' + id + '/' + hotel.wikistranica,
        ref: 'Picture',
        type: 'GET'
      }]
    })
    response.status(200).json({
      status: "OK",
      message: "List of all hotels",
      response: results.rows
    })
  })
}

async function getPictureSource(name) {
  const wikimediaFetch = await fetch(' https://en.wikipedia.org/api/rest_v1/page/summary/' + name);

}

async function getPicture(name) {

  var source = await getPictureSource(name);
  var pictureREs = await fetch(source);

  return await pictureREs.buffer();
}

const getHotelPicture = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT wikiStranica FROM hotel WHERE idHotel = $1', [id], (error, results) => {
    if(error) {
      response.status(404).json({
        status: "Not found",
        message: "No hotel with that id",
        response: null
      })
    }
    results.rows.forEach(hotel => {
      var nameLink = hotel.wikistranica;
      cache.wrap(nameLink,
        )
      hotel.links = [{
          href: 'http://localhost:3000/hotels/' + id + '/' + hotel.wikistranica,
          ref: 'Picture',
          type: 'GET'
      }]
    })
    response.status(200).json({
      status: "OK",
      message: "Picture of a hotel",
      response: results.rows
    })
  })

}

const createHotel = (req, response) => {
    const hotel = {   // uzmi upisane podatke i stvori objekt hotel
        idHotel: 12,
        imeHotel: "Probni Hotel",
        brZvjezdica: 4,
        telefonHotel: "+3899961823452",
        email: "probni.hotel@probni.hr",
        adresaHotel: "Ulica 1",
        brojSoba: 243,
        wikiStranica: "Probni_hotel",
        godIzgradnje: 2017,
        idgrad: 1,
    }
  
    pool.query(`INSERT INTO hotel(idHotel, imeHotel, brZvjezdica, telefonHotel, email, adresaHotel, brojSoba, wikiStranica, 
        godIzgradnje, idGrad) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`, [hotel.idHotel, hotel.imeHotel, hotel.brZvjezdica, hotel.telefonHotel, hotel.email,
            hotel.adresaHotel, hotel.brojSoba, hotel.wikiStranica, hotel.godIzgradnje, hotel.idgrad], (error, results) => {

              if (error) {
                console.log(error)
                response.status(400).json({
                    status: "Bad request",
                    message: "Invalid request",
                    response: null
                })
              }
              response.status(201).json({
                status: "Created",
                message: "New hotel created",
                response: {
                    idHotel: hotel.idHotel,
                    links: [
                        {
                            href: '/hotels/' + hotel.idHotel,
                            ref: 'Show new hotel',
                            type: 'GET'
                        }
                    ]
                }
              })
    })
}

const updateHotel = (req, response) => {
    const hotel = {   // uzmi upisane podatke i stvori objekt hotel
      idHotel: req.params.id,
      imeHotel: req.body.imehotel,
      brZvjezdica: req.body.brzvjezdica,
      telefonHotel: req.body.telefonhotel,
      email: req.body.email,
      adresaHotel: req.body.adresahotel,
      brojSoba: req.body.brojsoba,
      wikiStranica: req.body.wikistranica,
      godIzgradnje: req.body.godizgradnje,
      idgrad: req.body.idgrad,
    }
  
    pool.query( `UPDATE hotel SET imeHotel = ($1), brZvjezdica = ($2), godIzgradnje = ($3),
        wikiStranica = ($4), telefonHotel = ($5), adresaHotel = ($6),
        email = ($7), brojSoba = ($8), idGrad = ($9) WHERE idHotel = ($10);`,
        [hotel.imeHotel, hotel.brZvjezdica, hotel.godIzgradnje, hotel.wikiStranica, 
            hotel.telefonHotel, hotel.adresaHotel, hotel.email, hotel.brojSoba, hotel.idGrad, hotel.idHotel],
        (error, results) => {
            if (error) {
              console.log(error)
              response.status(400).json({
                status: "Bad Request",
                message: "Invalid request.",
                response: null
              })
            }
            response.status(200).json({
              status: "OK",
              message: "Updated hotel",
              response: {
                hotel: hotel.idHotel,
                links: [
                    {
                        href: '/hotels/' + hotel.idHotel,
                        ref: 'View updated hospital',
                        type: 'GET'
                    }
                ]
              }
            })
        }
    )
}

const deleteHotel = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query(`DELETE FROM hotel WHERE idhotel = ($1);`, [id], (error, results) => {
      if (error) {
        response.status(400).json({
          status: "Bad Request",
          message: "Invalid request.",
          response: null
        })
        
      }
      response.status(200).send(`Hotel deleted with ID: ${id}`)
    })
}



module.exports = {
  getHotels,
  getHotelById,
  getHotelPicture,
  createHotel,
  updateHotel,
  deleteHotel,
}