const db = require('./db')

var v = localStorage.getItem("unesenaVrijednost");
var p = localStorage.getItem("trazeniAtribut");

// console.log("getRows")
if(p.localeCompare('sve')) {
    const sqlRes = `SELECT idHotel, imeHotel, brZvjezdica, godIzgradnje, wikiStranica, telefonHotel, adresaHotel, email, brojSoba, nazivGrad, pbrgrad 
                FROM hotel WHERE idHotel = ? OR imeHotel = ? OR brZvjezdica = ? OR godIzgradnje = ? OR wikiStranica = ? OR telefonHotel = ? 
                OR adresaHotel = ? OR email = ? OR brojSoba = ? OR nazivGrad = ? OR pbrgrad = ?`, [v, v, v, v, v, v, v, v, v, v, v];
} else {
    ispis();
}

async function ispis(){

    const sqlRes = `SELECT idHotel, imeHotel, brZvjezdica, godIzgradnje, wikiStranica, telefonHotel, adresaHotel, email, brojSoba, nazivGrad, pbrgrad
                    FROM hotel WHERE ? = ?`, [v, p];
    
    try {
        const resultHotels = (await db.query(sqlRes, [])).rows;
               
        // console.log(resultHotels);
        var table = '';
        for(let hotel of resultHotels) {
            table += (
                '<tr><td>' + hotel.idHotel + '</td>' + 
                '<td>' + hotel.imeHotel + '</td>' + 
                '<td>' + hotel.brZvjezdica + '</td>' + 
                '<td>' + hotel.godIzgradnje + '</td>' + 
                '<td>' + hotel.wikiStranica + '</td>' + 
                '<td>' + hotel.telefonHotel + '</td>' + 
                '<td>' + hotel.adresaHotel + '</td>' + 
                '<td>' + hotel.email + '</td>' + 
                '<td>' + hotel.brojsoba + '</td>' + 
                '<td>' + hotel.nazivGrad + '</td' +
                '<td>' + hotel.pbrgrad + '</td></tr>'
            ) 
        }

    } catch (err) {
        console.log(err);
    }

        
};