const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hoteliHrv1',
    password: 'bazepodataka',
    port: 5432,
});

/*
const sql_create_grad = `CREATE TABLE GRAD (
    idGrad		INT 		 NOT  null,
    nazivGrad	VARCHAR(100) NOT  null,
    pbrGrad 	INT			 NOT  null,
);`;

const sql_create_grad_id_index = `CREATE UNIQUE INDEX idx_idGrad ON grad(idGrad)`;

const sql_create_hotel = `CREATE TABLE HOTEL (
    idHotel		INT			 NOT  null,
    imeHotel 	VARCHAR(100) NOT  null,
    brZvjezdica INT 		 NOT  null,
    telefonHotel CHAR(15) 	 NOT  null,
    email 		VARCHAR(100) NOT  null,
    adresaHotel VARCHAR(100) NOT  null,
    brojSoba	INT			 NOT  null,
    wikiStranica VARCHAR(50) NOT  null,
    godIzgradnje INT 		 NOT  null,
    idGrad 		INT 		 NOT  null,
    PRIMARY KEY (idHotel),
    FOREIGN KEY (idGrad) REFERENCES GRAD(idGrad)
);`;

const sql_create_hotel_id_index = `CREATE UNIQUE INDEX idx_idHotel ON hotel(idHotel)`;

const sql_insert_grad = `insert into grad(idGrad, nazivGrad, pbrgrad) 
values 
(1, 'Zagreb', 10000),
(2, 'Pula', 52100),
(3, 'Opatija', 51410),
(4, 'Split', 21000),
(5, 'Crikvenica', 51260),
(6, 'Minnetonka', 55300),
(7, 'Denham', 9),
(8, 'Osijek', 31000);`;

const sql_insert_hotel = `insert into hotel(idHotel, imeHotel, brZvjezdica, godIzgradnje, wikiStranica, telefonHotel, adresaHotel, email, idGrad, brojSoba)
values
(1, 'Hotel Esplanada', 5, 1925, 'Hotel_Esplanada', '+38514566666', 'Mihanovićeva 1', 'info@espalnada.hr', 1, 208),
(2, 'Hotel Dubrovnik', 4, 1929, 'Hotel_Dubrovnik', '+38514863512', 'Ljudevta Gaja 1', 'info@hotel-dubrovnik.hr',   1, 237),
(3, 'Grand Hotel Riviera', 4, 1909, 'Grand_Hotel_Riviera_u_Puli', '+38552211166', 'Splitska 1', 'arenariviera@arenahotels.com', 2, 67),
(4, 'Hotel Imperial', 4, 1885, 'Hotel_Imperial_u_Opatiji', '+38551710440', 'Maršala Tita 124', 'reservations@liburnia.hr',   3, 127),
(5, 'Hotel Kvarner', 4, 1884, 'Hotel_Kvarner', '+38551710440', 'Ulica Pava Tomašića 2', 'reservations@liburnia.hr',   3, 87),
(6, 'Hotel Osijek', 4, 1977, 'Hotel_Osijek', '+38531230333', 'Šamačka 4', 'info@hotelosijek.hr',   8, 140),
(7, 'Hotel Slavija', 3, 1900, 'Hotel_Slavija_u_Splitu', '+38521323840', 'Ulica Andrije Buvine 2', 'info@hotelslavija.hr',   4, 25),
(8, 'Hotel Omorika', 4, 1973, 'Hotel_Omorika', '+38551800480', 'Bana Jelačića 16', 'reservations@jadran-crikvenica.hr',   5, 115),
(9, 'Hotel Histria', 4, 1987, 'Hotel_Histria', '+38552590000', 'Verudella 17', 'pphpres@pphe.com', 2, 210),
(10, 'Hotel Brioni', 2, 1971, 'Hotel_Brioni', '+38552215585', 'Verudella 16', 'arenabrioni@arenahotels.com', 2, 210);`;

let table_names = [
    "grad",
    "hotel"
]

let tables = [
    sql_create_grad,
    sql_create_hotel
];

let table_data = [
    sql_insert_grad,
    sql_insert_hotel
]

let indexes = [
    sql_create_grad_id_index,
    sql_create_hotel_id_index
];

(async () => {
    console.log("TABLICE:");
    for (let i = 0; i < tables.length; i++) {
        try {
            await pool.query(tables[i], [])
            if( table_data[i] !== undefined ) {
                try {
                    await pool.query(table_data[i], [])
                }
                catch(err) {
                    console.log("Greška u popunjavanju tablice " + table_names[i] + " ")
                    return console.log(err.message);
                }
            }
        }
        catch(err) {
            console.log("Greška u kreiranju tablice " + table_names[i])
            return console.log(err.message);
        }
    }

    console.log("INDEXI:");
    for (let i = 0; i < indexes.length; i++) {
        try {
            await pool.query(indexes[i], [])
        }
        catch(err) {
            console.log("Greška kod indexa " + i)   
        }
    }
}) ()   // poziva sam sebe

*/