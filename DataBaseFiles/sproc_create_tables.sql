/*
	Author: Kieran Zylstra
	Date-Created: 3/12/20
	Last-Modified: 3/20/20
*/



CREATE TABLE Daily_Weather (
	day_id SERIAL NOT NULL PRIMARY KEY
	,day DATE NOT NULL
	,temp_f_high float NOT NULL
	,temp_c_high float NOT NULL
	,temp_f_low float NOT NULL
	,temp_c_low float NOT NULL
	,humidity float NULL
	,precipitation varchar(20) NOT NULL
	,coverage varchar(20) NULL
	,alerts varchar(50) NULL
	,feels_like float NULL
	,pressure float NULL
	,wind float NULL
	,description varchar(300) NULL
	,precip_chance float NULL
);

CREATE TABLE Hour_Weather (
	hour_id SERIAL NOT NULL PRIMARY KEY
	,day_id integer NOT NULL
	,hour float NOT NULL
	,temp_f float NOT NULL
	,temp_c float NOT NULL
	,humidity float NULL
	,precip varchar(20) NOT NULL
	,coverage varchar(20) NULL
	,feels_like float NULL
	,pressure float NULL
	,wind float NULL
	,description varchar(300) NULL
	,precip_chance integer NOT NULL
	,constraint fk_date
		FOREIGN KEY (day_id)
		REFERENCES Daily_Weather (day_id)
);

CREATE TABLE Quotes (
	quote_id SERIAL NOT NULL PRIMARY KEY
	,quote varchar(300) NOT NULL
);

CREATE TABLE Previous_Weather_1 (
	day_id SERIAL NOT NULL PRIMARY KEY
	,day DATE NOT NULL
	,temp_f_high float NOT NULL
	,temp_c_high float NOT NULL
	,temp_f_low float NOT NULL
	,temp_c_low float NOT NULL
	,humidity float NULL
	,precipitation varchar(20) NOT NULL
	,coverage varchar(20) NULL
	,alerts varchar(50) NULL
	,feels_like float NULL
	,pressure float NULL
	,wind float NULL
	,description varchar(300) NULL
	,precip_chance integer NULL
);
CREATE TABLE Previous_Weather_2 (
	day_id SERIAL NOT NULL PRIMARY KEY
	,day DATE NOT NULL
	,temp_f_high float NOT NULL
	,temp_c_high float NOT NULL
	,temp_f_low float NOT NULL
	,temp_c_low float NOT NULL
	,humidity float NULL
	,precipitation varchar(20) NOT NULL
	,coverage varchar(20) NULL
	,alerts varchar(50) NULL
	,feels_like float NULL
	,pressure float NULL
	,wind float NULL
	,description varchar(300) NULL
	,precip_chance integer NULL
);
CREATE TABLE Previous_Weather_3 (
	day_id SERIAL NOT NULL PRIMARY KEY
	,day DATE NOT NULL
	,temp_f_high float NOT NULL
	,temp_c_high float NOT NULL
	,temp_f_low float NOT NULL
	,temp_c_low float NOT NULL
	,humidity float NULL
	,precipitation varchar(20) NOT NULL
	,coverage varchar(20) NULL
	,alerts varchar(50) NULL
	,feels_like float NULL
	,pressure float NULL
	,wind float NULL
	,description varchar(300) NULL
	,precip_chance integer NULL
);
CREATE TABLE Previous_Weather_4 (
	day_id SERIAL NOT NULL PRIMARY KEY
	,day DATE NOT NULL
	,temp_f_high float NOT NULL
	,temp_c_high float NOT NULL
	,temp_f_low float NOT NULL
	,temp_c_low float NOT NULL
	,humidity float NULL
	,precipitation varchar(20) NOT NULL
	,coverage varchar(20) NULL
	,alerts varchar(50) NULL
	,feels_like float NULL
	,pressure float NULL
	,wind float NULL
	,description varchar(300) NULL
	,precip_chance integer NULL
);
CREATE TABLE Previous_Weather_5 (
	day_id SERIAL NOT NULL PRIMARY KEY
	,day DATE NOT NULL
	,temp_f_high float NOT NULL
	,temp_c_high float NOT NULL
	,temp_f_low float NOT NULL
	,temp_c_low float NOT NULL
	,humidity float NULL
	,precipitation varchar(20) NOT NULL
	,coverage varchar(20) NULL
	,alerts varchar(50) NULL
	,feels_like float NULL
	,pressure float NULL
	,wind float NULL
	,description varchar(300) NULL
	,precip_chance integer NULL
);