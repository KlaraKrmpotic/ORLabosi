CREATE TABLE GRAD (
  idGrad		INT 		 NOT NULL,
  nazivGrad		VARCHAR(100) NOT NULL,
  pbrGrad 		INT			 NOT NULL,
  PRIMARY KEY (idGrad)
);

CREATE TABLE LANACHOTEL (
  idLanac 		INT			 NOT NULL,
  imeLancaHotela VARCHAR(100) NOT NULL,
  idGrad 		INT 		 NOT NULL,
  PRIMARY KEY (idLanac),
  FOREIGN KEY (idGrad) REFERENCES GRAD(idGrad)
);

CREATE TABLE HOTEL (
  idHotel		INT			 NOT NULL,
  imeHotel 		VARCHAR(100) NOT NULL,
  brZvjezdica 	INT 		 NOT NULL,
  telefonHotel 	CHAR(15) 	 NOT NULL,
  email 		VARCHAR(100) NOT NULL,
  adresaHotel 	VARCHAR(100) NOT NULL,
  brojSoba		INT			 NOT NULL,
  wikiStranica 	VARCHAR(50)  NOT NULL,
  godIzgradnje 	INT 		 NOT NULL,
  idLanac 		INT 		 ,
  idGrad 		INT 		 NOT NULL,
  PRIMARY KEY (idHotel),
  FOREIGN KEY (idLanac) REFERENCES LANACHOTEL(idLanac),
  FOREIGN KEY (idGrad) REFERENCES GRAD(idGrad)
);

insert into grad(idGrad, nazivGrad, pbrgrad) 
	values (1, 'Zagreb', 10000);
insert into grad(idGrad, nazivGrad, pbrgrad) 
	values (2, 'Pula', 52100);
insert into grad(idGrad, nazivGrad, pbrgrad) 
	values (3, 'Opatija', 51410);
insert into grad(idGrad, nazivGrad, pbrgrad) 
	values (4, 'Split', 21000);
insert into grad(idGrad, nazivGrad, pbrgrad) 
	values (5, 'Crikvenica', 51260);
insert into grad(idGrad, nazivGrad, pbrgrad) 
	values (6, 'Minnetonka', 55300);
insert into grad(idGrad, nazivGrad, pbrgrad) 
	values (7, 'Denham', 9);
insert into grad(idgrad, nazivGrad, pbrgrad)
	values (8, 'Osijek', 31000);
	
insert into lanachotel(idLanac, imeLancaHotela, idGrad)
	values (1, 'Park Plaza', 6);
insert into lanachotel(idLanac, imeLancaHotelaca, idGrad)
	values (2, 'Regent Hotels & Resorts', 7);

insert into hotel(idHotel, imeHotel, brZvjezdica, godIzgradnje, wikiStranica, telefonHotel, adresaHotel, email, idLanac, idGrad, brojSoba)
	values(1, 'Hotel Esplanada', 5, 1925, 'Hotel_Esplanada', '+38514566666', 'Mihanovićeva 1', 'info@espalnada.hr', 2, 1, 208);
insert into hotel(idHotel, imeHotel, brZvjezdica, godIzgradnje, wikiStranica, telefonHotel, adresaHotel, email, idLanac, idGrad, brojSoba)
	values(2, 'Hotel Dubrovnik', 4, 1929, 'Hotel_Dubrovnik', '+38514863512', 'Ljudevta Gaja 1', 'info@hotel-dubrovnik.hr', null, 1, 237);
insert into hotel(idHotel, imeHotel, brZvjezdica, godIzgradnje, wikiStranica, telefonHotel, adresaHotel, email, idLanac, idGrad, brojSoba)
	values(3, 'Grand Hotel Riviera', 4, 1909, 'Grand_Hotel_Riviera_u_Puli', '+38552211166', 'Splitska 1', 'arenariviera@arenahotels.com', 1, 2, 67);
insert into hotel(idHotel, imeHotel, brZvjezdica, godIzgradnje, wikiStranica, telefonHotel, adresaHotel, email, idLanac, idGrad, brojSoba)
	values(4, 'Hotel Imperial', 4, 1885, 'Hotel_Imperial_u_Opatiji', '+38551710440', 'Maršala Tita 124', 'reservations@liburnia.hr', null, 3, 127);
insert into hotel(idHotel, imeHotel, brZvjezdica, godIzgradnje, wikiStranica, telefonHotel, adresaHotel, email, idLanac, idGrad, brojSoba)
	values(5, 'Hotel Kvarner', 4, 1884, 'Hotel_Kvarner', '+38551710440', 'Ulica Pava Tomašića 2', 'reservations@liburnia.hr', null, 3, 87);
insert into hotel(idHotel, imeHotel, brZvjezdica, godIzgradnje, wikiStranica, telefonHotel, adresaHotel, email, idLanac, idGrad, brojSoba)
	values(6, 'Hotel Osijek', 4, 1977, 'Hotel_Osijek', '+38531230333', 'Šamačka 4', 'info@hotelosijek.hr', null, 8, 140);
insert into hotel(idHotel, imeHotel, brZvjezdica, godIzgradnje, wikiStranica, telefonHotel, adresaHotel, email, idLanac, idGrad, brojSoba)
	values(7, 'Hotel Slavija', 3, 1900, 'Hotel_Slavija_u_Splitu', '+38521323840', 'Ulica Andrije Buvine 2', 'info@hotelslavija.hr', null, 4, 25);
insert into hotel(idHotel, imeHotel, brZvjezdica, godIzgradnje, wikiStranica, telefonHotel, adresaHotel, email, idLanac, idGrad, brojSoba)
	values(8, 'Hotel Omorika', 4, 1973, 'Hotel_Omorika', '+38551800480', 'Bana Jelačića 16', 'reservations@jadran-crikvenica.hr', null, 5, 115);
insert into hotel(idHotel, imeHotel, brZvjezdica, godIzgradnje, wikiStranica, telefonHotel, adresaHotel, email, idLanac, idGrad, brojSoba)
	values(9, 'Hotel Histria', 4, 1987, 'Hotel_Histria', '+38552590000', 'Verudella 17', 'pphpres@pphe.com', 1, 2, 210);
insert into hotel(idHotel, imeHotel, brZvjezdica, godIzgradnje, wikiStranica, telefonHotel, adresaHotel, email, idLanac, idGrad, brojSoba)
	values(10, 'Hotel Brioni', 2, 1971, 'Hotel_Brioni', '+38552215585', 'Verudella 16', 'arenabrioni@arenahotels.com', 1, 2, 210);
