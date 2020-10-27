/* 
CREATE TABLE GRAD (
  idGrad		INT 		NOT NULL,
  nazivGrad 	VARCHAR(14) NOT NULL,
  pbrGrad 		INT 		NOT NULL,
  PRIMARY KEY (idGrad)
);
CREATE TABLE LANACHOTEL (
  idLanac 		INT 		NOT NULL,
  imeLancaHotela VARCHAR(50) NOT NULL,
  wikiStranica 	VARCHAR(150) NOT NULL,
  idGradSjediste INT NOT NULL,
  PRIMARY KEY (idLanac),
  FOREIGN KEY (idGradSjediste) REFERENCES GRAD(idGrad)
);
CREATE TABLE HOTEL (
  idHotel 		INT 		NOT NULL,
  imeHotel 		VARCHAR(50) NOT NULL,
  brZvjezdica 	INT 		NOT NULL,
  telefonHotel 	CHAR(12) 	NOT NULL,
  bazen  		text[],
  adresaHotel 	VARCHAR(100) NOT NULL,
  idLanac 		INT 		NOT NULL,
  idGrad 		INT 		NOT NULL,
  PRIMARY KEY (idHotel),
  FOREIGN KEY (idLanac) REFERENCES LANACHOTEL(idLanac),
  FOREIGN KEY (idGrad) REFERENCES GRAD(idGrad)
);

insert into hotel(idHotel, imeHotel, brZvjezdica, adresaHotel, telefonHotel, idLanac, idGrad, bazen)
	values(0001, 'Hotel Esplanada', 5, 'Ulica Antuna Mihanovića 1', '+38514566666', 2005, 1000);
insert into hotel(idHotel, imeHotel, brZvjezdica, adresaHotel, telefonHotel, idLanac, idGrad, bazen)
	values(0002, 'Hilton Imperial', 5, 'Ulica Adrijana Blažića 2', '+38520320320', 2002, 1002, '{{"unutarnji"}}');
insert into hotel(idHotel, imeHotel, brZvjezdica, adresaHotel, telefonHotel, idLanac, idGrad, bazen)
	values(0003, 'Double Tree by Hilton', 5, 'Ulica Adrijana Blažića 2', '+38516001900', 2002, 1000, '{{"unutarnji"}}');
insert into hotel(idHotel, imeHotel, brZvjezdica, adresaHotel, telefonHotel, idLanac, idGrad, bazen)
	values(0004, 'Hotel Garden Inn', 4, 'Radnička cesta 21', '+38514566666', 2002, 1000);

insert into hotel(idHotel, imeHotel, brZvjezdica, adresaHotel, telefonHotel, idLanac, idGrad, bazen)
	values(0005, 'Kempinski Hotel Adriatic Istria', 5, 'Alberi 300a', '+38552707000', 2002, 1000, '{{"unutarnji"}, {"vanjski"}}');
insert into hotel(idHotel, imeHotel, brZvjezdica, adresaHotel, telefonHotel, idLanac, idGrad, bazen)
	values(0006, 'Best Western Hotel Stella', 3, 'Maslenička 1', '+38515396300', 2004, 1000);
insert into hotel(idHotel, imeHotel, brZvjezdica, adresaHotel, telefonHotel, idLanac, idGrad, bazen)
	values(0007, 'Sheraton Zagreb', 5, 'Ulica kneza Borne 2', '+38514553535', 2001, 1000, '{{"unutarnji"}}');
insert into hotel(idHotel, imeHotel, brZvjezdica, adresaHotel, telefonHotel, idLanac, idGrad, bazen)
	values(0008, 'Le Méridien Lav', 5, 'Grljevačka 2a', '+38521500500', 2000, 1001, '{{"unutarnji"}, {"vanjski"}}');
insert into hotel(idHotel, imeHotel, brZvjezdica, adresaHotel, telefonHotel, idLanac, idGrad, bazen)
	values(0009, 'Hotel Adriana', 4, 'Majstora Radovana 7', '+38523206300', 2003, 1003, '{{"vanjski"}}');
insert into hotel(idHotel, imeHotel, brZvjezdica, adresaHotel, telefonHotel, idLanac, idGrad, bazen)
	values(0010, 'Hotel Bevanda', 5, 'Zert ulica 8', '+38551493888', 2006, 1005);
insert into hotel(idHotel, imeHotel, brZvjezdica, adresaHotel, telefonHotel, idLanac, idGrad, bazen)
	values(0011, 'Best Western Premier Hotel Astoria', 4, 'Petrinjska ulica 71', '+38514808900', 2004, 1000);


insert into lanachotel(idLanac, imeLancaHotela, wikiStranica)
	values (2000, 'Le Méridien', 'https://en.wikipedia.org/wiki/Le_M%C3%A9ridien', 1006);
insert into lanachotel(idLanac, imeLancaHotela, wikiStranica)
	values (2001, 'Sheraton Hotels and Resorts', 'https://en.wikipedia.org/wiki/Sheraton_Hotels_and_Resorts', 1007);
insert into lanachotel(idLanac, imeLancaHotela, wikiStranica)
	values (2002, 'Hilton Hotels & Resorts', 'https://en.wikipedia.org/wiki/Hilton_Hotels_%26_Resorts', 1008);
insert into lanachotel(idLanac, imeLancaHotela, wikiStranica)
	values (2003, 'Falkensteiner', 'https://de.wikipedia.org/wiki/Falkensteiner_Michaeler_Tourism_Group#Falkensteiner_Hotels_und_Residences', 1009);

insert into lanachotel(idLanac, imeLancaHotela, wikiStranica)
	values (2004, 'Best Western', 'https://en.wikipedia.org/wiki/Best_Western', 1010);
insert into lanachotel(idLanac, imeLancaHotela, wikiStranica)
	values (2005, 'Regent', 'https://hr.wikipedia.org/wiki/Hotel_Esplanade', 1011);
insert into lanachotel(idLanac, imeLancaHotela, wikiStranica)
	values (2006, 'Relais & Châteaux', 'https://en.wikipedia.org/wiki/Relais_%26_Ch%C3%A2teaux', 1012);
insert into lanachotel(idLanac, imeLancaHotela, wikiStranica)
	values (2007, 'Kempinski', 'https://en.wikipedia.org/wiki/Kempinski#Kempinski_hotels_worldwide', 1013);


insert into grad(idGrad, nazivGrad, pbrGrad) 
	values (1000, 'Zagreb', 10000);
insert into grad(idGrad, nazivGrad, pbrGrad) 
	values (1001, 'Split', 21312);
insert into grad(idGrad, nazivGrad, pbrGrad) 
	values (1002, 'Dubrovnik', 20000);
insert into grad(idGrad, nazivGrad, pbrGrad) 
	values (1003, 'Zadar', 23000);
insert into grad(idGrad, nazivGrad, pbrGrad) 
	values (1004, 'Savudrija', 52475);
insert into grad(idGrad, nazivGrad, pbrGrad) 
	values (1005, 'Opatija', 51410);

insert into grad(idGrad, nazivGrad, pbrGrad) 
	values (1006, 'Bethesda', 20800);
insert into grad(idGrad, nazivGrad, pbrGrad) 
	values (1007, 'Boston', 02108);
insert into grad(idGrad, nazivGrad, pbrGrad) 
	values (1008, 'McLean', 10000);
insert into grad(idGrad, naziv22100Grad, pbrGrad) 
	values (1009, 'Vienna', 26105);
insert into grad(idGrad, nazivGrad, pbrGrad) 
	values (1010, 'Phoenix', 85000);
insert into grad(idGrad, nazivGrad, pbrGrad) 
	values (1011, 'Denham', 9);
insert into grad(idGrad, nazivGrad, pbrGrad) 
	values (1012, 'Paris', 75116);
insert into grad(idGrad, nazivGrad, pbrGrad) 
	values (1013, 'Geneva', 1200);

*/
